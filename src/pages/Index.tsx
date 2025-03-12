
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap, Briefcase, LogOut, UserCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createInterviewExperience, getInterviewExperiences } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import InterviewSearchBar from "@/components/InterviewSearchBar";
import InterviewExperiencesList from "@/components/InterviewExperiencesList";
import ShareExperienceDialog from "@/components/ShareExperienceDialog";
import { formSchema } from "@/schemas/interviewExperienceSchema";
import * as z from "zod";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Index = () => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, logout } = useAuth();

  const { data: interviewExperiences, isLoading } = useQuery({
    queryKey: ["interviewExperiences", searchQuery],
    queryFn: () => getInterviewExperiences(searchQuery),
  });

  const mutation = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) => {
      // Ensure we're passing required fields to createInterviewExperience
      return createInterviewExperience({
        company: values.company,
        position: values.position,
        experience: values.experience || '' // Provide a default empty string
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Interview experience shared successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["interviewExperiences"] });
      setIsShareModalOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description:
          error?.message || "Failed to share interview experience. Try again.",
        variant: "destructive",
      });
    },
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleExperienceClick = (id: number) => {
    navigate(`/interview/${id}`);
  };

  const handleFormSubmit = (values: z.infer<typeof formSchema>) => {
    mutation.mutate(values);
  };

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">Share & Discover Interview Experiences</h1>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 rounded-full">
                  <UserCircle className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserCircle className="mr-2 h-4 w-4" />
                  <span>{user?.email}</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className="capitalize">{user?.role || "Student"}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <p className="text-sm">
            Contribute to the community by sharing your interview experiences and
            learn from others.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold">Recent Interview Experiences</h2>
            <p className="text-muted-foreground">
              Learn from others' interview journeys
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <InterviewSearchBar onSearch={handleSearch} />
            <Button
              variant="outline"
              onClick={() => navigate('/jobs')}
              className="flex items-center gap-2"
            >
              <Briefcase className="h-4 w-4" />
              Browse Jobs
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/skill-gap-analyzer')}
              className="flex items-center gap-2"
            >
              <GraduationCap className="h-4 w-4" />
              Skill Gap Analyzer
            </Button>
            <ShareExperienceDialog 
              isOpen={isShareModalOpen}
              onOpenChange={setIsShareModalOpen}
              onSubmit={handleFormSubmit}
              isPending={mutation.isPending}
            />
          </div>
        </div>

        <InterviewExperiencesList 
          experiences={interviewExperiences}
          isLoading={isLoading}
          onExperienceClick={handleExperienceClick}
        />
      </div>
    </div>
  );
};

export default Index;

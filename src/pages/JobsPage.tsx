
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getJobPostings } from "@/lib/job-api";
import { useAuth } from "@/contexts/AuthContext";
import JobSearchBar from "@/components/JobSearchBar";
import JobPostingsList from "@/components/JobPostingsList";
import { Button } from "@/components/ui/button";
import { Briefcase, GraduationCap, ChevronLeft, PlusCircle } from "lucide-react";

const JobsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const { data: jobPostings, isLoading } = useQuery({
    queryKey: ["jobPostings", searchQuery],
    queryFn: () => getJobPostings(searchQuery),
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleJobClick = (id: number) => {
    navigate(`/job/${id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4">
          <Button 
            variant="link" 
            className="text-primary-foreground -ml-4 mb-2"
            onClick={() => navigate("/")}
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Interviews
          </Button>
          <h1 className="text-3xl font-bold">Find Your Next Tech Job</h1>
          <p className="text-sm">
            Browse open positions and apply to tech companies that interest you.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Tech Job Listings</h2>
              <p className="text-muted-foreground">
                Find open positions at top technology companies
              </p>
            </div>
            
            {isAdmin && (
              <Button 
                onClick={() => navigate("/admin/jobs/new")}
                className="flex items-center gap-2"
              >
                <PlusCircle className="h-4 w-4" />
                Post New Job
              </Button>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <JobSearchBar onSearch={handleSearch} />
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => navigate('/skill-gap-analyzer')}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                <GraduationCap className="h-4 w-4" />
                Skill Gap Analysis
              </Button>
            </div>
          </div>
        </div>

        <JobPostingsList 
          jobs={jobPostings}
          isLoading={isLoading}
          onJobClick={handleJobClick}
        />
      </div>
    </div>
  );
};

export default JobsPage;

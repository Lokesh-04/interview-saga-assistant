
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getJobPostingById } from "@/lib/job-api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import JobApplicationForm from "@/components/JobApplicationForm";
import { analyzeSkillGap } from "@/lib/gemini-api";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, MapPin, Calendar, ChevronLeft, ExternalLink, CheckCircle2, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const JobDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [resume, setResume] = useState("");
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const { data: job, isLoading, error } = useQuery({
    queryKey: ["jobPosting", id],
    queryFn: () => getJobPostingById(parseInt(id || "0")),
    enabled: !!id,
  });

  const handleAnalyzeSkillGap = async () => {
    if (!resume.trim()) {
      toast({
        title: "Error",
        description: "Please enter your resume or skills for analysis",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const result = await analyzeSkillGap(resume, job?.position || "");
      setAnalysisResult(result);
      toast({
        title: "Analysis Complete",
        description: "Your skill gap analysis is ready.",
      });
    } catch (error) {
      console.error("Error analyzing skill gap:", error);
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your skills. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-8"></div>
        <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
        <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Job Not Found</h2>
        <p className="mb-6">The job posting you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate("/jobs")}>
          <ChevronLeft className="h-4 w-4 mr-1" /> Back to Jobs
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="outline" 
          className="mb-6"
          onClick={() => navigate("/jobs")}
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> Back to Jobs
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-3xl font-bold">{job.position}</h1>
                <Badge variant="outline">{job.salary ? job.salary : "Competitive"}</Badge>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-1" />
                  <span>{job.company}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Posted {new Date(job.postedDate).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <Button onClick={() => setIsApplyDialogOpen(true)}>
                  Apply Now
                </Button>
                {job.applicationUrl && (
                  <Button variant="outline" onClick={() => window.open(job.applicationUrl, "_blank")}>
                    Apply on Company Site <ExternalLink className="ml-1 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-3">Job Description</h2>
                <p className="whitespace-pre-line">{job.description}</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">Requirements</h2>
                <ul className="list-disc pl-5 space-y-2">
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Skill Gap Analysis
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Paste your resume or list your skills below to see how well you match this job.
                </p>
                <Textarea
                  placeholder="Paste your resume or list your skills here..."
                  className="min-h-32 mb-4"
                  value={resume}
                  onChange={(e) => setResume(e.target.value)}
                />
                <Button 
                  onClick={handleAnalyzeSkillGap} 
                  disabled={isAnalyzing} 
                  className="w-full"
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze My Skills"}
                </Button>

                {analysisResult && (
                  <div className="mt-6 space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Matching Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.matchingSkills.map((skill: string, i: number) => (
                          <Badge key={i} variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Skills to Develop</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.missingSkills.map((skill: string, i: number) => (
                          <Badge key={i} variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Recommended Resources</h4>
                      <ul className="text-sm space-y-2">
                        {analysisResult.learningResources.slice(0, 3).map((resource: any, i: number) => (
                          <li key={i} className="border-b pb-2">
                            <div className="font-medium">{resource.title}</div>
                            <div className="text-xs text-muted-foreground">{resource.type}</div>
                          </li>
                        ))}
                      </ul>
                      <Link to="/skill-gap-analyzer" className="text-xs text-primary inline-block mt-2 hover:underline">
                        View full analysis
                      </Link>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">Similar Companies</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Companies with similar job openings
                </p>
                <ul className="space-y-3">
                  {["Meta", "Netflix", "Apple", "LinkedIn"].map((company) => (
                    <li key={company} className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{company}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <JobApplicationForm
        jobId={job.id}
        company={job.company}
        position={job.position}
        isOpen={isApplyDialogOpen}
        onOpenChange={setIsApplyDialogOpen}
      />
    </div>
  );
};

export default JobDetailPage;

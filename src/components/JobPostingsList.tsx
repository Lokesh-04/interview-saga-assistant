
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { JobPosting } from "@/lib/job-api";
import { CalendarDays, MapPin, Briefcase, ExternalLink } from "lucide-react";

interface JobPostingsListProps {
  jobs: JobPosting[] | undefined;
  isLoading: boolean;
  onJobClick: (id: number) => void;
}

const JobPostingsList = ({ jobs, isLoading, onJobClick }: JobPostingsListProps) => {
  const navigate = useNavigate();
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="space-y-2">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </CardContent>
            <CardFooter>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (!jobs || jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <Briefcase className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">No job postings found</h3>
        <p className="text-muted-foreground">Try adjusting your search or check back later for new opportunities.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <Card 
          key={job.id} 
          className="transition-all duration-200 hover:shadow-md cursor-pointer flex flex-col h-full"
          onClick={() => onJobClick(job.id)}
        >
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="line-clamp-1">{job.position}</CardTitle>
                <CardDescription className="line-clamp-1">{job.company}</CardDescription>
              </div>
              <div className="flex-shrink-0">
                <Badge variant="outline">{job.salary ? job.salary.split("-")[0] + "+" : "Competitive"}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm line-clamp-3 mb-4">{job.description}</p>
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4 mr-2" />
              <span>Posted {new Date(job.postedDate).toLocaleDateString()}</span>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <Button variant="outline" size="sm" className="w-full" onClick={(e) => {
              e.stopPropagation();
              window.open(job.applicationUrl, "_blank");
            }}>
              Quick Apply <ExternalLink className="ml-1 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default JobPostingsList;

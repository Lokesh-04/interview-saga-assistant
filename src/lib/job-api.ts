
// This file contains API functions for interacting with job postings

export interface JobPosting {
  id: number;
  company: string;
  position: string;
  location: string;
  description: string;
  requirements: string[];
  salary?: string;
  postedDate: string;
  applicationUrl?: string;
}

// Mock data for development purposes
const mockJobs: JobPosting[] = [
  {
    id: 1,
    company: "Google",
    position: "Senior Frontend Developer",
    location: "Mountain View, CA (Hybrid)",
    description: "Join our team to build the next generation of web applications. You'll be working on cutting-edge technologies and collaborating with talented engineers around the world.",
    requirements: [
      "5+ years of experience with JavaScript and modern frameworks",
      "Experience with React and state management libraries",
      "Strong understanding of web performance optimization",
      "Experience with responsive design and cross-browser compatibility",
      "Bachelor's degree in Computer Science or related field"
    ],
    salary: "$140,000 - $180,000",
    postedDate: "2023-05-15",
    applicationUrl: "https://careers.google.com"
  },
  {
    id: 2,
    company: "Microsoft",
    position: "Full Stack Engineer",
    location: "Redmond, WA (On-site)",
    description: "We're looking for a Full Stack Engineer to join our Azure team. You'll help design and build cloud services that scale to millions of users worldwide.",
    requirements: [
      "3+ years of full stack development experience",
      "Proficiency in JavaScript/TypeScript and C#/.NET",
      "Experience with cloud services (Azure preferred)",
      "Knowledge of database systems and data modeling",
      "Strong problem-solving skills"
    ],
    salary: "$130,000 - $160,000",
    postedDate: "2023-06-22",
    applicationUrl: "https://careers.microsoft.com"
  },
  {
    id: 3,
    company: "Amazon",
    position: "Software Development Engineer II",
    location: "Seattle, WA (Remote)",
    description: "Come build the future of e-commerce with us. As an SDE II, you'll design and implement highly scalable and reliable services that power Amazon's global infrastructure.",
    requirements: [
      "4+ years of software development experience",
      "Strong knowledge of algorithms and data structures",
      "Experience with distributed systems",
      "Proficiency in at least one object-oriented language",
      "Excellent communication skills"
    ],
    salary: "$135,000 - $175,000",
    postedDate: "2023-07-10",
    applicationUrl: "https://amazon.jobs"
  }
];

// Our in-memory database
let jobPostings = [...mockJobs];

// Get all job postings, optionally filtered by search query
export const getJobPostings = async (searchQuery?: string): Promise<JobPosting[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (!searchQuery) {
    return [...jobPostings]; // Return a copy to prevent direct mutation
  }
  
  const query = searchQuery.toLowerCase();
  return jobPostings.filter(
    job => 
      job.company.toLowerCase().includes(query) || 
      job.position.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query) ||
      job.description.toLowerCase().includes(query)
  );
};

// Get a specific job posting by ID
export const getJobPostingById = async (id: number): Promise<JobPosting | undefined> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return jobPostings.find(job => job.id === id);
};

// Create a new job posting
export const createJobPosting = async (data: Omit<JobPosting, 'id' | 'postedDate'>): Promise<JobPosting> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Get the highest current ID and increment by 1
  const maxId = jobPostings.reduce((max, job) => 
    job.id > max ? job.id : max, 0);
  
  // Create new job object
  const newJob: JobPosting = {
    id: maxId + 1,
    ...data,
    postedDate: new Date().toISOString().split('T')[0]
  };
  
  // Add to our in-memory database
  jobPostings.push(newJob);
  
  return newJob;
};

// Apply for a job
export const applyForJob = async (jobId: number, application: {
  name: string;
  email: string;
  resume: string;
  coverLetter?: string;
}): Promise<{ success: boolean; message: string }> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const job = await getJobPostingById(jobId);
  
  if (!job) {
    return { 
      success: false, 
      message: "Job not found" 
    };
  }
  
  // In a real application, this would send the application to a database or email
  console.log(`Application received for ${job.position} at ${job.company}:`, application);
  
  // Always return success in this mock implementation
  return { 
    success: true, 
    message: `Application for ${job.position} at ${job.company} submitted successfully!`
  };
};

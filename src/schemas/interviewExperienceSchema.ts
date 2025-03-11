
import * as z from "zod";

export const formSchema = z.object({
  company: z.string().min(2, {
    message: "Company must be at least 2 characters.",
  }),
  position: z.string().min(2, {
    message: "Position must be at least 2 characters.",
  }),
  interviewRounds: z.string().min(1, {
    message: "Please specify the number of interview rounds.",
  }),
  technicalQuestions: z.string().min(5, {
    message: "Please provide some details about technical questions asked.",
  }),
  systemDesign: z.string().optional(),
  behavioralQuestions: z.string().min(5, {
    message: "Please describe some behavioral questions asked.",
  }),
  overallExperience: z.string().min(10, {
    message: "Please share your overall experience in at least 10 characters.",
  }),
  experience: z.string().optional(), // Field to match the API requirements
});

export type FormValues = z.infer<typeof formSchema>;

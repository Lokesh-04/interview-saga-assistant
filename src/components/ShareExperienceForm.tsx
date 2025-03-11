
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

const formSchema = z.object({
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
});

interface ShareExperienceFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  isPending: boolean;
}

const ShareExperienceForm = ({ onSubmit, isPending }: ShareExperienceFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: "",
      position: "",
      interviewRounds: "",
      technicalQuestions: "",
      systemDesign: "",
      behavioralQuestions: "",
      overallExperience: "",
    },
  });

  // Format data before submission to match the API structure
  const handleFormSubmit = (values: z.infer<typeof formSchema>) => {
    // Combine all interview details into a single experience string
    const formattedExperience = `
The interview process consisted of ${values.interviewRounds} rounds.

Technical Questions: ${values.technicalQuestions}

${values.systemDesign ? `System Design: ${values.systemDesign}

` : ''}Behavioral Questions: ${values.behavioralQuestions}

Overall Experience: ${values.overallExperience}`;

    // Send the formatted data to the parent component
    onSubmit({
      company: values.company,
      position: values.position,
      experience: formattedExperience.trim(),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input placeholder="Enter company name (e.g., Google, Microsoft)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Input placeholder="Enter position (e.g., Senior Frontend Developer)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="interviewRounds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Interview Rounds</FormLabel>
              <FormDescription>
                How many interview rounds did you go through? (e.g., "5 rounds: phone screening, technical, system design, behavioral, team fit")
              </FormDescription>
              <FormControl>
                <Input placeholder="Describe the number and types of interviews" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="technicalQuestions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Technical Questions</FormLabel>
              <FormDescription>
                What types of technical or algorithmic questions were you asked?
              </FormDescription>
              <FormControl>
                <Textarea
                  placeholder="The technical questions focused on data structures like trees and arrays. They asked me to solve problems related to..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="systemDesign"
          render={({ field }) => (
            <FormItem>
              <FormLabel>System Design (Optional)</FormLabel>
              <FormDescription>
                Were there any system design questions? If so, what were they?
              </FormDescription>
              <FormControl>
                <Textarea
                  placeholder="I was asked to design a scalable web service that could handle..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="behavioralQuestions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Behavioral Questions</FormLabel>
              <FormDescription>
                What behavioral questions were asked? How did you respond?
              </FormDescription>
              <FormControl>
                <Textarea
                  placeholder="The behavioral questions focused on past experiences and how I handled difficult situations..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="overallExperience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Overall Experience</FormLabel>
              <FormDescription>
                How would you describe your overall interview experience?
              </FormDescription>
              <FormControl>
                <Textarea
                  placeholder="The overall interview experience was professional and challenging..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Submitting..." : "Submit Your Experience"}
        </Button>
      </form>
    </Form>
  );
};

export { formSchema };
export default ShareExperienceForm;

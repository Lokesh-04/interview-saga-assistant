
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "@/schemas/interviewExperienceSchema";

interface BehavioralExperienceFieldsProps {
  form: UseFormReturn<FormValues>;
}

const BehavioralExperienceFields = ({ form }: BehavioralExperienceFieldsProps) => {
  return (
    <>
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
    </>
  );
};

export default BehavioralExperienceFields;

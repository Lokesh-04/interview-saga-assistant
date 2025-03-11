
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

interface TechnicalQuestionsFieldsProps {
  form: UseFormReturn<FormValues>;
}

const TechnicalQuestionsFields = ({ form }: TechnicalQuestionsFieldsProps) => {
  return (
    <>
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
    </>
  );
};

export default TechnicalQuestionsFields;

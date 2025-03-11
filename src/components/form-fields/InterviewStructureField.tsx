
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "@/schemas/interviewExperienceSchema";

interface InterviewStructureFieldProps {
  form: UseFormReturn<FormValues>;
}

const InterviewStructureField = ({ form }: InterviewStructureFieldProps) => {
  return (
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
  );
};

export default InterviewStructureField;

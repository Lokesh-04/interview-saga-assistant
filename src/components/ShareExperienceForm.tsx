
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { formSchema, FormValues } from "@/schemas/interviewExperienceSchema";
import CompanyPositionFields from "@/components/form-fields/CompanyPositionFields";
import InterviewStructureField from "@/components/form-fields/InterviewStructureField";
import TechnicalQuestionsFields from "@/components/form-fields/TechnicalQuestionsFields";
import BehavioralExperienceFields from "@/components/form-fields/BehavioralExperienceFields";
import { formatExperience } from "@/utils/formatExperience";

interface ShareExperienceFormProps {
  onSubmit: (values: FormValues) => void;
  isPending: boolean;
}

const ShareExperienceForm = ({ onSubmit, isPending }: ShareExperienceFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: "",
      position: "",
      interviewRounds: "",
      technicalQuestions: "",
      systemDesign: "",
      behavioralQuestions: "",
      overallExperience: "",
      experience: "",
    },
  });

  const handleFormSubmit = (values: FormValues) => {
    // Format the experience field using our utility function
    values.experience = formatExperience({
      interviewRounds: values.interviewRounds,
      technicalQuestions: values.technicalQuestions,
      systemDesign: values.systemDesign,
      behavioralQuestions: values.behavioralQuestions,
      overallExperience: values.overallExperience,
    });

    // Send the data to the parent component
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
        <CompanyPositionFields form={form} />
        <InterviewStructureField form={form} />
        <TechnicalQuestionsFields form={form} />
        <BehavioralExperienceFields form={form} />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Submitting..." : "Submit Your Experience"}
        </Button>
      </form>
    </Form>
  );
};

// We need to export the schema for the dialog component
export { formSchema };
export default ShareExperienceForm;

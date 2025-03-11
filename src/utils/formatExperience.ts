
export const formatExperience = ({
  interviewRounds,
  technicalQuestions,
  systemDesign,
  behavioralQuestions,
  overallExperience,
}: {
  interviewRounds: string;
  technicalQuestions: string;
  systemDesign?: string;
  behavioralQuestions: string;
  overallExperience: string;
}): string => {
  return `
The interview process consisted of ${interviewRounds} rounds.

Technical Questions: ${technicalQuestions}

${systemDesign ? `System Design: ${systemDesign}

` : ''}Behavioral Questions: ${behavioralQuestions}

Overall Experience: ${overallExperience}`.trim();
};

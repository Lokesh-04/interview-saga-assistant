
// Gemini API key
const API_KEY = "AIzaSyCrIpsbZ3FypIxI6FYsUJlY1Nb6QXuNQQw";

/**
 * Analyzes the skill gap between user's resume and desired job role
 */
export async function analyzeSkillGap(resume: string, jobRole: string) {
  try {
    const prompt = `
      I want you to act as a career advisor and skills gap analyzer. I'll provide my resume content and my desired job role. Please analyze both and give me:

      1. A list of matching skills I already have that align with the job role
      2. A list of missing skills I need to develop for this role
      3. Current industry trends related to this role
      4. Specific recommendations to improve my chances
      5. Recommended learning resources (courses, books, certifications)

      My resume: ${resume}
      
      My desired job role: ${jobRole}

      Respond in the following JSON format only - no other text:
      {
        "matchingSkills": ["skill1", "skill2"...],
        "missingSkills": ["skill1", "skill2"...],
        "industryTrends": ["trend1", "trend2"...],
        "recommendations": ["recommendation1", "recommendation2"...],
        "learningResources": [
          {
            "title": "Resource Name",
            "description": "Brief description",
            "type": "Type (Course/Book/Certification)"
          }
        ]
      }
    `;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.4,
            topK: 32,
            topP: 0.95,
            maxOutputTokens: 8192,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API error:", errorData);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract the content from the response
    const content = data.candidates[0].content.parts[0].text;
    
    // Find the JSON string in the content (in case there's any text before/after)
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Could not extract JSON from the response");
    }
    
    // Parse the JSON string
    const parsedResult = JSON.parse(jsonMatch[0]);
    
    return parsedResult;
  } catch (error) {
    console.error("Error analyzing skill gap:", error);
    throw error;
  }
}

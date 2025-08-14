// Together AI integration for journal reflection
const TOGETHER_AI_API_KEY = "577f7c169325e4ab05c70abc382e92bb974ba8e2b46b9ff341ae2d84a8f360f0";
const TOGETHER_AI_BASE_URL = "https://api.together.xyz/v1";

interface ReflectionResponse {
  positiveInsights: string[];
  reflectionQuestions: string[];
  encouragement: string;
  growthAreas: string[];
}

export async function analyzeJournalWithAI(
  journalTitle: string,
  journalContent: string
): Promise<ReflectionResponse> {
  if (!journalContent.trim()) {
    throw new Error("No content to analyze");
  }

  try {
    const response = await fetch(`${TOGETHER_AI_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOGETHER_AI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo',
        messages: [
          {
            role: 'system',
            content: `You are a compassionate AI reflection companion for "Journal Canvas Soul" journaling app. Your role is to provide thoughtful, positive, and encouraging analysis of journal entries. Always maintain a warm, supportive tone while offering genuine insights.

Analyze the journal entry and respond with a JSON object containing:
{
  "positiveInsights": ["3-4 positive observations about the user's thoughts, emotions, or experiences"],
  "reflectionQuestions": ["3-4 thoughtful questions to help the user explore their thoughts deeper"],
  "encouragement": "A warm, personalized message of encouragement and validation",
  "growthAreas": ["2-3 gentle suggestions for personal growth or positive actions"]
}

Focus on:
- Celebrating progress and positive moments
- Identifying strengths and resilience
- Offering gentle, constructive insights
- Encouraging self-compassion
- Highlighting patterns of growth
- Suggesting actionable next steps for wellbeing

IMPORTANT: Respond only with valid JSON, no additional text or formatting.`
          },
          {
            role: 'user',
            content: `Please analyze this journal entry titled "${journalTitle}":\n\n${journalContent}`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
        top_p: 0.9,
        repetition_penalty: 1.1
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Together AI API Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response format from Together AI');
    }

    const content = data.choices[0].message.content.trim();
    
    try {
      // Try to parse the JSON response
      const parsedReflection = JSON.parse(content);
      
      // Validate the response structure
      if (!parsedReflection.positiveInsights || !parsedReflection.reflectionQuestions || 
          !parsedReflection.encouragement || !parsedReflection.growthAreas) {
        throw new Error('Invalid reflection response structure');
      }
      
      return parsedReflection;
    } catch (parseError) {
      console.error('Failed to parse AI response:', content);
      
      // Fallback response if JSON parsing fails
      return {
        positiveInsights: [
          "Your willingness to reflect through journaling shows great self-awareness",
          "Taking time to document your thoughts demonstrates a commitment to personal growth",
          "Your unique perspective and experiences have value and meaning"
        ],
        reflectionQuestions: [
          "What emotions stood out most to you while writing this entry?",
          "How might this experience contribute to your personal growth?",
          "What would you tell a friend going through something similar?"
        ],
        encouragement: "Thank you for sharing your thoughts and feelings. Your journey of self-reflection is meaningful, and every entry you write is a step toward greater understanding of yourself.",
        growthAreas: [
          "Continue practicing mindful self-reflection through regular journaling",
          "Consider exploring the emotions and themes that emerge in your writing"
        ]
      };
    }
    
  } catch (error) {
    console.error('Together AI Analysis Error:', error);
    throw new Error(`Failed to analyze journal entry: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Function to generate journal prompts
export async function generateJournalPrompt(mood?: string): Promise<string> {
  try {
    const moodContext = mood ? ` The user is feeling ${mood} today.` : '';
    
    const response = await fetch(`${TOGETHER_AI_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOGETHER_AI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo',
        messages: [
          {
            role: 'system',
            content: `You are a thoughtful journaling companion. Generate a single, meaningful journal prompt that encourages reflection, self-discovery, and personal growth. The prompt should be:
- Open-ended and thought-provoking
- Supportive and non-judgmental
- Focused on personal growth or emotional exploration
- Appropriate for any age or background
- Between 1-3 sentences long

Respond with only the prompt text, no additional formatting or explanation.`
          },
          {
            role: 'user',
            content: `Please generate a journal prompt for today.${moodContext}`
          }
        ],
        temperature: 0.8,
        max_tokens: 150,
        top_p: 0.9
      }),
    });

    if (!response.ok) {
      throw new Error(`Together AI API Error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response format from Together AI');
    }

    return data.choices[0].message.content.trim();
    
  } catch (error) {
    console.error('Failed to generate prompt:', error);
    
    // Fallback prompts
    const fallbackPrompts = [
      "What brought you joy today, and how can you carry that feeling forward?",
      "Describe a moment when you felt truly present. What made it special?",
      "What's one thing you learned about yourself recently?",
      "How have you grown or changed in the past month?",
      "What are you grateful for right now, and why?",
      "What would you tell your younger self if you could have a conversation today?",
      "Describe a challenge you're facing and what strengths you can draw upon to navigate it."
    ];
    
    return fallbackPrompts[Math.floor(Math.random() * fallbackPrompts.length)];
  }
}
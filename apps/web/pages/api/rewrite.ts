import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // CORS is handled by next.config.js headers now

  // Only allow POST method
  if (req.method !== 'POST') {
    // Let Next.js handle OPTIONS, return 405 for other methods
    if (req.method !== 'OPTIONS') {
        res.setHeader('Allow', ['POST', 'OPTIONS']);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
    // OPTIONS is implicitly handled by Next.js + headers config
    // However, return 200 OK explicitly if needed for some clients
    return res.status(200).end(); 
  }

  // Check if API key is configured
  if (!process.env.OPENAI_API_KEY) {
    console.error('Missing OpenAI API key');
    return res.status(500).json({ 
      error: 'Server configuration error', 
      details: 'OpenAI API key is not configured' 
    });
  }

  try {
    const { prompt, task, tone, context } = req.body;

    // Validate the prompt
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    
    // Basic validation for optional fields (if they exist, should be strings)
    if (task && typeof task !== 'string') {
        return res.status(400).json({ error: 'Task must be a string' });
    }
    if (tone && typeof tone !== 'string') {
        return res.status(400).json({ error: 'Tone must be a string' });
    }
    if (context && typeof context !== 'string') {
        return res.status(400).json({ error: 'Context must be a string' });
    }

    // Create the system prompt with instructions
    const systemPrompt = `You are Promptly, an AI prompt optimization assistant.

Your job is to rewrite a user's rough prompt so that it is more effective, structured, and context-aware for use in AI systems like ChatGPT or Claude.

Incorporate any optional instructions like task type, tone, or goal if provided.

Be concise and purposeful. Only output the improved prompt, and do not explain your reasoning.`;

    // Create the user message with optional fields
    let userMessage = prompt;
    
    // Add optional context if provided
    if (task || tone || context) {
      userMessage += '\n\nAdditional context:';
      
      if (task) {
        userMessage += `\nTask: ${task}`;
      }
      
      if (tone) {
        userMessage += `\nTone: ${tone}`;
      }
      
      if (context) {
        userMessage += `\nContext: ${context}`;
      }
    }

    try {
      // Call the OpenAI API
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage }
        ],
        temperature: 0.7,
        max_tokens: 1024,
      });

      // Extract the rewritten prompt from the response
      const rewrittenPrompt = completion.choices[0]?.message?.content?.trim() || '';

      // Return the rewritten prompt
      return res.status(200).json({ rewritten_prompt: rewrittenPrompt });
    } catch (apiError: any) {
      console.error('OpenAI API error:', apiError);
      // Provide a more generic error to the client
      return res.status(500).json({ 
        error: 'Error communicating with AI service', 
        details: 'Failed to generate rewritten prompt.'
      });
    }
  } catch (error: any) {
    console.error('Error rewriting prompt:', error);
    return res.status(500).json({ 
      error: 'Internal server error', 
      details: error.message || 'An unexpected error occurred while processing the request.'
    });
  }
} 
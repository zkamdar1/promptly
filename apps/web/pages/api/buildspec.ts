import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';

// Initialize the OpenAI client (should be initialized only once)
// Note: Ensure OPENAI_API_KEY is available in the environment
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
    if (req.method !== 'OPTIONS') {
        res.setHeader('Allow', ['POST', 'OPTIONS']);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
    return res.status(200).end(); // Handle OPTIONS
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
    // Extract data for BuildSpec mode from the request body
    const { idea, tech_stack, features, exclusions } = req.body;

    // Validate the core idea
    if (!idea || typeof idea !== 'string') {
      return res.status(400).json({ error: 'App/product idea is required' });
    }

    // Basic validation for optional fields (if they exist, should be strings)
    if (tech_stack && typeof tech_stack !== 'string') {
        return res.status(400).json({ error: 'Tech Stack must be a string' });
    }
    if (features && typeof features !== 'string') {
        return res.status(400).json({ error: 'Features must be a string' });
    }
    if (exclusions && typeof exclusions !== 'string') {
        return res.status(400).json({ error: 'Exclusions must be a string' });
    }

    // Define the BuildSpec System Prompt
    const systemPrompt = `You are Promptly — an AI assistant that transforms product ideas into clear, executable app specifications for LLM coding agents like GPT-4, Claude, Cursor, Copilot, and Devika.

    Given a user’s product concept and optional preferences (tech stack, key pages, exclusions), generate a concise yet complete one-shot build document that an autonomous AI agent can follow without further instruction.

    Focus on:
    - Clarity
    - Deployability (e.g., Vercel, Supabase, Firebase)
    - Realistic, actionable scope

    The output must include:

    1. A role+personality-based system intro for the AI builder  
    2. A prioritized feature list with implementation notes  
    3. Route/page map with brief descriptions  
    4. Key backend/API logic  
    5. UI/UX styling recommendations (2 examples of other software)
    6. Folder/project structure  
    7. Stack recommendations  

    Avoid verbosity, repetition, or unnecessary elaboration.  
    Do not include placeholders or vague language.  
    Output **only** the final document —  The output must be **production-ready**. Do not wrap your response in commentary.`;

    // Construct the user message including the idea and any optional details
    let userMessage = `Product Idea: ${idea}`;

    if (tech_stack) {
      userMessage += `\n\nPreferred Tech Stack: ${tech_stack}`;
    }
    if (features) {
      userMessage += `\n\nKey Features/Pages to Include: ${features}`;
    }
    if (exclusions) {
      userMessage += `\n\nAnything to Exclude: ${exclusions}`;
    }

    try {
      // Call the OpenAI API using gpt-4o-mini
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini', 
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage }
        ],
        temperature: 0.5, // Slightly lower temperature for more deterministic spec generation
        max_tokens: 1300, // Allow more tokens for a potentially long build spec
      });

      // Extract the generated build spec document from the response
      const buildSpecDocument = completion.choices[0]?.message?.content?.trim() || '';

      // Return the build spec document
      return res.status(200).json({ build_spec_document: buildSpecDocument });

    } catch (apiError: any) {
      console.error('OpenAI API error during build spec generation:', apiError);
      return res.status(500).json({ 
        error: 'Error communicating with AI service', 
        details: 'Failed to generate build specification.'
      });
    }

  } catch (error: any) {
    console.error('Error generating build spec:', error);
    return res.status(500).json({ 
      error: 'Internal server error', 
      details: error.message || 'An unexpected error occurred while processing the request.'
    });
  }
} 
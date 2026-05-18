
'use server';
/**
 * @fileOverview A Genkit flow for generating a startup profile from structured intake data.
 *
 * - generateFounderProfile - A function that handles the profile generation process.
 */

import {ai} from '@/ai/genkit';
import {
  FounderProfileGenerationInputSchema,
  FounderProfileGenerationOutputSchema,
  type FounderProfileGenerationInput,
  type FounderProfileGenerationOutput
} from '@/ai/schemas';

const prompt = ai.definePrompt({
  name: 'founderProfileGenerationPrompt',
  input: { schema: FounderProfileGenerationInputSchema },
  output: { schema: FounderProfileGenerationOutputSchema },
  prompt: `You are an AI assistant specialized in generating startup community profiles.
Your task is to take the user's name and their startup idea/pitch and create a structured profile.

User Name: {{{name}}}
Age: {{{age}}}
Country: {{{country}}}
Startup Idea: {{{idea}}}

Based on the 'Idea' provided, identify the most appropriate ecosystem role from: tech-founder, sales-founder, product-founder, investor, visionary (idea stage), or advisor.

Generate a professional tagline and a brief experience summary that reflects their passion and direction for this idea.

Carefully read the input and generate a JSON object matching the requested schema.
`,
});

const founderProfileGenerationFlow = ai.defineFlow(
  {
    name: 'founderProfileGenerationFlow',
    inputSchema: FounderProfileGenerationInputSchema,
    outputSchema: FounderProfileGenerationOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);

    if (!output) {
      throw new Error('Failed to generate profile.');
    }

    // Ensure the name matches the input
    output.name = input.name;

    return output;
  }
);

export async function generateFounderProfile(
  input: FounderProfileGenerationInput
): Promise<FounderProfileGenerationOutput> {
  return founderProfileGenerationFlow(input);
}

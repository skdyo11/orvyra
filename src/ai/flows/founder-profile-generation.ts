'use server';
/**
 * @fileOverview A Genkit flow for generating a startup profile from raw text.
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
Your task is to extract key information from the provided text to create a structured profile.

Identify the most appropriate role for the user from: tech-founder, sales-founder, product-founder, investor, visionary (idea stage), or advisor.

If the input is from a LinkedIn profile, prioritize professional details.
If the input is a brief pitch, focus on current needs and what they are building or looking for.

Carefully read the following and generate a JSON object matching the requested schema.

Source Type: {{{sourceType}}}
---
Source Content:
{{{sourceText}}}
---
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

    if (input.originalLinkedInUrl) {
      output.linkedInProfileUrl = input.originalLinkedInUrl;
    }

    return output;
  }
);

export async function generateFounderProfile(
  input: FounderProfileGenerationInput
): Promise<FounderProfileGenerationOutput> {
  return founderProfileGenerationFlow(input);
}

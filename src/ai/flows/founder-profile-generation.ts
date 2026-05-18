'use server';
/**
 * @fileOverview A Genkit flow for generating a founder profile from a LinkedIn profile text or a pitch.
 *
 * - generateFounderProfile - A function that handles the founder profile generation process.
 * - FounderProfileGenerationInput - The input type for the generateFounderProfile function.
 * - FounderProfileGenerationOutput - The return type for the generateFounderProfile function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FounderProfileGenerationInputSchema = z.object({
  sourceText: z
    .string()
    .describe(
      'The raw text content from a LinkedIn profile or a brief "What are you building?" pitch.'
    ),
  sourceType: z
    .enum(['linkedin', 'pitch'])
    .describe(
      'Indicates whether the sourceText is from a LinkedIn profile or a pitch.'
    ),
  originalLinkedInUrl: z
    .string()
    .url()
    .optional()
    .describe('The original LinkedIn profile URL, if the sourceText is from LinkedIn.'),
});
export type FounderProfileGenerationInput = z.infer<
  typeof FounderProfileGenerationInputSchema
>;

const FounderProfileGenerationOutputSchema = z.object({
  name: z.string().describe('The full name of the founder.'),
  tagline: z
    .string()
    .describe(
      'A concise and impactful tagline describing what the founder is building or their primary role.'
    ),
  companyName: z
    .string()
    .optional()
    .describe('The name of the company or project the founder is working on, if applicable.'),
  companyDescription: z
    .string()
    .optional()
    .describe('A brief description of the company or project.'),
  seekingCoFounder: z
    .boolean()
    .describe('True if the founder indicates they are actively seeking a co-founder.'),
  seekingMentorship: z
    .boolean()
    .describe('True if the founder indicates they are actively seeking mentorship.'),
  ideaValidation: z
    .boolean()
    .describe(
      'True if the founder indicates they are primarily seeking feedback or validation for their idea.'
    ),
  skills: z
    .array(z.string())
    .describe('A list of key skills and expertise of the founder, inferred from the source text.'),
  experienceSummary: z
    .string()
    .describe(
      "A summary of the founder's relevant professional experience and background, extracted from the source text."
    ),
  linkedInProfileUrl: z
    .string()
    .url()
    .optional()
    .describe('The original LinkedIn profile URL if one was provided with the input.'),
});
export type FounderProfileGenerationOutput = z.infer<
  typeof FounderProfileGenerationOutputSchema
>;

const prompt = ai.definePrompt({
  name: 'founderProfileGenerationPrompt',
  input: { schema: FounderProfileGenerationInputSchema },
  output: { schema: FounderProfileGenerationOutputSchema },
  prompt: `You are an AI assistant specialized in generating founder profiles for a startup matchmaking platform.
Your task is to extract key information from the provided text to create a structured founder profile.

If the input is from a LinkedIn profile (Source Type: 'linkedin'), prioritize professional details, experience, and skills.
If the input is a brief pitch (Source Type: 'pitch'), focus on the 'what are you building' aspect, identifying needs like co-founders, mentorship, or idea validation.

Carefully read the following and generate a JSON object matching the requested schema. If a piece of information is not explicitly available or cannot be reasonably inferred, omit optional fields or use an appropriate default (e.g., false for booleans, empty array for lists). Do not invent information.

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
      throw new Error('Failed to generate founder profile.');
    }

    // If originalLinkedInUrl was provided in the input, ensure it's included in the output.
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

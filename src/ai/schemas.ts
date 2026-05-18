
import { z } from 'genkit';

export const StartupRoleSchema = z.enum([
  'tech-founder',
  'sales-founder',
  'product-founder',
  'investor',
  'visionary',
  'advisor',
]);

export type StartupRole = z.infer<typeof StartupRoleSchema>;

export const FounderProfileGenerationInputSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  country: z.string().optional(),
  age: z.string().optional(),
  idea: z.string().describe('The startup idea or pitch content.'),
});

export type FounderProfileGenerationInput = z.infer<
  typeof FounderProfileGenerationInputSchema
>;

export const FounderProfileGenerationOutputSchema = z.object({
  name: z.string().describe('The full name of the person.'),
  role: StartupRoleSchema.describe('The primary role of the person in the startup ecosystem.'),
  tagline: z
    .string()
    .describe(
      'A concise and impactful tagline describing what the person is building, their investment thesis, or their primary focus.'
    ),
  companyName: z
    .string()
    .optional()
    .describe('The name of the company or project, if applicable.'),
  companyDescription: z
    .string()
    .optional()
    .describe('A brief description of the company or project.'),
  seekingCoFounder: z
    .boolean()
    .describe('True if the person indicates they are actively seeking a co-founder.'),
  seekingMentorship: z
    .boolean()
    .describe('True if the person indicates they are actively seeking mentorship.'),
  ideaValidation: z
    .boolean()
    .describe(
      'True if the person indicates they are primarily seeking feedback or validation.'
    ),
  skills: z
    .array(z.string())
    .describe('A list of key skills, expertise, or investment sectors.'),
  experienceSummary: z
    .string()
    .describe(
      "A summary of the person's relevant professional experience and background based on their idea and intent."
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

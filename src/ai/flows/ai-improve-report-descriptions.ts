'use server';
/**
 * @fileOverview An AI assistant that suggests improvements for report descriptions.
 *
 * - aiImproveReportDescriptions - A function that suggests improvements for a given report description.
 * - AiImproveReportDescriptionsInput - The input type for the aiImproveReportDescriptions function.
 * - AiImproveReportDescriptionsOutput - The return type for the aiImproveReportDescriptions function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiImproveReportDescriptionsInputSchema = z.object({
  originalDescription: z
    .string()
    .describe('The original report description to be improved.'),
});
export type AiImproveReportDescriptionsInput = z.infer<
  typeof AiImproveReportDescriptionsInputSchema
>;

const AiImproveReportDescriptionsOutputSchema = z.object({
  improvedDescription: z
    .string()
    .describe('The AI-suggested improved report description.'),
});
export type AiImproveReportDescriptionsOutput = z.infer<
  typeof AiImproveReportDescriptionsOutputSchema
>;

export async function aiImproveReportDescriptions(
  input: AiImproveReportDescriptionsInput
): Promise<AiImproveReportDescriptionsOutput> {
  return aiImproveReportDescriptionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'improveReportDescriptionPrompt',
  input: { schema: AiImproveReportDescriptionsInputSchema },
  output: { schema: AiImproveReportDescriptionsOutputSchema },
  prompt: `You are an expert AI assistant specializing in enhancing report descriptions.
Your task is to take an original report description and improve its clarity, impact, and overall readability, making it easily understandable for all stakeholders, including those without technical backgrounds.
Focus on concise language, highlight key outcomes, and ensure a professional tone.

Original Report Description: """{{{originalDescription}}}"""

Provide the improved description, formatted as a JSON object with a single field 'improvedDescription'.`,
});

const aiImproveReportDescriptionsFlow = ai.defineFlow(
  {
    name: 'aiImproveReportDescriptionsFlow',
    inputSchema: AiImproveReportDescriptionsInputSchema,
    outputSchema: AiImproveReportDescriptionsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);

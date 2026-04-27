'use server';
/**
 * @fileOverview This file implements a Genkit flow for generating content ideas for documents.
 *
 * - aiGenerateContentIdeasForDocuments - A function that generates content ideas based on document type, topic, and optional existing content.
 * - AiGenerateContentIdeasForDocumentsInput - The input type for the aiGenerateContentIdeasForDocuments function.
 * - AiGenerateContentIdeasForDocumentsOutput - The return type for the aiGenerateContentIdeasForDocuments function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiGenerateContentIdeasForDocumentsInputSchema = z.object({
  documentType: z
    .string()
    .describe('The type of document for which to generate ideas (e.g., "proposal", "report", "presentation").'),
  topic: z.string().describe('The main topic or purpose of the document.'),
  existingContent: z
    .string()
    .optional()
    .describe('Optional: Existing content, draft, or summary to provide context for idea generation.'),
});
export type AiGenerateContentIdeasForDocumentsInput = z.infer<
  typeof AiGenerateContentIdeasForDocumentsInputSchema
>;

const AiGenerateContentIdeasForDocumentsOutputSchema = z.object({
  ideas: z
    .array(z.string())
    .describe('A list of generated content ideas, each with a brief explanation.'),
  summary: z
    .string()
    .describe('A summary of the generated ideas or general advice on content improvement.'),
});
export type AiGenerateContentIdeasForDocumentsOutput = z.infer<
  typeof AiGenerateContentIdeasForDocumentsOutputSchema
>;

export async function aiGenerateContentIdeasForDocuments(
  input: AiGenerateContentIdeasForDocumentsInput
): Promise<AiGenerateContentIdeasForDocumentsOutput> {
  return aiGenerateContentIdeasForDocumentsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateContentIdeasPrompt',
  input: { schema: AiGenerateContentIdeasForDocumentsInputSchema },
  output: { schema: AiGenerateContentIdeasForDocumentsOutputSchema },
  prompt: `You are an AI assistant specialized in generating creative and comprehensive content ideas for business documents. Your goal is to help users overcome writer's block and create engaging and informative documents.

The user is working on a document of type: {{{documentType}}}.
The main topic or purpose of this document is: {{{topic}}}.

{{#if existingContent}}
Here is some existing content or a current draft to consider:
{{{existingContent}}}
{{/if}}

Based on the document type, topic, and existing content (if provided), generate 5-7 distinct and creative content ideas that would make the document more comprehensive and engaging. For each idea, provide a brief explanation of why it's valuable. Also, provide a general summary or advice on how to approach these ideas or improve the document overall.

Format your output as a JSON object with two fields: 'ideas' (an array of strings, where each string is a content idea with its explanation) and 'summary' (a string containing overall advice).`,
});

const aiGenerateContentIdeasForDocumentsFlow = ai.defineFlow(
  {
    name: 'aiGenerateContentIdeasForDocumentsFlow',
    inputSchema: AiGenerateContentIdeasForDocumentsInputSchema,
    outputSchema: AiGenerateContentIdeasForDocumentsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);

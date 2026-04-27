'use server';
/**
 * @fileOverview A Genkit flow for summarizing proposal drafts for SI Partners.
 *
 * - aiSummarizeProposalDrafts - A function that handles the summarization process.
 * - SummarizeProposalDraftsInput - The input type for the aiSummarizeProposalDrafts function.
 * - SummarizeProposalDraftsOutput - The return type for the aiSummarizeProposalDrafts function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SummarizeProposalDraftsInputSchema = z.object({
  proposalDraft: z
    .string()
    .describe('The full text of the proposal draft to be summarized.'),
});
export type SummarizeProposalDraftsInput = z.infer<
  typeof SummarizeProposalDraftsInputSchema
>;

const SummarizeProposalDraftsOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the proposal draft.'),
});
export type SummarizeProposalDraftsOutput = z.infer<
  typeof SummarizeProposalDraftsOutputSchema
>;

export async function aiSummarizeProposalDrafts(
  input: SummarizeProposalDraftsInput
): Promise<SummarizeProposalDraftsOutput> {
  return summarizeProposalDraftsFlow(input);
}

const summarizeProposalDraftsPrompt = ai.definePrompt({
  name: 'summarizeProposalDraftsPrompt',
  input: { schema: SummarizeProposalDraftsInputSchema },
  output: { schema: SummarizeProposalDraftsOutputSchema },
  prompt: `You are an AI assistant specialized in summarizing business proposals. Your goal is to provide a concise and clear summary of the provided proposal draft, highlighting key objectives, proposed solutions, benefits, and any critical information. The summary should be easy to understand for team members or clients.

Proposal Draft:
{{{proposalDraft}}}`,
});

const summarizeProposalDraftsFlow = ai.defineFlow(
  {
    name: 'summarizeProposalDraftsFlow',
    inputSchema: SummarizeProposalDraftsInputSchema,
    outputSchema: SummarizeProposalDraftsOutputSchema,
  },
  async (input) => {
    const { output } = await summarizeProposalDraftsPrompt(input);
    return output!;
  }
);

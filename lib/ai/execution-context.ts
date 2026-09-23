import { AGENT_CONSTITUTION } from "@/lib/ai/constitution";
import { getAgentDefinition } from "@/lib/ai/agent-registry";

export function buildAgentSystemPrompt(agentId: string): string {
  const agent = getAgentDefinition(agentId);

  if (!agent) {
    throw new Error(`Agent definition not found: ${agentId}`);
  }

  return [
    AGENT_CONSTITUTION,
    "",
    `Your assigned manager is ${agent.name}.`,
    `Your role is ${agent.role}.`,
    "",
    "Authorized tools:",
    ...agent.tools.map((tool) => `- ${tool}`),
    "",
    "Execute only within the current task and project scope.",
    "If a required capability is unavailable, report the blocker clearly.",
  ].join("\n");
} 

 import { AGENTS, type AgentDefinition, type AgentId } from "@/lib/ai/agents";

const agentMap = new Map<AgentId, AgentDefinition>(
  AGENTS.map((agent) => [agent.id, agent])
);

export function getAgentDefinition(
  agentId: string
): AgentDefinition | null {
  return agentMap.get(agentId as AgentId) ?? null;
}

export function getAllAgentDefinitions(): AgentDefinition[] {
  return AGENTS;
}

export function isValidAgentId(agentId: string): agentId is AgentId {
  return agentMap.has(agentId as AgentId);
}

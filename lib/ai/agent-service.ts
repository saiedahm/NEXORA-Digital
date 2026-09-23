import { prisma } from "@/lib/db/client";
import {
  getAgentDefinition,
  isValidAgentId,
} from "@/lib/ai/agent-registry";

export async function getAgentById(agentId: string) {
  if (!isValidAgentId(agentId)) {
    return null;
  }

  const definition = getAgentDefinition(agentId);

  if (!definition) {
    return null;
  }

  const agent = await prisma.aiAgent.findUnique({
    where: {
      key: definition.id,
    },
  });

  return agent;
}

export async function ensureAgentExists(agentId: string) {
  if (!isValidAgentId(agentId)) {
    throw new Error(`Unknown AI agent: ${agentId}`);
  }

  const definition = getAgentDefinition(agentId);

  if (!definition) {
    throw new Error(`AI agent definition not found: ${agentId}`);
  }

  const agent = await prisma.aiAgent.upsert({
    where: {
      key: definition.id,
    },
    update: {
      name: definition.name,
      role: definition.role,
      department: definition.role,
      permissions: {
        tools: definition.tools,
      },
      tools: definition.tools,
    },
    create: {
      key: definition.id,
      name: definition.name,
      role: definition.role,
      department: definition.role,
      systemPrompt: `You are ${definition.name}, the NEXORA DIGITAL ${definition.role}. Follow the NEXORA AI constitution and use only authorized tools.`,
      permissions: {
        tools: definition.tools,
      },
      tools: definition.tools,
      status: "OFFLINE",
    },
  });

  return agent;
} 

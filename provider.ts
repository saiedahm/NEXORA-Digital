import {z} from "zod";
export type AIRequest={system:string;user:string;model?:string;timeoutMs?:number};
export type AIUsage={inputTokens:number;outputTokens:number;totalTokens:number;durationMs:number;model:string};
export type AIResponse<T>={output:T;usage:AIUsage};
export interface AIProvider{generate<T>(request:AIRequest,schema:z.ZodType<T>):Promise<AIResponse<T>>}
export class ProviderNotConfiguredError extends Error{constructor(){super("AI provider is not configured");this.name="ProviderNotConfiguredError"}}
export function getAIProvider():AIProvider{throw new ProviderNotConfiguredError()}

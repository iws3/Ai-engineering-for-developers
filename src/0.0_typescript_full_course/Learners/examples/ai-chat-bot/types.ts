/**
 * Complete AI ChatBot Example - Type Definitions
 * 
 * This example shows type-safe integration with an LLM API
 */

// Message types for conversation
export type MessageRole = "user" | "assistant" | "system";

export interface Message {
  role: MessageRole;
  content: string;
}

// LLM API Request/Response types
export interface ChatRequest {
  model: string;
  messages: Message[];
  temperature?: number;
  maxTokens?: number;
}

export interface ChatResponse {
  id: string;
  model: string;
  choices: Array<{
    index: number;
    message: Message;
    finishReason: string;
  }>;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

// Chat session type
export interface ChatSession {
  id: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

// Configuration type
export interface ChatBotConfig {
  apiKey: string;
  apiEndpoint: string;
  model: string;
  temperature: number;
}

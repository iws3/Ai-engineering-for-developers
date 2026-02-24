/**
 * Type-safe AI ChatBot Implementation
 */

import { ChatBotConfig, ChatSession, Message, ChatRequest, ChatResponse } from "./types";

export class AIChatsBot {
  private config: ChatBotConfig;
  private session: ChatSession;

  constructor(config: ChatBotConfig) {
    this.config = config;
    this.session = {
      id: Date.now().toString(),
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  /**
   * Send message to AI and get response
   */
  async chat(userMessage: string): Promise<string> {
    // Add user message to session
    this.session.messages.push({
      role: "user",
      content: userMessage
    });

    try {
      // Call LLM API
      const response = await this.callLLM();

      // Extract assistant response
      if (!response.choices.length) {
        throw new Error("No response from LLM");
      }

      const assistantMessage = response.choices[0].message.content;

      // Add to session
      this.session.messages.push({
        role: "assistant",
        content: assistantMessage
      });

      this.session.updatedAt = new Date();

      return assistantMessage;
    } catch (error) {
      throw new Error(`Failed to get ChatBot response: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  /**
   * Call the LLM API with type safety
   */
  private async callLLM(): Promise<ChatResponse> {
    // Prepare request
    const request: ChatRequest = {
      model: this.config.model,
      messages: this.session.messages,
      temperature: this.config.temperature
    };

    // Make API call
    const response = await fetch(this.config.apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.config.apiKey}`
      },
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    // Parse and type-check response
    const data = (await response.json()) as ChatResponse;
    return data;
  }

  /**
   * Get chat history
   */
  getHistory(): Message[] {
    return this.session.messages;
  }

  /**
   * Clear session
   */
  clear(): void {
    this.session = {
      id: Date.now().toString(),
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  /**
   * Get session metadata
   */
  getSessionInfo() {
    return {
      id: this.session.id,
      messageCount: this.session.messages.length,
      createdAt: this.session.createdAt,
      updatedAt: this.session.updatedAt
    };
  }
}

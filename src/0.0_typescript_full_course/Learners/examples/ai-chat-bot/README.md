# AI ChatBot Example - Type-Safe LLM Integration

This example demonstrates how to build a type-safe ChatBot that integrates with an LLM API (like OpenAI GPT-4).

## Files

- **types.ts** - All TypeScript interface definitions
- **chatbot.ts** - ChatBot implementation with full type safety

## Key TypeScript Patterns

### 1. Strict Type Definitions
Every API response and request is typed, preventing runtime errors.

### 2. Error Handling
Functions that might fail (async) include proper error handling with typed errors.

### 3. Session Management
The chat session maintains typed message history for conversation context.

## Usage Example

```typescript
import { AIChatsBot } from "./chatbot";

// Create bot with configuration
const bot = new AIChatsBot({
  apiKey: process.env.OPENAI_API_KEY || "",
  apiEndpoint: "https://api.openai.com/v1/chat/completions",
  model: "gpt-4",
  temperature: 0.7
});

// Have a conversation
const response = await bot.chat("What is TypeScript?");
console.log(response);

// Get history
const history = bot.getHistory();
console.log(history);

// Session info
const info = bot.getSessionInfo();
console.log(`${info.messageCount} messages in session`);
```

## Benefits of Type Safety

✅ TypeScript catches typos in field names at compile-time
✅ IDE autocomplete shows available properties
✅ API changes are caught when you update types
✅ Team members know exactly what data structures to expect
✅ Refactoring is safe - changing a type updates all usages

## Real-World Improvements

For production, you'd add:
- Retry logic with exponential backoff
- Token counting to prevent hitting limits
- Response validation (zod/joi)
- Logging and monitoring
- Rate limiting
- Caching of responses

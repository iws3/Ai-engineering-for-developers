# Chapter 1: TypeScript for AI Engineering — Deep Supplement

## Why TypeScript Matters in AI

Modern AI systems rely on integrating multiple APIs, managing complex data pipelines, and ensuring type safety across systems. TypeScript is essential for production AI systems.

---

## Part 1: Why TypeScript — AI Focus

### LLM API Integration Safety

When working with OpenAI, Anthropic, or other LLM providers, type safety is critical:

```typescript
// ❌ Without TypeScript - Easy mistakes
async function chat(model, messages, temperature) {
  // Is temperature 0.8 or 80? Expensive API call with wrong param!
  // Is model string valid? Check later? Too late, API error!
  const response = await callAPI(model, messages, temperature);
  return response.choices[0].message.content;
}

// ✅ With TypeScript - Type-safe
interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface ChatParams {
  model: "gpt-4" | "gpt-4turbo" | "gpt-3.5-turbo";
  messages: ChatMessage[];
  temperature: number;  // TypeScript validates: 0-2
  max_tokens: number;
  top_p?: number;       // 0-1
}

async function chat(params: ChatParams): Promise<string> {
  // Every parameter validated before expensive API call
  // Saves money, time, and prevents mysterious failures
  const response = await openai.chat.completions.create(params);
  return response.choices[0].message.content;
}
```

### Data Pipeline Type Safety

AI systems move data between preprocessing, model calls, and post-processing:

```typescript
// Data flow with clear types
interface RawData {
  text: string;
  metadata: Record<string, unknown>;
}

interface ProcessedData {
  tokens: string[];
  embeddings: number[];   // Vector of fixed length
  normalized: boolean;
}

interface PredictionResult {
  prediction: number;
  confidence: number;      // 0-1
  explanation: string;
}

// Type-safe pipeline
function preprocess(raw: RawData): ProcessedData {
  // Must return ProcessedData shape
  return {
    tokens: raw.text.split(' '),
    embeddings: Array(1536).fill(0),  // OpenAI embedding size
    normalized: true
  };
}

function predict(data: ProcessedData): PredictionResult {
  // Type checker ensures we follow correct format
  return {
    prediction: 0.95,
    confidence: 0.99,
    explanation: "High confidence prediction"
  };
}
```

### Batch Processing Safety

Working with datasets of thousands or millions of records:

```typescript
interface DataPoint {
  id: string;
  input: string;
  label?: string;          // Optional for unlabeled data
}

interface ProcessingResult {
  id: string;
  output: string;
  processingTime: number;
  error?: string;
}

// Process batches safely
async function processBatch(
  dataPoints: DataPoint[]
): Promise<ProcessingResult[]> {
  const results: ProcessingResult[] = [];
  
  for (const point of dataPoints) {
    try {
      const output = await llm.generate(point.input);
      results.push({
        id: point.id,
        output,
        processingTime: Date.now()
      });
    } catch (error) {
      results.push({
        id: point.id,
        output: "",
        processingTime: Date.now(),
        error: String(error)
      });
    }
  }
  
  return results;
}
```

---

## Part 2: Setup — AI Project Configuration

### Recommended AI Project Structure

```
ai-project/
├── src/
│   ├── types/              # Type definitions for AI models
│   │   ├── llm.ts          # LLM API types
│   │   ├── embeddings.ts   # Embedding types
│   │   └── data.ts         # Data pipeline types
│   ├── models/             # LLM integration
│   │   ├── openai.ts
│   │   ├── anthropic.ts
│   │   └── Index.ts
│   ├── embeddings/         # Embedding generation
│   │   ├── openai-embeddings.ts
│   │   └── local-embeddings.ts
│   ├── pipeline/           # Data processing
│   │   ├── preprocessing.ts
│   │   ├── tokenization.ts
│   │   └── postprocessing.ts
│   └── index.ts
├── tests/                  # Testing
├── .env.example            # Environment variables template
├── tsconfig.json
└── package.json
```

### AI Project tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "declaration": true,
    "skipLibCheck": true,
    "baseUrl": "./src",
    "paths": {
      "@types/*": ["types/*"],
      "@models/*": ["models/*"],
      "@embeddings/*": ["embeddings/*"],
      "@pipeline/*": ["pipeline/*"]
    },
    "resolveJsonModule": true
  }
}
```

### Essential AI Dependencies

```json
{
  "dependencies": {
    "openai": "^4.0.0",
    "axios": "^1.6.0",
    "dotenv": "^16.3.1",
    "js-tiktoken": "^1.0.0",  // Token counting
    "uuid": "^9.0.0"
  },
  "devDependencies": {
    "typescript": "^5.3.3",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@types/node": "^20.0.0"
  }
}
```

---

## Part 3: Compilation — LLM API Response Handling

### Type-Safe API Response Handling

```typescript
// Define exact API response shapes
interface OpenAIResponse {
  id: string;
  object: "text_completion";
  created: number;
  model: string;
  choices: Array<{
    text: string;
    index: number;
    logprobs: null | { tokens: string[] };
    finish_reason: "length" | "stop" | null;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// Type-safe wrapper
function parseOpenAIResponse(data: unknown): OpenAIResponse {
  // Runtime type checking for API response
  if (
    typeof data === "object" &&
    data !== null &&
    "choices" in data &&
    Array.isArray((data as Record<string, unknown>).choices)
  ) {
    return data as OpenAIResponse;
  }
  throw new Error("Invalid OpenAI response format");
}
```

---

## Part 4: First Program — Actual AI Example

### Building a Simple RAG (Retrieval-Augmented Generation) System

```typescript
import Anthropic from "@anthropic-ai/sdk";

interface Document {
  id: string;
  content: string;
  metadata?: Record<string, unknown>;
}

interface QueryResult {
  question: string;
  answer: string;
  sourceDocuments: Document[];
  confidence: number;
}

class SimpleRAG {
  private documents: Document[] = [];
  private client: Anthropic;

  constructor() {
    this.client = new Anthropic();
  }

  addDocument(doc: Document): void {
    this.documents.push(doc);
  }

  async query(question: string): Promise<QueryResult> {
    // 1. Find relevant documents (simple string matching for demo)
    const relevant = this.documents.filter(doc =>
      doc.content.toLowerCase().includes(question.toLowerCase())
    );

    // 2. Build context
    const context = relevant.map(d => d.content).join("\n\n");

    // 3. Call LLM with context
    const message = await this.client.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `Context: ${context}\n\nQuestion: ${question}\n\nAnswer:`
        }
      ]
    });

    // 4. Return typed result
    return {
      question,
      answer: message.content[0].type === "text" ? message.content[0].text : "",
      sourceDocuments: relevant,
      confidence: relevant.length > 0 ? 0.8 : 0.3
    };
  }
}

// Usage
const rag = new SimpleRAG();
rag.addDocument({
  id: "doc-1",
  content: "TypeScript is a superset of JavaScript adding static types"
});

const result = await rag.query("What is TypeScript?");
console.log(result);
```

---

## Part 5: Compiler Options for AI Production

### Production AI Configuration

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "baseUrl": "./src",
    "paths": {
      "@/*": ["./*"]
    },
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests"]
}
```

---

## Resources for AI Engineers

- [LlamaIndex TypeScript Integration](https://ts.llamaindex.ai/)
- [Vercel AI SDK](https://sdk.vercel.ai/)
- [Anthropic SDK](https://github.com/anthropics/anthropic-sdk-python)
- [OpenAI TypeScript SDK](https://github.com/openai/node-sdk)
- [Type-Safe LLM Patterns](https://www.typescriptlang.org/)


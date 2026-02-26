# Configuration Management

## Environment Configuration

```typescript
interface AppConfig {
  port: number;
  database: {
    host: string;
    port: number;
  };
  api: {
    timeout: number;
  };
}

function loadConfig(): AppConfig {
  return {
    port: parseInt(process.env.PORT || "3000"),
    database: {
      host: process.env.DB_HOST || "localhost",
      port: parseInt(process.env.DB_PORT || "5432")
    },
    api: {
      timeout: parseInt(process.env.API_TIMEOUT || "3000")
    }
  };
}

export const config = loadConfig();
```

## Checklist

- [ ] Load config from env
- [ ] Validate config
- [ ] Use defaults
- [ ] Type-safe config

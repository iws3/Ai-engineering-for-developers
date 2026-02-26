# Logging and Monitoring

## Structured Logging

```typescript
interface LogEntry {
  level: "info" | "warn" | "error";
  message: string;
  timestamp: Date;
  context?: Record<string, any>;
}

class Logger {
  private entries: LogEntry[] = [];

  info(message: string, context?: Record<string, any>): void {
    this.log({ level: "info", message, timestamp: new Date(), context });
  }

  private log(entry: LogEntry): void {
    this.entries.push(entry);
    console.log(JSON.stringify(entry));
  }
}

const logger = new Logger();
logger.info("User created", { userId: "123", email: "test@ex.com" });
```

## Checklist

- [ ] Implement structured logging
- [ ] Add monitoring
- [ ] Send logs to service
- [ ] Set up alerts

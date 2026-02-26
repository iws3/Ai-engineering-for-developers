# File System Operations

## Safe File Operations

```typescript
import { promises as fs } from "fs";

class FileManager {
  async readJSON<T>(path: string): Promise<T> {
    const content = await fs.readFile(path, "utf-8");
    return JSON.parse(content);
  }

  async writeJSON<T>(path: string, data: T): Promise<void> {
    await fs.writeFile(path, JSON.stringify(data, null, 2));
  }

  async exists(path: string): Promise<boolean> {
    try {
      await fs.access(path);
      return true;
    } catch {
      return false;
    }
  }
}
```

## Checklist

- [ ] Read/write files safely
- [ ] Handle encoding
- [ ] Watch for changes
- [ ] Clean up safely

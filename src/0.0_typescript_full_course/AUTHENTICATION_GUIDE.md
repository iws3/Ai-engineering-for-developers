# Authentication and Authorization

## JWT Handling

```typescript
import jwt from "jsonwebtoken";

interface JWTPayload {
  userId: string;
  email: string;
}

class AuthService {
  private secret = process.env.JWT_SECRET || "secret";

  generateToken(payload: JWTPayload): string {
    return jwt.sign(payload, this.secret, { expiresIn: "24h" });
  }

  verifyToken(token: string): JWTPayload | null {
    try {
      return jwt.verify(token, this.secret) as JWTPayload;
    } catch {
      return null;
    }
  }
}
```

## Checklist

- [ ] Generate JWTs safely
- [ ] Verify tokens
- [ ] Handle expiration
- [ ] Implement refresh tokens

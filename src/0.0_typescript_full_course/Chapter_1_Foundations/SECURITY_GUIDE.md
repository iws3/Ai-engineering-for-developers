# Security Best Practices with TypeScript

Building secure applications with TypeScript.

---

## 1. Type Safety as Security

### Problem: Injection Attacks
```javascript
// JavaScript - vulnerable to injection
function buildQuery(userId) {
  return `SELECT * FROM users WHERE id = ${userId}`;
}

const malicious = "1 OR 1=1; DROP TABLE users;--";
buildQuery(malicious); // Data breach!
```

### Solution: Type Safety
```typescript
// TypeScript - prevents many attacks
interface QueryParams {
  userId: number;
}

function buildQuery(params: QueryParams): string {
  return `SELECT * FROM users WHERE id = ${params.userId}`;
}

buildQuery({ userId: "1 OR 1=1--" }); // ❌ Compile error!
buildQuery({ userId: 1 }); // ✅ Safe
```

**Benefit**: Type system prevents malicious input before runtime.

---

## 2. Sensitive Data Handling

### Problem: Exposed Secrets
```typescript
// ❌ Bad - hardcoded secrets
const API_KEY = "sk-abc123xyz789";
const DATABASE_URL = "postgres://user:password@host/db";

function fetchData() {
  return fetch("/api/data", {
    headers: { Authorization: `Bearer ${API_KEY}` }
  });
}
```

### Solution: Environment Variables with Types
```typescript
// ✅ Good - environment-based with types
interface SecureConfig {
  apiKey: string;
  databaseUrl: string;
  jwtSecret: string;
}

function getConfig(): SecureConfig {
  const apiKey = process.env.API_KEY;
  const databaseUrl = process.env.DATABASE_URL;
  const jwtSecret = process.env.JWT_SECRET;
  
  if (!apiKey || !databaseUrl || !jwtSecret) {
    throw new Error('Missing required environment variables');
  }
  
  return { apiKey, databaseUrl, jwtSecret };
}

const config = getConfig();
function fetchData() {
  return fetch("/api/data", {
    headers: { Authorization: `Bearer ${config.apiKey}` }
  });
}
```

**Benefits**:
- Secrets in environment, not code
- Type checking ensures required values exist
- Never accidentally log secrets

---

## 3. Input Validation

### Problem: Unvalidated User Input
```javascript
// JavaScript - no validation
function createUser(data) {
  return {
    id: data.id,
    email: data.email,
    role: data.role,
    isAdmin: data.isAdmin // User can claim admin!
  };
}

createUser({
  id: 1,
  email: "hacker@evil.com",
  role: "user",
  isAdmin: true // Privilege escalation!
});
```

### Solution: Validated Input Types
```typescript
// Define allowed roles
type UserRole = 'user' | 'moderator' | 'admin';

// Input schema
interface CreateUserInput {
  id: number;
  email: string;
  role: UserRole;
}

// Validated output (no isAdmin field)
interface User extends CreateUserInput {
  createdAt: Date;
}

function createUser(input: CreateUserInput, currentUser: User): User {
  // Only admins can create admins
  if (input.role === 'admin' && currentUser.role !== 'admin') {
    throw new Error('Insufficient permissions');
  }
  
  return {
    ...input,
    createdAt: new Date()
  };
}

// Type system prevents isAdmin field
const user = createUser(
  {
    id: 1,
    email: "user@example.com",
    role: "user",
    isAdmin: true // ❌ Compile error - not in schema
  },
  currentUser
);
```

---

## 4. Authentication & Authorization

### Problem: Weak Auth
```javascript
// ❌ Bad - unclear auth state
function getUser(userId) {
  const user = database.findUser(userId);
  return user; // What if null? What if unauthorized?
}
```

### Solution: Type-Safe Auth
```typescript
// Auth types
interface AuthToken {
  userId: number;
  role: UserRole;
  expiresAt: Date;
}

interface AuthContext {
  token: AuthToken | null;
  isAuthenticated: boolean;
  user: User | null;
}

// Request requires auth
interface AuthenticatedRequest {
  user: User; // Not null - type guarantees authentication
  token: AuthToken;
}

// Protected function
function getPrivateData(req: AuthenticatedRequest): PrivateData {
  // Type system ensures user exists
  return database.getPrivateData(req.user.id);
}

// Middleware enforces authentication
function requireAuth(req: Request): AuthenticatedRequest {
  const token = verifyToken(req.headers.authorization);
  const user = database.getUser(token.userId);
  
  if (!user) {
    throw new Error('User not found');
  }
  
  return { user, token };
}

// Usage
app.get('/api/private', (req, res) => {
  const authReq = requireAuth(req); // Type: AuthenticatedRequest
  const data = getPrivateData(authReq); // Safe!
  res.json(data);
});
```

---

## 5. Data Sanitization

### Problem: XSS Attacks in React
```javascript
// ❌ Vulnerable
function Comment({ text }) {
  return <div>{text}</div>; // If text has HTML, executes!
}

Comment({ text: '<img src=x onerror="stealData()">' }); // XSS!
```

### Solution: Type-Safe Sanitization
```typescript
// Mark sanitized strings
type SanitizedHTML = string & { readonly _sanitized: true };

function sanitizeHTML(html: string): SanitizedHTML {
  // Use DOMPurify or similar
  const clean = purify(html);
  return clean as SanitizedHTML;
}

interface CommentProps {
  text: SanitizedHTML; // Type requires sanitized input
}

function Comment({ text }: CommentProps) {
  return <div>{text}</div>; // Safe!
}

// Must sanitize first
const userInput = '<img src=x onerror="stealData()">';
const safe = sanitizeHTML(userInput);
<Comment text={safe} />; // ✅ Type-safe

<Comment text={userInput} />; // ❌ Compile error!
```

---

## 6. CORS & CSRF Protection

### Problem: Unprotected API Calls
```javascript
// ❌ Vulnerable to CSRF
fetch('/api/transfer', {
  method: 'POST',
  body: JSON.stringify({ amount: 1000, to: 'hacker@evil.com' })
}); // No CSRF token!
```

### Solution: Type-Safe CSRF Protection
```typescript
interface RequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  csrfToken?: string;
}

interface SafeRequest extends RequestConfig {
  csrfToken: string; // Mandatory for write operations
}

function validateWriteRequest(config: RequestConfig): SafeRequest {
  const token = extractCSRFToken();
  
  if (!token) {
    throw new Error('CSRF token missing');
  }
  
  return {
    ...config,
    csrfToken: token
  };
}

async function apiCall(config: RequestConfig): Promise<Response> {
  // Write operations require validated config
  if (config.method !== 'GET') {
    const safe = validateWriteRequest(config);
    return fetch('/api', {
      ...safe,
      headers: { 'X-CSRF-Token': safe.csrfToken }
    });
  }
  
  return fetch('/api', config);
}

// Usage
apiCall({
  method: 'POST',
  body: { amount: 1000 }
  // csrfToken auto-added for POST
});
```

---

## 7. SQL Injection Prevention

### Problem: String Interpolation
```typescript
// ❌ Vulnerable
const query = `SELECT * FROM users WHERE email = '${userEmail}'`;
// Email: '; DROP TABLE users;--
```

### Solution: Parameterized Queries
```typescript
interface QueryParams {
  email: string;
}

function getUserByEmail(email: string): Promise<User> {
  // Type-safe parameterized query
  return db.query<User>(
    'SELECT * FROM users WHERE email = $1',
    [email] // Parameter, separate from query
  );
}

// Attacks can't escape parameters
getUserByEmail("'; DROP TABLE users;--"); // Safe!
```

---

## 8. Password Security

### Problem: Plain Text Passwords
```javascript
// ❌ Never store plain text
function createUser(email, password) {
  return {
    email,
    passwordHash: password // Plain text!
  };
}
```

### Solution: Hashed Passwords
```typescript
import bcrypt from 'bcrypt';

interface CreateUserRequest {
  email: string;
  password: string; // Plain text input only
}

interface StoredUser {
  id: number;
  email: string;
  passwordHash: string; // Never plain text
}

async function createUser(req: CreateUserRequest): Promise<StoredUser> {
  // Hash password before storing
  const passwordHash = await bcrypt.hash(req.password, 10);
  
  return database.create({
    email: req.email,
    passwordHash // Hashed, secure
  });
}

async function verifyPassword(
  plaintext: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(plaintext, hash);
}

// Usage
const user = await createUser({
  email: 'user@example.com',
  password: 'MySecurePassword123!'
});

// Later, verify
const isValid = await verifyPassword('MySecurePassword123!', user.passwordHash);
```

---

## 9. Rate Limiting

### Problem: Brute Force Attacks
```javascript
// ❌ No rate limiting
app.post('/login', (req, res) => {
  const user = authenticate(req.body.email, req.body.password);
  return user; // Attacker can try unlimited passwords!
});
```

### Solution: Type-Safe Rate Limiting
```typescript
interface RateLimitConfig {
  maxAttempts: number;
  windowMs: number; // milliseconds
}

interface RateLimitedRequest {
  remainingAttempts: number;
  resetTime: Date;
}

class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  
  check(
    identifier: string,
    config: RateLimitConfig
  ): RateLimitedRequest {
    const now = Date.now();
    const attempts = this.attempts.get(identifier) || [];
    
    // Clear old attempts
    const recent = attempts.filter(
      time => now - time < config.windowMs
    );
    
    if (recent.length >= config.maxAttempts) {
      throw new Error('Too many attempts');
    }
    
    recent.push(now);
    this.attempts.set(identifier, recent);
    
    return {
      remainingAttempts: config.maxAttempts - recent.length,
      resetTime: new Date(Math.max(...recent) + config.windowMs)
    };
  }
}

// Usage
const limiter = new RateLimiter();

app.post('/login', (req, res) => {
  try {
    const limit = limiter.check(req.ip, {
      maxAttempts: 5,
      windowMs: 15 * 60 * 1000 // 15 minutes
    });
    
    const user = authenticate(req.body.email, req.body.password);
    return user;
  } catch (error) {
    res.status(429).json({
      error: 'Too many attempts',
      resetTime: new Date()
    });
  }
});
```

---

## 10. Dependency Scanning

### Problem: Vulnerable Dependencies
```json
{
  "dependencies": {
    "vulnerable-package": "1.0.0" // Has known CVE!
  }
}
```

### Solution: Regular Auditing
```bash
# Check for vulnerabilities
npm audit

# Fix automatically
npm audit fix

# In CI/CD, fail on vulnerabilities
npm audit --audit-level=moderate
```

### TypeScript Integration
```typescript
// Use security scanning in your types
interface DependencyAudit {
  package: string;
  version: string;
  vulnerabilities: number;
  severity: 'low' | 'moderate' | 'high' | 'critical';
}

// Only allow safe versions
type SafePackageVersion = 
  | '@safe-package/pkg@^2.5.0'
  | '@secure-lib/lib@^1.10.0';
```

---

## Security Checklist

- [ ] All secrets in environment variables
- [ ] Input validation on all user data
- [ ] Authentication required for sensitive endpoints
- [ ] Authorization checks on all operations
- [ ] SQL queries parameterized
- [ ] HTML properly sanitized
- [ ] CSRF tokens on all write operations
- [ ] Passwords hashed (never plain text)
- [ ] Rate limiting on auth endpoints
- [ ] Dependencies audited regularly
- [ ] HTTPS enforced
- [ ] CORS properly configured
- [ ] Error messages don't leak info
- [ ] Logging doesn't store sensitive data
- [ ] Security headers set (CSP, X-Frame-Options, etc.)

---


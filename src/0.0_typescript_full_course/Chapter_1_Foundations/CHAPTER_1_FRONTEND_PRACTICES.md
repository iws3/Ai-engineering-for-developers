# Chapter 1: Frontend Development - TypeScript Best Practices

## Why TypeScript Matters in Frontend

Frontend applications have unique type safety challenges:
- **Event Handlers**: What events can occur and what do they contain?
- **DOM Elements**: Is this element defined? What type is it?
- **Props/State**: What shape of data should this component receive?
- **Callbacks**: What should this function return or accept?
- **Form Data**: What data should the form submit?

---

## 1. Type-Safe React Props

### The Problem (without TypeScript)

```javascript
// Plain React - No guarantee props are correct
function UserCard({ user, onClick }) {
  return (
    <div onClick={onClick}>
      <h1>{user.name}</h1>
      <p>{user.emailAddress}</p>  // Typo! Field doesn't exist
      <button>{user.isActive ? 'Active' : 'Inactive'}</button>
    </div>
  );
}

// Parent passes wrong data
<UserCard
  user={{ name: 'Alice', email: 'alice@example.com' }}  // Wrong field name!
  onClick="handleClick"  // Wrong: should be function
/>
```

**Risks**:
- Typo in property name causes runtime error
- Wrong data type goes unnoticed until user clicks
- Parent component doesn't know what UserCard needs

### The Solution (with TypeScript)

```typescript
// Define exactly what props this component needs
interface UserCardProps {
  user: {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
  };
  onClick: (userId: number) => void;
}

// Component is fully typed
function UserCard({ user, onClick }: UserCardProps) {
  return (
    <div onClick={() => onClick(user.id)}>
      <h1>{user.name}</h1>
      <p>{user.email}</p>  {/* TypeScript won't let emailAddress typo */}
      <button>{user.isActive ? 'Active' : 'Inactive'}</button>
    </div>
  );
}

// Usage - TypeScript checks everything
<UserCard
  user={{
    id: 1,
    name: 'Alice',
    email: 'alice@example.com',  // Must use 'email', not 'emailAddress'
    isActive: true
  }}
  onClick={(id: number) => {
    console.log(`Clicked user ${id}`);
  }}
/>
```

**Benefits**:
- Props structure is enforced by type system
- IDE autocomplete shows all available props
- Parent MUST pass correct data shape
- Refactoring is safe - changing prop type updates everywhere

---

## 2. Event Handler Type Safety

### Handling DOM Events

```typescript
// Define event handler types for different elements

// Text input change
function SearchInput() {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;  // Type: string
    console.log(value);
  };

  return <input onChange={handleChange} />;
}

// Form submission
interface FormData {
  email: string;
  password: string;
}

function LoginForm() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Get form data type-safely
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;  // Get and cast
    const password = formData.get('password') as string;
    
    console.log({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" />
      <input name="password" type="password" />
      <button type="submit">Login</button>
    </form>
  );
}

// Button click
function DeleteButton({ onDelete }: { onDelete: () => void }) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (confirm('Are you sure?')) {
      onDelete();
    }
  };

  return (
    <button onClick={handleClick} danger>
      Delete
    </button>
  );
}
```

**Benefits**:
- Event object has correct type
- AutoComplete suggests available event properties
- Compile-time checks for event handler signature

---

## 3. Type-Safe State Management

### useState with Types

```typescript
// React.useState automatically infers types
function Counter() {
  const [count, setCount] = React.useState(0);  // Inferred: number
  // count type: number, setCount can only accept number
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount("5")}>Decrement (ERROR!)</button>
    </div>
  );
}

// Complex state example
interface AppState {
  user: {
    id: number;
    name: string;
    role: 'admin' | 'user' | 'guest';
  } | null;
  isLoading: boolean;
  error: string | null;
}

function App() {
  const [state, setState] = React.useState<AppState>({
    user: null,
    isLoading: false,
    error: null
  });

  // Update state - must match interface shape
  const login = async (email: string, password: string) => {
    setState({ ...state, isLoading: true });  // Spreads correctly typed object
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      
      if (!response.ok) throw new Error('Login failed');
      
      const user = await response.json();
      setState({
        user,  // Must match { id, name, role }
        isLoading: false,
        error: null
      });
    } catch (err) {
      setState({
        user: null,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Unknown error'
      });
    }
  };

  return (
    <div>
      {state.isLoading && <p>Loading...</p>}
      {state.error && <p style={{ color: 'red' }}>{state.error}</p>}
      {state.user && <>Welcome, {state.user.name}</>}
    </div>
  );
}
```

---

## 4. Type-Safe Hooks

### Creating Custom Hooks

```typescript
// Custom hook with full type safety
interface UseFormConfig<T> {
  initialValues: T;
  onSubmit: (values: T) => Promise<void>;
}

function useForm<T extends Record<string, any>>({
  initialValues,
  onSubmit
}: UseFormConfig<T>) {
  const [values, setValues] = React.useState<T>(initialValues);
  const [errors, setErrors] = React.useState<Record<keyof T, string>>({} as any);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleChange = (field: keyof T, value: any) => {
    setValues((prev) => ({
      ...prev,
      [field]: value
    }));
    // Clear error for this field
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { values, errors, isSubmitting, handleChange, handleSubmit };
}

// Usage - fully typed
interface SignupData {
  email: string;
  password: string;
  name: string;
}

function SignupForm() {
  const form = useForm<SignupData>({
    initialValues: { email: '', password: '', name: '' },
    onSubmit: async (values) => {
      await fetch('/api/signup', { method: 'POST', body: JSON.stringify(values) });
    }
  });

  return (
    <form onSubmit={form.handleSubmit}>
      <input
        value={form.values.email}  // Type: string
        onChange={(e) => form.handleChange('email', e.target.value)}
      />
      <input
        value={form.values.password}  // Type: string
        type="password"
      />
      <input
        value={form.values.name}  // Type: string
      />
      <button type="submit" disabled={form.isSubmitting}>
        Sign Up
      </button>
    </form>
  );
}
```

---

## 5. Type-Safe API Calls

### Structuring API Integration

```typescript
// Define API response types
interface ApiResponse<T> {
  data: T;
  status: number;
  timestamp: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface ApiError {
  message: string;
  code: string;
}

// Create type-safe API client
const api = {
  async getUser(id: number): Promise<ApiResponse<User>> {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    return response.json();
  },

  async updateUser(id: number, data: Partial<User>): Promise<ApiResponse<User>> {
    const response = await fetch(`/api/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
    return response.json();
  }
};

// Use in component
function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    api
      .getUser(userId)
      .then((response) => setUser(response.data))  // Type: User
      .catch((error) => setError(error.message));
  }, [userId]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

---

## 6. Form Validation Types

```typescript
// Define validation rules as types
type ValidationRule<T> = (value: T) => string | null;

interface ValidationRules<T> {
  [K in keyof T]?: ValidationRule<T[K]>[];
}

class FormValidator<T extends Record<string, any>> {
  constructor(private rules: ValidationRules<T>) {}

  validate(values: T): Record<keyof T, string> {
    const errors = {} as Record<keyof T, string>;

    for (const field in this.rules) {
      const fieldRules = this.rules[field as keyof T];
      if (!fieldRules) continue;

      const value = values[field];
      for (const rule of fieldRules) {
        const error = rule(value);
        if (error) {
          errors[field as keyof T] = error;
          break;  // Stop on first error
        }
      }
    }

    return errors;
  }
}

// Usage
interface LoginForm {
  email: string;
  password: string;
}

const validator = new FormValidator<LoginForm>({
  email: [
    (value) => !value ? 'Email is required' : null,
    (value) => !value.includes('@') ? 'Invalid email' : null
  ],
  password: [
    (value) => !value ? 'Password is required' : null,
    (value) => value.length < 8 ? 'Password must be 8+ characters' : null
  ]
});

const errors = validator.validate({
  email: 'alice@example.com',
  password: 'secure123'
});  // Type: Record<'email' | 'password', string>
```

---

## Best Practices Summary

1. **Define prop interfaces** for every component
2. **Type event handlers** explicitly
3. **Declare state shapes** with interfaces
4. **Create typed hooks** for reuse
5. **Type API responses** from the start
6. **Validate forms** with typed validation
7. **Use discriminated unions** for complex state
8. **Keep type definitions** close to usage

These practices result in:
- ✅ Self-documenting components
- ✅ Better IDE autocomplete
- ✅ Fewer prop-related bugs
- ✅ Easier team collaboration
- ✅ Safer refactoring


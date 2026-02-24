# Chapter 1: TypeScript for Frontend Development — Deep Supplement

## Why TypeScript Matters for Web UI

Modern web applications handle complex state, user interactions, and API communication. TypeScript prevents many common frontend bugs like:
- Passing wrong props to components
- Accessing properties that don't exist
- Event handler type mismatches
- State management bugs

---

## Part 1: Why TypeScript — Frontend Focus

### Component Props Type Safety

```typescript
// ❌ Without TypeScript - Fragile
function UserCard(props) {
  return (
    <div>
      <h3>{props.name}</h3>
      <p>{props.email}</p>
      <button onClick={props.onEdit}>Edit</button>
    </div>
  );
}

// Parent component issues:
// - Might forget to pass required props
// - Might pass wrong type for onEdit
// - IDE can't help with autocomplete

// ✅ With TypeScript - Type-safe
interface UserCardProps {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "guest";
  onEdit: (id: string) => void;
  onDelete?: (id: string) => Promise<void>;
  isLoading?: boolean;
}

function UserCard({
  id,
  name,
  email,
  role,
  onEdit,
  onDelete,
  isLoading = false,
}: UserCardProps) {
  return (
    <div className={`card role-${role}`}>
      <h3>{name}</h3>
      <p>{email}</p>
      <button onClick={() => onEdit(id)} disabled={isLoading}>
        Edit
      </button>
      {onDelete && (
        <button onClick={() => onDelete(id)} disabled={isLoading}>
          Delete
        </button>
      )}
    </div>
  );
}
```

### Event Handler Type Safety

```typescript
// ❌ Without TypeScript
function SearchBox(props) {
  return (
    <input 
      onChange={props.onSearch}  // What are its parameters?
      onClick={props.onClick}    // Is onClick a function or event handler?
    />
  );
}

// ✅ With TypeScript
interface SearchBoxProps {
  onSearch: (query: string) => void;
  onClick: (e: React.MouseEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

function SearchBox({ onSearch, onClick, placeholder }: SearchBoxProps) {
  return (
    <input 
      onChange={(e) => onSearch(e.currentTarget.value)}
      onClick={onClick}
      placeholder={placeholder}
    />
  );
}
```

---

## Part 2: Setup — React Project Configuration

### Recommended React + TypeScript Structure

```
frontend-app/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Button.tsx      # .tsx for React components
│   │   ├── Card.tsx
│   │   ├── UserCard.tsx
│   │   └── Form.tsx
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useFetch.ts
│   │   └── useForm.ts
│   ├── types/              # Shared types
│   │   ├── user.ts
│   │   ├── api.ts
│   │   └── app.ts
│   ├── pages/              # Page components
│   │   ├── Home.tsx
│   │   ├── Profile.tsx
│   │   └── NotFound.tsx
│   ├── services/           # API communication
│   │   ├── api-client.ts
│   │   └── user-service.ts
│   ├── App.tsx
│   └── main.tsx
├── tsconfig.json
├── vite.config.ts          # If using Vite
└── package.json
```

### React + TypeScript tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": "./src",
    "paths": {
      "@components/*": ["components/*"],
      "@hooks/*": ["hooks/*"],
      "@types/*": ["types/*"],
      "@services/*": ["services/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

---

## Part 3: Compilation — React Component Type Checking

### Type-Safe Hooks

```typescript
// Custom hook with proper typing
interface UseFormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
}

interface UseFormActions<T> {
  setValues: (values: T) => void;
  setFieldValue: <K extends keyof T>(field: K, value: T[K]) => void;
  setFieldError: (field: keyof T, error: string) => void;
  handleSubmit: (onSubmit: (values: T) => Promise<void>) => (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
}

function useForm<T>(initialValues: T): UseFormState<T> & UseFormActions<T> {
  const [values, setValues] = React.useState<T>(initialValues);
  const [errors, setErrors] = React.useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = React.useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    setValues,
    setFieldValue: (field, value) =>
      setValues({ ...values, [field]: value }),
    setFieldError: (field, error) =>
      setErrors({ ...errors, [field]: error }),
    handleSubmit: (onSubmit) => async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } finally {
        setIsSubmitting(false);
      }
    },
    resetForm: () => {
      setValues(initialValues);
      setErrors({});
      setTouched({});
    }
  };
}
```

### Type-Safe API Calls in Components

```typescript
interface ApiResponse<T> {
  data: T;
  status: "success" | "error";
  message?: string;
}

async function fetchUser(id: string): Promise<ApiResponse<User>> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetchUser(userId)
      .then((response) => {
        if (response.status === "success") {
          setUser(response.data);
        } else {
          setError(response.message || "Failed to load user");
        }
      })
      .catch((err) => setError(String(err)))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;

  return <div>{user.name}</div>;
}
```

---

## Part 4: First Program — React Todo App

### Complete Typed Todo App

```typescript
// types/todo.ts
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  priority: "low" | "medium" | "high";
}

export interface TodoFilter {
  status: "all" | "active" | "completed";
  priority?: "low" | "medium" | "high";
}

// components/TodoItem.tsx
import React from "react";
import { Todo } from "@types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className={`todo ${todo.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span>{todo.title}</span>
      <span className={`priority ${todo.priority}`}>{todo.priority}</span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
}

// App.tsx
import React from "react";
import { Todo, TodoFilter } from "@types/todo";
import { TodoItem } from "@components/TodoItem";

function App() {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [filter, setFilter] = React.useState<TodoFilter>({ status: "all" });
  const [newTodo, setNewTodo] = React.useState("");

  const addTodo = (title: string, priority: "low" | "medium" | "high" = "medium") => {
    const todo: Todo = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: new Date(),
      priority,
    };
    setTodos([...todos, todo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter.status === "active") return !todo.completed;
    if (filter.status === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="app">
      <h1>My Todo List</h1>
      <input
        value={newTodo}
        onChange={(e) => setNewTodo(e.currentTarget.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter" && newTodo) {
            addTodo(newTodo);
            setNewTodo("");
          }
        }}
        placeholder="Add a new todo..."
      />
      <ul>
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
```

---

## Part 5: React Production Configuration

### Advanced React TypeScript Setup

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": "./src",
    "paths": {
      "@components/*": ["./components/*"],
      "@hooks/*": ["./hooks/*"],
      "@types/*": ["./types/*"],
      "@pages/*": ["./pages/*"],
      "@services/*": ["./services/*"]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

---

## Resources for Frontend Developers

- [React TypeScript Cheat Sheet](https://react-typescript-cheatsheet.netlify.app/)
- [TypeScript React Handbook](https://www.typescriptlang.org/docs/handbook/react.html)
- [Next.js with TypeScript](https://nextjs.org/docs/basic-features/typescript)
- [React Hook Form TypeScript](https://react-hook-form.com/)
- [Redux TypeScript Usage](https://redux.js.org/recipes/usage-with-typescript)


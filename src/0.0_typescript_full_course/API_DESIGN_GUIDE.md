# API Design and REST Best Practices

## RESTful Endpoint Design

```typescript
// Type-safe routing
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface Route<T = any> {
  method: HttpMethod;
  path: string;
  handler: (req: any) => Promise<T>;
}

const routes: Route[] = [
  {
    method: "GET",
    path: "/users/:id",
    handler: async (req) => getUserByIdResponse(req.params.id)
  },
  {
    method: "POST",
    path: "/users",
    handler: async (req) => createUserResponse(req.body)
  }
];
```

## Pagination

```typescript
interface PaginationParams {
  page: number;
  limit: number;
  sort?: string;
}

interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pages: number;
}

function paginate<T>(
  items: T[],
  { page, limit }: PaginationParams
): PaginatedResponse<T> {
  const start = (page - 1) * limit;
  return {
    items: items.slice(start, start + limit),
    total: items.length,
    page,
    pages: Math.ceil(items.length / limit)
  };
}
```

## Checklist

- [ ] Design RESTful APIs
- [ ] Implement pagination
- [ ] Handle versioning
- [ ] Use proper HTTP status codes

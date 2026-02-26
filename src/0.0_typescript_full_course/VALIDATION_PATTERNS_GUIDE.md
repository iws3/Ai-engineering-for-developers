# Validation and Schema Runtime Checking

## Custom Validators

```typescript
type Validator<T> = (value: T) => boolean | string;

const email: Validator<string> = (val) => 
  /^.+@.+\..+$/.test(val) || "Invalid email";

const positive: Validator<number> = (val) =>
  val > 0 || "Must be positive";

function validate<T>(value: T, validators: Validator<T>[]): string[] {
  return validators
    .map(v => v(value))
    .filter(r => typeof r === "string") as string[];
}

const errors = validate("test", [email]);
// ["Invalid email"]
```

## Checklist

- [ ] Build custom validators
- [ ] Use schema libraries
- [ ] Validate at boundaries
- [ ] Type safe validation

# GitHub Copilot Instructions for TaskRatchet SDK

## Project Overview

This is the **TaskRatchet SDK**, a TypeScript/JavaScript library that provides a convenient interface for interacting with the TaskRatchet API. TaskRatchet is a task management service that helps users commit to completing tasks by putting money on the line.

### Key Features

- User authentication and session management
- Task creation, editing, and management
- User profile management
- Payment/checkout session handling
- Integration with external services (e.g., Beeminder)

## Project Structure

```
src/
├── main.ts              # Main entry point - exports all public APIs
├── *.ts                 # Individual function modules (one function per file)
├── *.spec.ts           # Test files co-located with source
├── fetch1.ts           # Legacy API client
├── fetch2.ts           # Modern API client
├── sessions.ts         # Session management utilities
├── constants.ts        # API constants and configuration
└── global.d.ts         # Global type definitions
```

## Coding Conventions

### File Organization

- **One function per file**: Each API function should be in its own TypeScript file
- **Co-located tests**: Test files should be named `*.spec.ts` and placed alongside source files
- **Export everything**: All public functions must be re-exported in `main.ts`

### TypeScript Patterns

- Use **strict TypeScript** with all strict options enabled
- Define **interfaces for API responses** at the top of each file
- Use **async/await** instead of Promise chains
- Prefer **type** over **interface** for simple data structures
- Use **interface** for complex objects that might be extended

### API Function Patterns

```typescript
// Standard pattern for API functions
import fetch2 from "./fetch2"; // or fetch1 for legacy endpoints

interface ResponseType {
  // Define the expected API response structure
}

export async function functionName(params: ParamType): Promise<ResponseType> {
  const response = await fetch2("endpoint", requiresAuth, "METHOD", payload);

  if (!response.ok) {
    throw new Error("Descriptive error message");
  }

  return response.json();
}
```

### Error Handling

- Always check `response.ok` before processing API responses
- Throw descriptive error messages for failed requests
- Use `throw new Error(await response.text())` to include server error details when available

### Authentication

- Functions that require authentication should use `fetch2("endpoint", true, ...)`
- Functions that don't require authentication should use `fetch2("endpoint", false, ...)`
- Add comment `// Requires that user be authenticated.` for functions that need auth

## Testing Conventions

### Test Structure

- Use **Vitest** as the testing framework
- Mock external dependencies using `vi.mock()`
- Use `describe` and `it` blocks for test organization
- Use `beforeEach` for test setup

### Test Patterns

```typescript
import { functionName } from "./functionName";
import fetch2 from "./fetch2";
import { describe, it, expect, beforeEach, vi } from "vitest";

vi.mock("./fetch2");

describe("functionName", () => {
  beforeEach(() => {
    vi.mocked(fetch2).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    } as Response);
  });

  it("should handle successful response", async () => {
    // Test implementation
  });
});
```

## API Clients

### fetch2 (Preferred)

- Use for new API endpoints
- Modern implementation with better type safety
- Supports pagination handling
- Send API tokens using `ApiKey-v2` header

### fetch1 (Legacy)

- Use only for existing legacy endpoints
- Gradually migrate to fetch2 when possible
- Uses older authentication patterns

## Development Workflow

### Package Manager

- **Use pnpm only** - This project uses pnpm as the package manager, not npm
- Never use `npm install` or other npm commands
- Always use `pnpm install`, `pnpm add`, `pnpm remove`, etc.

### Building

```bash
pnpm run build    # Build the library for production
pnpm run dev      # Development mode with watch
```

### Testing

```bash
pnpm test         # Run all tests
pnpm run test     # Same as above
```

### Code Quality

- TypeScript strict mode is enabled
- No unused locals or parameters allowed
- All switch cases must be handled

## Common Patterns

### Task Management

- Tasks have consistent interface with `id`, `task`, `due`, `cents`, `complete`, `status`
- Status can be: `"pending" | "complete" | "expired"`
- Charge status: `"notified" | "authorized" | "captured"`

### User Management

- Profile updates should handle nested integration objects (e.g., Beeminder)
- Password updates require both old and new password
- Email/username changes may require re-authentication

### Integration Handling

- External service integrations (like Beeminder) should be stored in nested objects
- Transform flat input parameters to nested structure for API calls
- Example: `beeminder_token` → `integrations.beeminder.token`

## Environment Variables

The project uses Vite-style environment variables:

- `VITE_API1_URL` for legacy API base URL
- `VITE_API2_URL` for modern API base URL

## Best Practices

1. **Minimal Surface Area**: Keep each function focused on a single API operation
2. **Consistent Naming**: Use clear, descriptive function names that match API semantics
3. **Type Safety**: Always define return types and parameter types
4. **Error Handling**: Provide meaningful error messages for common failure cases
5. **Documentation**: Add JSDoc comments for complex functions or parameters
6. **Testing**: Write tests that verify both success and error cases
7. **Backwards Compatibility**: Be careful when modifying existing public APIs

## Migration Guidelines

When updating existing code:

- Prefer `fetch2` over `fetch1` for new functionality
- Add proper TypeScript types to untyped code
- Update localStorage usage to work in both browser and Node.js environments
- Add pagination support where applicable
- Ensure API tokens use the `ApiKey-v2` header format

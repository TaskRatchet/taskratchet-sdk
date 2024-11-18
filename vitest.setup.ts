import { vi, beforeAll, afterEach, afterAll } from "vitest";
import { setupServer } from 'msw/node';

export const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

vi.mock("firebase/app");
vi.mock("firebase/auth");

import "@testing-library/jest-dom";
import { vi } from "vitest";

// MOCK ResizeObserver
const ResizeObserverMock = vi.fn(() => ({
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn(),
}));

// STUB the global ResizeObserver
vi.stubGlobal("ResizeObserver", ResizeObserverMock);

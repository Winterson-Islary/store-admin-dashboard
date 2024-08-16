import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import LoginPage from "./login";

describe("Login Page", () => {
	it("should render with required fields", () => {
		render(<LoginPage />);
		// GetBy* -> Throws Error
		// QueryBy* -> Similar to GetBy*, but does not throw error
		// FindBY* -> For Async
		expect(screen.getByText(/Sign In/)).toBeInTheDocument();
	});
});

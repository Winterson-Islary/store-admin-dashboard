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
		expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
		expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "Log in" }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("checkbox", { name: "Remember me" }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("link", { name: "Forgot password" }),
		).toBeInTheDocument();
	});
});

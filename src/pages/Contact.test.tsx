import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "@/test/test-utils";
import Contact from "./Contact";

describe("Contact form", () => {
  it("shows validation errors when submitting an empty form", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Contact />);

    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(/tell us your name/i)).toBeInTheDocument();
    expect(screen.getByText(/valid email/i)).toBeInTheDocument();
    expect(screen.getByText(/more detail/i)).toBeInTheDocument();
  });

  it("rejects a malformed email address", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Contact />);

    await user.type(screen.getByLabelText(/name/i), "Ada Lovelace");
    await user.type(screen.getByLabelText(/email/i), "not-an-email");
    await user.type(
      screen.getByLabelText(/message/i),
      "This is a sufficiently long message."
    );
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(/valid email/i)).toBeInTheDocument();
    expect(screen.queryByText(/tell us your name/i)).not.toBeInTheDocument();
  });

  it("clears the form after a valid submission", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Contact />);

    const name = screen.getByLabelText(/name/i) as HTMLInputElement;
    const email = screen.getByLabelText(/email/i) as HTMLInputElement;
    const message = screen.getByLabelText(/message/i) as HTMLTextAreaElement;

    await user.type(name, "Ada Lovelace");
    await user.type(email, "ada@example.com");
    await user.type(message, "I would like a volume licensing quote please.");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    // No validation errors on a valid form.
    expect(screen.queryByText(/valid email/i)).not.toBeInTheDocument();

    // The simulated send resolves after ~700ms and resets the fields.
    await waitFor(() => expect(name.value).toBe(""), { timeout: 3000 });
    expect(email.value).toBe("");
    expect(message.value).toBe("");
  });
});

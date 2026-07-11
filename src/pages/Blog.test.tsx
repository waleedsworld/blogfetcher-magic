import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "@/test/test-utils";
import Blog from "./Blog";

describe("Blog listing + search", () => {
  it("renders the list of recent posts", async () => {
    renderWithProviders(<Blog />);

    expect(
      await screen.findByText(/Windows 11 Enterprise Licensing Guide 2025/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Azure vs AWS/i)
    ).toBeInTheDocument();
  });

  it("filters posts by title as the user types", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Blog />);

    await screen.findByText(/Windows 11 Enterprise Licensing Guide 2025/i);

    await user.type(screen.getByLabelText(/search articles/i), "azure");

    await waitFor(() =>
      expect(
        screen.queryByText(/Windows 11 Enterprise Licensing Guide 2025/i)
      ).not.toBeInTheDocument()
    );
    expect(screen.getByText(/Azure vs AWS/i)).toBeInTheDocument();
  });

  it("shows an empty state when nothing matches", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Blog />);

    await screen.findByText(/Windows 11 Enterprise Licensing Guide 2025/i);
    await user.type(
      screen.getByLabelText(/search articles/i),
      "zzz-no-such-topic"
    );

    expect(await screen.findByText(/No matching articles/i)).toBeInTheDocument();
  });

  it("links each post card to its slug route", async () => {
    renderWithProviders(<Blog />);

    const link = await screen.findByRole("link", {
      name: /Azure vs AWS/i,
    });
    expect(link).toHaveAttribute("href", "/azure-vs-aws-for-business");
  });
});

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MarkdownRenderer from "./MarkdownRenderer";

describe("MarkdownRenderer", () => {
  it("renders headings and paragraphs from markdown", () => {
    render(<MarkdownRenderer markdown={"# Title\n\nHello **world**."} />);

    const heading = screen.getByRole("heading", { name: "Title" });
    expect(heading).toBeInTheDocument();
    expect(screen.getByText("world")).toBeInTheDocument();
  });

  it("renders links as anchors", () => {
    render(<MarkdownRenderer markdown={"[Docs](https://example.com)"} />);
    const link = screen.getByRole("link", { name: "Docs" });
    expect(link).toHaveAttribute("href", "https://example.com");
  });

  it("sanitizes dangerous markup (strips script tags)", () => {
    const { container } = render(
      <MarkdownRenderer markdown={"Safe text<script>window.__pwned = true;</script>"} />
    );
    expect(container.querySelector("script")).toBeNull();
    // @ts-expect-error - probe for injection side effect
    expect(window.__pwned).toBeUndefined();
    expect(container.textContent).toContain("Safe text");
  });

  it("applies the prose base class and any extra className", () => {
    const { container } = render(
      <MarkdownRenderer markdown={"text"} className="custom-class" />
    );
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain("prose");
    expect(root.className).toContain("custom-class");
  });
});

import { test, expect } from "@playwright/test";

test.describe("Digital Software Planet — smoke", () => {
  test("home page loads and shows the brand", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Digital Software Planet/i);
    await expect(
      page.getByRole("link", { name: /Digital Software Planet/i }).first()
    ).toBeVisible();
  });

  test("navigating to the blog lists recent posts", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Blog", exact: true }).first().click();
    await expect(page).toHaveURL(/\/blog$/);
    await expect(
      page.getByText(/Windows 11 Enterprise Licensing Guide 2025/i)
    ).toBeVisible();
  });

  test("blog search filters the visible posts", async ({ page }) => {
    await page.goto("/blog");
    const search = page.getByLabel(/search articles/i);
    await search.fill("azure");
    await expect(page.getByText(/Azure vs AWS/i)).toBeVisible();
    await expect(
      page.getByText(/Windows 11 Enterprise Licensing Guide 2025/i)
    ).toHaveCount(0);
  });

  test("contact form validates required fields", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: /send message/i }).click();
    await expect(page.getByText(/tell us your name/i)).toBeVisible();
    await expect(page.getByText(/valid email/i)).toBeVisible();
  });

  test("unknown static route renders the 404 page", async ({ page }) => {
    // Slugs starting with 404 map to NotFound via the catch-all after a
    // failed content fetch; use an explicit unknown nested path instead.
    await page.goto("/this/does/not/exist");
    await expect(page.getByText(/404/)).toBeVisible();
  });

  test("a blog post renders content from the API (mocked)", async ({ page }) => {
    await page.route("**/content/**", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          content: "# Mocked Article\n\nThis body came from a mocked API.",
          meta_tags: {
            title: "Mocked Article Title",
            description: "A mocked description",
          },
          mode: "published",
          slug: "mocked-article",
          timestamp: "2025-03-21_07-01-15",
          url: "https://example.com/mocked-article",
        }),
      })
    );

    await page.goto("/mocked-article");
    await expect(
      page.getByRole("heading", { name: "Mocked Article Title" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Mocked Article", exact: true })
    ).toBeVisible();
    await expect(
      page.getByText(/came from a mocked API/i)
    ).toBeVisible();
  });
});

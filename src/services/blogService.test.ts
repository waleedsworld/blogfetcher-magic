import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fetchBlogPost, fetchRecentBlogPosts, type BlogPost } from "./blogService";

const samplePost: BlogPost = {
  content: "# Hello\n\nSome body text.",
  meta_tags: { title: "Hello", description: "A sample post" },
  mode: "published",
  slug: "hello-world",
  timestamp: "2025-03-21_07-01-15",
  url: "https://example.com/hello-world",
};

describe("fetchBlogPost", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("requests the content endpoint for the given slug", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => samplePost,
    });
    vi.stubGlobal("fetch", fetchMock);

    const post = await fetchBlogPost("hello-world");

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://productdsp.techrealm.online/content/hello-world"
    );
    expect(post).toEqual(samplePost);
  });

  it("throws when the response is not ok", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      json: async () => ({}),
    });
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "error").mockImplementation(() => {});

    await expect(fetchBlogPost("missing")).rejects.toThrow(
      "Failed to fetch blog post: 404"
    );
  });

  it("propagates network errors", async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error("network down"));
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "error").mockImplementation(() => {});

    await expect(fetchBlogPost("any")).rejects.toThrow("network down");
  });
});

describe("fetchRecentBlogPosts", () => {
  it("returns a non-empty list of well-formed posts", async () => {
    const posts = await fetchRecentBlogPosts();

    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);
    for (const post of posts) {
      expect(post.slug).toBeTruthy();
      expect(post.title).toBeTruthy();
      expect(post.description).toBeTruthy();
    }
  });

  it("has unique slugs", async () => {
    const posts = await fetchRecentBlogPosts();
    const slugs = posts.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

// Unmount React trees and clear the DOM between tests.
afterEach(() => {
  cleanup();
});

// jsdom does not implement matchMedia; several components (theme toggle,
// use-mobile, next-themes) rely on it. Provide a no-op stub.
if (!window.matchMedia) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }),
  });
}

// jsdom lacks IntersectionObserver / ResizeObserver used by animation libs.
class MockObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
// @ts-expect-error - test shim
window.IntersectionObserver ||= MockObserver;
// @ts-expect-error - test shim
window.ResizeObserver ||= MockObserver;

// jsdom does not implement scrollTo (ScrollToTop component calls it).
window.scrollTo = window.scrollTo || (() => {});

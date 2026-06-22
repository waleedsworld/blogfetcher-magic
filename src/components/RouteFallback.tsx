/**
 * Accessible loading placeholder shown while a lazily-loaded route chunk is
 * still downloading. Announces itself to assistive tech via role="status" and
 * keeps the spinner purely decorative (aria-hidden) so screen readers hear the
 * "Loading…" label once rather than a meaningless graphic.
 */
const RouteFallback = () => (
  <div
    role="status"
    aria-live="polite"
    className="flex min-h-[60vh] items-center justify-center"
  >
    <div
      aria-hidden="true"
      className="h-8 w-8 rounded-full border-4 border-primary/30 border-t-primary motion-safe:animate-spin"
    />
    <span className="sr-only">Loading…</span>
  </div>
);

export default RouteFallback;

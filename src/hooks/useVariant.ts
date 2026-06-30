import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export type Variant = 'a' | 'b';

/**
 * Reads the active landing-page variant from the URL query string.
 *
 * Usage: append `?variant=b` to any URL to opt into the experimental
 * hero/landing treatment. Anything other than `b` (including a missing
 * param) resolves to the default `a` experience, so existing links are
 * unaffected.
 *
 * This is intentionally URL-driven (no cookies / no persistence) so the
 * variant can be shared, bookmarked, and A/B-tested via query params.
 */
export function useVariant(): Variant {
  const { search } = useLocation();

  return useMemo(() => {
    const value = new URLSearchParams(search).get('variant')?.toLowerCase();
    return value === 'b' ? 'b' : 'a';
  }, [search]);
}

export default useVariant;

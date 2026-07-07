import { useEffect } from "react";

/**
 * Lightweight, dependency-free per-route SEO head manager.
 *
 * Keeps <title>, meta description, canonical URL and the core Open Graph /
 * Twitter tags in sync with the currently rendered route. This matters for a
 * client-rendered SPA: without it every route would inherit the single set of
 * tags baked into index.html, so search engines and social unfurlers would see
 * the same canonical + title for `/`, `/about`, `/contact`, etc.
 *
 * No external dependency (no react-helmet) — just surgical DOM updates.
 */

const SITE_URL = "https://products.digitalsoftwareplanet.com";
const SITE_NAME = "Digital Software Planet";
const DEFAULT_IMAGE = `${SITE_URL}/og-cover.svg`;

export interface SeoProps {
  title: string;
  description: string;
  /** Route path, e.g. "/about". Defaults to the current pathname. */
  path?: string;
  /** "website" | "article" — defaults to "website". */
  type?: string;
  image?: string;
  /** When true, tell crawlers not to index this route (e.g. 404). */
  noindex?: boolean;
}

function setMeta(attr: "name" | "property", key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

const Seo = ({ title, description, path, type = "website", image = DEFAULT_IMAGE, noindex = false }: SeoProps) => {
  useEffect(() => {
    const pathname = path ?? window.location.pathname;
    const url = `${SITE_URL}${pathname === "/" ? "/" : pathname}`;
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

    document.title = fullTitle;
    setMeta("name", "description", description);
    setMeta("name", "robots", noindex ? "noindex, follow" : "index, follow, max-image-preview:large");
    setLink("canonical", url);

    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", type);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", image);

    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", image);
  }, [title, description, path, type, image, noindex]);

  return null;
};

export default Seo;

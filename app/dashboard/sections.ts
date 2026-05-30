import React from "react"
import {
  CircleArrowRight,
  ChartBarIcon,
  Info,
  Images,
  Video,
  Code,
} from "lucide-react"

export type DocsSection = {
  title: string
  slug: string
  icon: React.JSX.Element
  markdownUrl: string
  source: string
  sourceLink: string
}

export const docsSections: DocsSection[] = [
  {
    title: "Introducción a Lighthouse",
    slug: "lighthouse-introduction",
    icon: React.createElement(CircleArrowRight, null),
    markdownUrl: "/docs/lighthouse-introduction.md",
    source: "Google Developers",
    sourceLink:
      "https://developer-chrome-com.translate.goog/docs/lighthouse/overview?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=tc",
  },
  {
    title: "¿Por qué el rendimiento es importante?",
    slug: "why-performance-matters",
    icon: React.createElement(ChartBarIcon, null),
    markdownUrl: "/docs/why-performance-matters.md",
    source: "Mdn Web Docs",
    sourceLink: "https://developer.mozilla.org/en-US/docs/Web/Performance",
  },
  {
    title: "Rendimiento percibido",
    slug: "perceived-performance",
    icon: React.createElement(Info, null),
    markdownUrl: "/docs/perceived-performance.md",
    source: "Mdn Web Docs",
    sourceLink:
      "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Performance/Perceived_performance",
  },
  {
    title: "Multimedia: Imágenes",
    slug: "multimedia-images",
    markdownUrl: "/docs/multimedia-images.md",
    source: "Mdn Web Docs",
    sourceLink:
      "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Performance/Multimedia",
    icon: React.createElement(Images, null),
  },
  {
    title: "Multimedia: video",
    slug: "multimedia-video",
    markdownUrl: "/docs/multimedia-video.md",
    source: "Mdn Web Docs",
    sourceLink:
      "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Performance/video",
    icon: React.createElement(Video, null),
  },
  {
    title: "Optimización del rendimiento en JavaScript",
    slug: "performant-javascript",
    markdownUrl: "/docs/performant-javascript.md",
    source: "Mdn Web Docs",
    sourceLink:
      "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Performance/JavaScript",
    icon: React.createElement(Code, null),
  },
  {
    title: "Optimización del rendimiento en HTML",
    slug: "performant-html",
    markdownUrl: "/docs/performant-html.md",
    source: "Mdn Web Docs",
    sourceLink:
      "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Performance/HTML",
    icon: React.createElement(Code, null),
  },
  {
    title: "Optimización del rendimiento en CSS",
    slug: "performant-css",
    markdownUrl: "/docs/performant-css.md",
    source: "Mdn Web Docs",
    sourceLink:
      "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Performance/CSS",
    icon: React.createElement(Code, null),
  },
] as const

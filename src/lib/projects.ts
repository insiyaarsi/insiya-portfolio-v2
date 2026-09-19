import mediscribeThumb from "@/assets/mediscribe.png";
import doodleliftThumb from "@/assets/doodlelift.png";
import thriftexThumb from "@/assets/thriftex.png";
import spotifyDisplayThumb from "@/assets/spotify-album-art-thumbnail.png";

export type Project = {
  slug: "mediscribe" | "doodlelift" | "thriftex" | "spotify-display";
  name: string;
  tagline: string;
  role: string;
  timeline: string;
  status: "shipping" | "in progress" | "shipped" | "simulator";
  category: "software" | "hardware";
  ai: boolean;
  stack: string[];
  /** Physical parts — hardware projects only. */
  hardware?: string[];
  /** Fit the thumbnail inside the frame instead of cropping it to fill. */
  containThumbnail?: boolean;
  repo?: string;
  accent: string; // tailwind class or hex
  thumbnail: string;
  summary: string;
  problem: string;
  built: string[];
  highlights: { label: string; body: string }[];
};

export const projects: Project[] = [
  {
    slug: "mediscribe",
    category: "software",
    name: "MediScribe AI",
    tagline: "Clinical audio → structured SOAP notes, offline-capable.",
    role: "Solo · self-directed",
    timeline: "Nov 2025 — present",
    status: "in progress",
    ai: true,
    stack: ["Python", "FastAPI", "OpenAI Whisper", "scispaCy", "Medical NLP"],
    repo: "https://github.com/insiyaarsi/mediscribe-ai",
    accent: "#ff5b2e",
    thumbnail: mediscribeThumb,
    summary:
      "An offline-capable AI system that converts clinical audio into structured SOAP-format medical documentation with sub-5-second transcription latency.",
    problem:
      "Doctors spend hours writing notes after every visit. Cloud transcription tools raise privacy flags and cost per minute. I wanted something a clinician could run on a laptop without sending audio anywhere.",
    built: [
      "FastAPI backend with an async audio-processing pipeline.",
      "Whisper integration achieving sub-5-second latency on short clips.",
      "Medical entity extraction with scispaCy + a custom dictionary-merging algorithm covering 520+ clinical terms.",
      "Format-agnostic input (MP3 / WAV / M4A) with automatic detection.",
      "Zero-API-cost architecture using only open-source models.",
    ],
    highlights: [
      {
        label: "Next up",
        body: "React frontend, ICD-10 code suggestion module, and real-time entity-highlighted transcription display.",
      },
    ],
  },
  {
    slug: "doodlelift",
    category: "software",
    name: "DoodleLift",
    tagline: "AI-coached strength training with a hand-drawn aesthetic that fights gym anxiety.",
    role: "Solo · in production",
    timeline: "2025 — present",
    status: "in progress",
    ai: true,
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Framer Motion",
      "Rough.js",
      "FastAPI",
      "GPT-4o + LangChain",
      "Supabase",
      "Pandas",
    ],
    accent: "#8a5cf6",
    thumbnail: doodleliftThumb,
    summary:
      "A fitness app that blends a doodle aesthetic with an AI coach persona — a mini-motivator that uses predictive analytics to push users past self-imposed limits.",
    problem:
      "Most trackers only log data. Beginners don't need more data — they need someone in their ear telling them they're ready for the next plate. I wanted the app to feel like a friend sketching in a notebook, not a spreadsheet.",
    built: [
      "Predictive weight recommender using RPE, volume, and frequency signals.",
      "Persona-driven LLM coach (RAG) that delivers empathetic cues, not stats.",
      "Semantic YouTube Shorts fetch + cache for form checks per exercise.",
      "Automated plate-math visualizer — doodle of the exact bar setup.",
      "Microservices-inspired monolith with a dedicated AI orchestrator.",
    ],
    highlights: [
      {
        label: "Vibe",
        body: "Rough.js on canvas gives every UI edge a slightly wobbly hand-drawn feel — no rectangles, no intimidation.",
      },
    ],
  },
  {
    slug: "thriftex",
    category: "software",
    name: "ThriftEx",
    tagline: "Peer-to-peer clothing resale with real-time price negotiation.",
    role: "Co-developer · owned buyer side",
    timeline: "2024",
    status: "shipped",
    ai: false,
    stack: ["Node.js", "Express", "MySQL", "JWT", "Bootstrap", "Vanilla JS"],
    repo: "https://github.com/insiyaarsi/thriftex",
    accent: "#3ab55c",
    thumbnail: thriftexThumb,
    summary:
      "A full-stack peer-to-peer clothing resale platform with real-time price negotiation and integrated buyer-seller messaging.",
    problem:
      "Thrift apps optimize for browse-and-buy. We wanted the haggling — the moment two people meet in the middle on a price — to feel first-class.",
    built: [
      "REST APIs, JWT auth, and MySQL schema for the buyer side.",
      "Product listings with search + filter and negotiation threads.",
      "Real-time price offers between buyers and sellers.",
      "Validated via UAT with 60+ participants — 95% transaction completion rate.",
    ],
    highlights: [],
  },
  {
    slug: "spotify-display",
    category: "hardware",
    name: "Spotify Album Display",
    tagline: "An ESP32 that watches what you're playing and paints the album art on a tiny LCD.",
    role: "Solo · self-directed",
    timeline: "Aug 2026 — present",
    status: "simulator",
    ai: false,
    stack: [
      "C++",
      "Arduino",
      "Spotify Web API",
      "OAuth 2.0",
      "HTTPS",
      "ArduinoJson",
      "TFT_eSPI",
      "TJpg_Decoder",
    ],
    hardware: [
      "ESP32",
      "ILI9341 240×320 TFT",
      "Wokwi simulator",
      "CYD / ESP32-2432S028R (on order)",
    ],
    repo: "https://github.com/insiyaarsi/spotify-album-art-display",
    accent: "#1db954",
    thumbnail: spotifyDisplayThumb,
    containThumbnail: true,
    summary:
      "Firmware that polls whatever is playing on my Spotify account and renders the album art, track, and artist on a 240×320 LCD — fully proven in simulation before a single part was bought.",
    problem:
      "I wanted a small object on my desk that just shows what's playing — no phone, no screen to unlock. The catch is that an ESP32 has a few hundred KB of RAM and no OS, so every comfort a normal app leans on (an HTTP client, a JSON parser, a JPEG decoder, a TLS stack) has to be budgeted for by hand. I built the whole thing in Wokwi first so the logic was settled before hardware money was on the line.",
    built: [
      "OAuth 2.0 refresh-token flow over HTTPS, renewing the access token 5 minutes before it expires.",
      "Polls the currently-playing endpoint every 5 seconds and diffs the track ID — art is only re-downloaded when the song actually changes.",
      "Streams the album-art JPEG (preferring 300×300, falling back to 64×64), decodes it within a 96 KB buffer, and scales it into a 240×240 area.",
      "Layout engine for a 40 px track bar, the art, and a 40 px artist bar — long names truncate instead of overflowing.",
      "Retries failed HTTPS requests up to 3 times with increasing backoff, and falls back to an idle screen when playback stops.",
      "Reproducible build: Arduino CLI scripts for Windows and macOS/Linux, plus a devcontainer that keeps the toolchain off the host machine.",
    ],
    highlights: [
      {
        label: "Why simulation first",
        body: "Wokwi let me settle the wiring, the pin map, and the whole auth-and-decode pipeline before buying anything. The Spotify logic carries over to real hardware unchanged — what changes is the pin map and the Wi-Fi credentials.",
      },
      {
        label: "Next up",
        body: "Currently sourcing the parts — a CYD (ESP32-2432S028R) and the bits to drive it. Once they arrive: wire the board up physically off the Wokwi diagram, install the CH340 driver and find the COM port, remap the pins in tft_setup.h, then flash a display test to confirm the panel before the real firmware goes on. Also rotating the simulator credentials — Wokwi's public gateway can inspect outbound traffic, so those keys were always meant to be burnable.",
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function projectsByCategory(category: Project["category"]): Project[] {
  return projects.filter((p) => p.category === category);
}

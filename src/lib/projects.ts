import mediscribeThumb from "@/assets/mediscribe.png";
import doodleliftThumb from "@/assets/doodlelift.png";
import thriftexThumb from "@/assets/thriftex.png";

export type Project = {
  slug: "mediscribe" | "doodlelift" | "thriftex";
  name: string;
  tagline: string;
  role: string;
  timeline: string;
  status: "shipping" | "in progress" | "shipped";
  ai: boolean;
  stack: string[];
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
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

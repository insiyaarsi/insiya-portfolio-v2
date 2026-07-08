import { motion } from "motion/react";

type Row = {
  year: string;
  headline: string;
  detail: string;
  tag?: "now" | "shipped" | "study";
};

const rows: Row[] = [
  {
    year: "2026",
    headline: "Aonix — sole dev on the AI-LMS",
    detail:
      "Building end-to-end: Next.js 15 + React 19, Express + MongoDB, Socket.io realtime, Gemini-powered chatbot & rubric drafting. 86-feature roadmap, one engineer.",
    tag: "now",
  },
  {
    year: "2025",
    headline: "MediScribe + DoodleLift · BSc IT, 9.78 CGPA",
    detail:
      "Started teaching my code to think — clinical audio → SOAP notes, and an AI gym coach that sketches your plate math.",
    tag: "study",
  },
  {
    year: "2024",
    headline: "Techfrontiers paper · ThriftEx · led Systematic Chaos",
    detail:
      "Presented research on AI personalization ethics (70+ user survey). Shipped ThriftEx with 95% txn completion. Ran a 200-attendee tech fest with a 30-person team.",
    tag: "shipped",
  },
  {
    year: "2023",
    headline: "Quark Management · AWS Cloud cert",
    detail:
      "First taste of shipping to production — 200+ WordPress listings, 40% fewer publishing errors after rebuilding the QA workflow.",
  },
];

export function JourneyTimeline() {
  return (
    <section id="journey" className="mx-auto max-w-4xl px-6 py-20 md:py-24 scroll-mt-24">
      <div className="mb-10">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          /journey
        </span>
        <h2 className="mt-2 font-serif text-4xl md:text-5xl">the receipts, in order.</h2>
      </div>

      <ol className="relative">
        <div
          aria-hidden
          className="absolute left-[4.5rem] top-2 bottom-2 w-px bg-border md:left-24"
        />
        {rows.map((r, i) => (
          <motion.li
            key={r.year + r.headline}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
            className="relative grid grid-cols-[4.5rem_1fr] gap-4 pb-10 last:pb-0 md:grid-cols-[6rem_1fr] md:gap-6"
          >
            <div className="pt-1 text-right font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {r.year}
            </div>
            <div className="relative pl-6 md:pl-8">
              <span
                aria-hidden
                className={
                  "absolute left-[-5px] top-2 h-2.5 w-2.5 rounded-full border md:left-[-5px] " +
                  (r.tag === "now" ? "border-brand bg-brand" : "border-foreground/40 bg-background")
                }
              />
              <div className="flex flex-wrap items-baseline gap-2">
                <h3 className="font-serif text-xl md:text-2xl">{r.headline}</h3>
                {r.tag === "now" && (
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand">
                    · now
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                {r.detail}
              </p>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}

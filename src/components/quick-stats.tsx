import { motion } from "motion/react";

const stats = [
  { k: "9.78", v: "BSc IT · CGPA" },
  { k: "AWS", v: "Cloud Certified" },
  { k: "GA", v: "Google Analytics" },
  { k: "200+", v: "led at tech fest" },
  { k: "70+", v: "research survey" },
  { k: "1", v: "engineer on AI-LMS" },
];

export function QuickStats() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <motion.ul
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="flex flex-wrap items-stretch justify-center gap-x-2 gap-y-3 border-y border-dashed border-border py-5"
      >
        {stats.map((s, i) => (
          <li
            key={s.k + s.v}
            className="flex items-baseline gap-2 px-3"
          >
            <span className="font-serif text-2xl text-foreground md:text-3xl">
              {s.k}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {s.v}
            </span>
            {i < stats.length - 1 && (
              <span aria-hidden className="ml-2 text-muted-foreground/40">
                ·
              </span>
            )}
          </li>
        ))}
      </motion.ul>
    </section>
  );
}

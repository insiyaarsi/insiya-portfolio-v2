import { motion } from "motion/react";
import { BookOpen, FileText } from "lucide-react";

const items = [
  {
    icon: FileText,
    venue: "Techfrontiers · IT/CS Academic Conference",
    year: "2024",
    title: "AI Personalization in E-Learning",
    blurb:
      "Original research on algorithmic bias, data privacy, and student autonomy in adaptive learning. Surveyed 70+ participants; fielded faculty review on privacy frameworks and filter bubbles.",
  },
  {
    icon: BookOpen,
    venue: "Spark Forward · KC IT Department magazine",
    year: "2024",
    title: "Emerging AI/ML in the wild",
    blurb:
      "Authored the feature article on real-world AI/ML applications. Co-edited the annual publication distributed to 300+ students and faculty.",
  },
];

export function WritingStrip() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <div className="mb-8">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          /writing + research
        </span>
        <h2 className="mt-2 font-serif text-3xl md:text-4xl">
          when I'm not shipping, I'm writing about it.
        </h2>
      </div>

      <ul className="divide-y divide-border border-y border-border">
        {items.map((it, i) => {
          const Icon = it.icon;
          return (
            <motion.li
              key={it.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="grid gap-3 py-6 md:grid-cols-[auto_1fr_auto] md:items-start md:gap-6"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {it.venue}
                </div>
                <h3 className="mt-1 font-serif text-xl italic">{it.title}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {it.blurb}
                </p>
              </div>
              <div className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground md:pt-1">
                {it.year}
              </div>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}

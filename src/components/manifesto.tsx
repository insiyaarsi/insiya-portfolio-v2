import { motion } from "motion/react";

export function Manifesto() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          // manifesto
        </span>
        <p className="mt-5 font-serif text-3xl leading-[1.25] tracking-tight md:text-[2.6rem] md:leading-[1.2]">
          I build because I love that I can take something I imagined at{" "}
          <span className="italic text-brand">2 a.m.</span> and have it running
          by morning. Side projects are how I learn —{" "}
          <span className="italic">quirky, over-scoped, sometimes abandoned,</span>{" "}
          always mine.
        </p>
      </motion.div>
    </section>
  );
}

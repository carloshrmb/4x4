"use client";

import { motion } from "framer-motion";

interface CTAProps {
  onStart: () => void;
}

export default function CTADiagnostico({ onStart }: CTAProps) {
  return (
    <section className="relative py-24 px-6 md:px-12 overflow-hidden">
      {/* Red background with noise texture */}
      <div className="absolute inset-0 bg-[#C41E1E]" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-bebas text-[clamp(2.5rem,7vw,6rem)] leading-none tracking-wide text-white mb-6"
        >
          ¿ESTÁS LISTO PARA CONOCER TU NIVEL?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/90 text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Responde 16 preguntas y descubre si eres un Vehículo en Restauración,
          estás En Camino al Terreno, o ya eres un Profesional Todoterreno.
        </motion.p>

        {/* Profile pills */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {[
            { emoji: "🔴", label: "Vehículo en Restauración" },
            { emoji: "🟠", label: "En Camino al Terreno" },
            { emoji: "🟡", label: "Profesional Todoterreno" },
          ].map((p) => (
            <span
              key={p.label}
              className="bg-black/30 text-white text-sm px-4 py-2 rounded-full font-semibold"
            >
              {p.emoji} {p.label}
            </span>
          ))}
        </motion.div>

        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.04 }}
          onClick={onStart}
          className="bg-[#0A0A0A] hover:bg-[#1A1A1A] text-white font-bold text-xl px-10 py-5 tracking-wider transition-colors duration-200 mb-4"
        >
          COMENZAR DIAGNÓSTICO GRATUITO →
        </motion.button>

        <p className="text-white/70 text-sm">
          Sin registro · Sin tarjeta · 100% gratuito
        </p>
      </div>
    </section>
  );
}

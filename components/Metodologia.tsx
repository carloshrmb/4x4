"use client";

import { motion } from "framer-motion";

const cards = [
  {
    num: "01",
    title: "4 PILARES DEL MOTOR INTERNO",
    items: ["Conocimiento", "Habilidades", "Competencias", "Valores"],
    desc: "Los cuatro ejes que determinan la potencia de tu motor personal",
  },
  {
    num: "02",
    title: "4 DIMENSIONES DE TRACCIÓN",
    items: ["Físico", "Intelectual", "Espiritual", "Emocional"],
    desc: "Las ruedas que transmiten tu potencia al terreno real",
  },
  {
    num: "03",
    title: "16 INTERSECCIONES",
    items: [
      "Motor × Tracción",
      "Diagnóstico profundo",
      "Puntos ciegos",
      "Plan de calibración",
    ],
    desc: "El diagnóstico más completo de tu productividad",
  },
];

export default function Metodologia() {
  return (
    <section id="metodologia" className="bg-[#0A0A0A] py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-2">
          <div className="h-1 w-16 bg-[#C41E1E] mb-8" />
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#C41E1E]" />
            <span className="text-[#C41E1E] text-sm font-bold tracking-widest">
              EL SISTEMA
            </span>
          </div>
          <h2 className="font-bebas text-[clamp(2.5rem,6vw,5rem)] leading-none tracking-wide mb-8">
            <span className="text-white">EL SISTEMA QUE </span>
            <span className="text-[#D4A017]">TRANSFORMA</span>
            <span className="text-white"> PROFESIONALES</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -6 }}
              className="bg-[#1A1A1A] p-8 transition-all duration-300"
              style={{ borderTop: "3px solid #C41E1E" }}
            >
              <span className="font-bebas text-5xl text-[#C41E1E] block mb-3">
                {card.num}
              </span>
              <h3 className="font-bebas text-xl text-white tracking-wide mb-4">
                {card.title}
              </h3>
              <ul className="mb-4 space-y-1">
                {card.items.map((item) => (
                  <li
                    key={item}
                    className="text-[#D4A017] text-sm font-semibold flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#D4A017] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-white/60 text-sm leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

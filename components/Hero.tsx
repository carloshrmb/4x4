"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface HeroProps {
  onStartDiagnostico: () => void;
}

export default function Hero({ onStartDiagnostico }: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-[#8B0000] opacity-70" />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-4 md:px-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#D4A017]">
            <Image
              src="/carlos.jpg"
              alt="Carlos Hermosillo"
              width={40}
              height={40}
              className="object-cover w-full h-full"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
          <div className="hidden sm:block">
            <p className="text-white font-semibold text-sm leading-tight">
              Carlos Hermosillo
            </p>
            <p className="text-[#D4A017] text-xs">
              Entrenador Corporativo · Autor
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-[#C41E1E] px-3 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-white text-xs font-bold tracking-wider">
            METODOLOGÍA 4×4 TODOTERRENO
          </span>
        </div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-bebas text-[clamp(3.5rem,12vw,9rem)] leading-none tracking-wide mb-4"
        >
          <span className="text-white">EL </span>
          <span className="text-[#C41E1E]">4×4</span>
          <span className="text-white"> DE LA</span>
          <br />
          <span className="text-white">PRODUCTIVIDAD</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-bebas text-[#D4A017] text-[clamp(1.2rem,3vw,2rem)] tracking-widest mb-6"
        >
          Conviértete en un Profesional Todoterreno
        </motion.p>

        <motion.blockquote
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-xl mb-8"
        >
          <p className="italic text-white/80 text-sm md:text-base leading-relaxed">
            "No actúes como si fueras a vivir para siempre. Lo que te queda es
            breve."
          </p>
          <footer className="text-[#D4A017] text-xs mt-1 tracking-widest">
            — MARCO AURELIO
          </footer>
        </motion.blockquote>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-white/90 text-base md:text-lg mb-10 max-w-lg"
        >
          ¿En qué terrenos de tu vida sientes que te has quedado estancado?
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={onStartDiagnostico}
            className="bg-[#C41E1E] hover:bg-[#a01818] text-white font-bold text-lg px-8 py-4 transition-all duration-200 tracking-wider"
          >
            INICIAR MI DIAGNÓSTICO GRATUITO →
          </button>
          <a
            href="#metodologia"
            className="border-2 border-white text-white hover:bg-white hover:text-[#0A0A0A] font-bold text-lg px-8 py-4 transition-all duration-200 tracking-wider text-center"
          >
            CONOCER LA METODOLOGÍA ↓
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-8 text-white/60 text-sm tracking-widest"
        >
          4 PASOS · ~5 MIN
        </motion.p>
      </div>
    </section>
  );
}

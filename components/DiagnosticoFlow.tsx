"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { questions, scoreColor } from "@/lib/questions";
import Resultados from "./Resultados";

type Step = "registro" | "memento" | "ikigai" | "cimientos" | "matriz" | "resultados";

interface UserData {
  nombre: string;
  email: string;
}

interface IkigaiData {
  love: string;
  good: string;
  world: string;
  paid: string;
}

interface CimientosData {
  conocer: number;
  hacer: number;
  convivir: number;
  ser: number;
}

const fade = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
  transition: { duration: 0.45 },
};

function ProgressBar({ step }: { step: number }) {
  const steps = ["Registro", "Reflexión", "Ikigai", "Cimientos", "Diagnóstico"];
  return (
    <div className="flex items-center justify-center gap-2 mb-10">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              i < step ? "bg-[#D4A017]" : i === step ? "bg-[#C41E1E]" : "bg-white/20"
            }`}
          />
          {i < steps.length - 1 && (
            <div
              className={`h-px w-8 transition-colors duration-300 ${
                i < step - 1 ? "bg-[#D4A017]" : "bg-white/20"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// STEP 0: Registro
function StepRegistro({ onNext }: { onNext: (data: UserData) => void }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nombre.trim()) return setError("Por favor ingresa tu nombre.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return setError("Por favor ingresa un correo válido.");
    setError("");
    onNext({ nombre: nombre.trim(), email: email.trim() });
  }

  return (
    <motion.div {...fade} className="max-w-md w-full mx-auto">
      <h2 className="font-bebas text-5xl text-white tracking-wide mb-2 text-center">
        ANTES DE COMENZAR
      </h2>
      <p className="text-white/70 text-center mb-8">
        Ingresa tus datos para personalizar tu diagnóstico
      </p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold tracking-widest text-white/60 mb-2">
            NOMBRE COMPLETO
          </label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="w-full bg-transparent border-b-2 border-white/30 focus:border-[#C41E1E] outline-none text-white text-lg py-2 transition-colors duration-200"
            placeholder="Tu nombre..."
          />
        </div>
        <div>
          <label className="block text-xs font-bold tracking-widest text-white/60 mb-2">
            CORREO ELECTRÓNICO
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-transparent border-b-2 border-white/30 focus:border-[#C41E1E] outline-none text-white text-lg py-2 transition-colors duration-200"
            placeholder="correo@ejemplo.com"
          />
        </div>
        {error && <p className="text-[#C41E1E] text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-[#C41E1E] hover:bg-[#a01818] text-white font-bold text-lg py-4 tracking-wider transition-colors duration-200 mt-4"
        >
          COMENZAR MI DIAGNÓSTICO →
        </button>
        <p className="text-center text-white/40 text-xs">
          Tu información es privada y no será compartida
        </p>
      </form>
    </motion.div>
  );
}

// STEP 1: Memento Mori
function StepMemento({ nombre, onNext }: { nombre: string; onNext: () => void }) {
  return (
    <motion.div {...fade} className="max-w-2xl w-full mx-auto text-center">
      <p className="text-[#D4A017] text-sm tracking-widest mb-8 font-bold">
        BIENVENIDO, {nombre.toUpperCase()}
      </p>
      <blockquote className="mb-12">
        <p className="font-bebas text-[clamp(1.8rem,5vw,3.5rem)] text-white leading-tight mb-4">
          "No actúes como si fueras a vivir para siempre.<br />
          Lo que te queda es breve."
        </p>
        <footer className="text-[#D4A017] tracking-widest text-sm">— MARCO AURELIO</footer>
      </blockquote>
      <p className="text-white/80 text-lg leading-relaxed mb-12 max-w-xl mx-auto">
        Este diagnóstico no es solo un cuestionario. Es una invitación a mirarte
        con honestidad — a identificar qué terrenos de tu vida has abandonado y
        cuáles estás listo para conquistar.
      </p>
      <button
        onClick={onNext}
        className="bg-[#C41E1E] hover:bg-[#a01818] text-white font-bold text-xl px-12 py-5 tracking-wider transition-colors duration-200"
      >
        COMENZAR MI VIAJE →
      </button>
    </motion.div>
  );
}

// STEP 2: Ikigai
function StepIkigai({ onNext }: { onNext: (data: IkigaiData) => void }) {
  const [data, setData] = useState<IkigaiData>({
    love: "",
    good: "",
    world: "",
    paid: "",
  });

  const fields: { key: keyof IkigaiData; label: string; placeholder: string }[] = [
    { key: "love", label: "¿Qué amas hacer?", placeholder: "Aquello que te apasiona..." },
    { key: "good", label: "¿En qué eres bueno?", placeholder: "Tus fortalezas y talentos..." },
    { key: "world", label: "¿Qué necesita el mundo que tú puedas dar?", placeholder: "Tu contribución..." },
    { key: "paid", label: "¿Por qué te pueden pagar?", placeholder: "Tu propuesta de valor..." },
  ];

  return (
    <motion.div {...fade} className="max-w-xl w-full mx-auto">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[#C41E1E] text-xs font-bold tracking-widest">2 / 4</span>
      </div>
      <h2 className="font-bebas text-4xl text-white tracking-wide mb-2">
        TU IKIGAI
      </h2>
      <p className="text-white/60 text-sm mb-8">
        Estas respuestas darán contexto profundo a tu diagnóstico.
      </p>
      <div className="space-y-8">
        {fields.map((f) => (
          <div key={f.key}>
            <label className="block text-sm font-semibold text-[#D4A017] mb-2">
              {f.label}
            </label>
            <input
              type="text"
              value={data[f.key]}
              onChange={(e) => setData({ ...data, [f.key]: e.target.value })}
              className="w-full bg-transparent border-b-2 border-white/20 focus:border-[#C41E1E] outline-none text-white text-base py-2 transition-colors duration-200"
              placeholder={f.placeholder}
            />
          </div>
        ))}
      </div>
      <button
        onClick={() => onNext(data)}
        className="mt-10 bg-[#C41E1E] hover:bg-[#a01818] text-white font-bold text-lg px-8 py-4 tracking-wider transition-colors duration-200 w-full"
      >
        CONTINUAR →
      </button>
    </motion.div>
  );
}

// STEP 3: Cimientos UNESCO
function StepCimientos({ onNext }: { onNext: (data: CimientosData) => void }) {
  const [values, setValues] = useState<CimientosData>({
    conocer: 5,
    hacer: 5,
    convivir: 5,
    ser: 5,
  });

  const sliders: { key: keyof CimientosData; label: string }[] = [
    { key: "conocer", label: "Aprender a Conocer" },
    { key: "hacer", label: "Aprender a Hacer" },
    { key: "convivir", label: "Aprender a Convivir" },
    { key: "ser", label: "Aprender a Ser" },
  ];

  return (
    <motion.div {...fade} className="max-w-xl w-full mx-auto">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[#C41E1E] text-xs font-bold tracking-widest">3 / 4</span>
      </div>
      <h2 className="font-bebas text-4xl text-white tracking-wide mb-2">
        CIMIENTOS UNESCO
      </h2>
      <p className="text-white/60 text-sm mb-8">
        Califica del 1 al 10 tu nivel actual en cada pilar del aprendizaje.
      </p>
      <div className="space-y-8">
        {sliders.map((s) => {
          const v = values[s.key];
          const color = v <= 4 ? "#C41E1E" : v <= 7 ? "#E07020" : "#D4A017";
          return (
            <div key={s.key}>
              <div className="flex justify-between items-center mb-2">
                <label className="text-white font-semibold text-sm">{s.label}</label>
                <span className="font-bebas text-2xl" style={{ color }}>
                  {v}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={v}
                onChange={(e) =>
                  setValues({ ...values, [s.key]: Number(e.target.value) })
                }
                className="w-full h-2 rounded appearance-none cursor-pointer"
                style={{
                  accentColor: color,
                  background: `linear-gradient(to right, ${color} ${(v - 1) * 11.1}%, rgba(255,255,255,0.15) ${(v - 1) * 11.1}%)`,
                }}
              />
              <div className="flex justify-between text-white/30 text-xs mt-1">
                <span>1</span>
                <span>10</span>
              </div>
            </div>
          );
        })}
      </div>
      <button
        onClick={() => onNext(values)}
        className="mt-10 bg-[#C41E1E] hover:bg-[#a01818] text-white font-bold text-lg px-8 py-4 tracking-wider transition-colors duration-200 w-full"
      >
        CONTINUAR →
      </button>
    </motion.div>
  );
}

// STEP 4: Matriz 4×4
function StepMatriz({ onNext }: { onNext: (scores: Record<string, number>) => void }) {
  const [scores, setScores] = useState<Record<string, number>>({});
  const categories = ["Conocimiento", "Habilidades", "Competencias", "Valores"] as const;

  const answered = Object.keys(scores).length;
  const total = questions.length;

  function setScore(id: string, val: number) {
    setScores((prev) => ({ ...prev, [id]: val }));
  }

  function canSubmit() {
    return questions.every((q) => scores[q.id] !== undefined);
  }

  return (
    <motion.div {...fade} className="max-w-2xl w-full mx-auto">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[#C41E1E] text-xs font-bold tracking-widest">4 / 4</span>
        <span className="text-white/50 text-xs">{answered}/{total} respondidas</span>
      </div>
      {/* Progress bar */}
      <div className="w-full h-1 bg-white/10 rounded mb-6">
        <div
          className="h-full bg-[#C41E1E] rounded transition-all duration-300"
          style={{ width: `${(answered / total) * 100}%` }}
        />
      </div>
      <h2 className="font-bebas text-4xl text-white tracking-wide mb-8">
        DIAGNÓSTICO 4×4
      </h2>

      {categories.map((cat) => (
        <div key={cat} className="mb-10">
          <h3 className="font-bebas text-2xl text-[#D4A017] tracking-wider mb-5 border-b border-[#D4A017]/20 pb-2">
            {cat}
          </h3>
          <div className="space-y-6">
            {questions
              .filter((q) => q.category === cat)
              .map((q) => {
                const v = scores[q.id];
                return (
                  <div key={q.id}>
                    <p className="text-white/90 text-sm leading-relaxed mb-3">
                      <span className="text-[#C41E1E] font-bold mr-2">{q.id}.</span>
                      {q.text}
                      <span className="ml-2 text-white/30 text-xs">({q.dimension})</span>
                    </p>
                    <div className="flex gap-1 flex-wrap">
                      {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => {
                        const isSelected = v === n;
                        const color = n <= 4 ? "#C41E1E" : n <= 7 ? "#E07020" : "#D4A017";
                        return (
                          <button
                            key={n}
                            onClick={() => setScore(q.id, n)}
                            className="w-8 h-8 text-xs font-bold transition-all duration-150 border"
                            style={{
                              background: isSelected ? color : "transparent",
                              borderColor: isSelected ? color : "rgba(255,255,255,0.2)",
                              color: isSelected ? "#0A0A0A" : "rgba(245,245,245,0.6)",
                            }}
                          >
                            {n}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ))}

      <button
        onClick={() => canSubmit() && onNext(scores)}
        disabled={!canSubmit()}
        className={`w-full text-white font-bold text-xl py-5 tracking-wider transition-all duration-200 ${
          canSubmit()
            ? "bg-[#C41E1E] hover:bg-[#a01818] cursor-pointer"
            : "bg-white/10 cursor-not-allowed text-white/40"
        }`}
      >
        {canSubmit() ? "VER MIS RESULTADOS →" : `Responde ${total - answered} pregunta(s) más`}
      </button>
    </motion.div>
  );
}

// MAIN FLOW
export default function DiagnosticoFlow({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<Step>("registro");
  const [userData, setUserData] = useState<UserData>({ nombre: "", email: "" });
  const [ikigaiData, setIkigaiData] = useState<IkigaiData>({
    love: "",
    good: "",
    world: "",
    paid: "",
  });
  const [cimientosData, setCimientosData] = useState<CimientosData>({
    conocer: 5,
    hacer: 5,
    convivir: 5,
    ser: 5,
  });
  const [matrizScores, setMatrizScores] = useState<Record<string, number>>({});

  const stepIndex: Record<Step, number> = {
    registro: 0,
    memento: 1,
    ikigai: 2,
    cimientos: 3,
    matriz: 4,
    resultados: 5,
  };

  return (
    <div className="fixed inset-0 bg-[#0A0A0A] z-50 overflow-y-auto">
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/40 hover:text-white text-2xl font-bold z-10"
      >
        ✕
      </button>

      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
        {step !== "resultados" && (
          <ProgressBar step={stepIndex[step]} />
        )}

        <AnimatePresence mode="wait">
          {step === "registro" && (
            <StepRegistro
              key="registro"
              onNext={(data) => {
                setUserData(data);
                setStep("memento");
              }}
            />
          )}
          {step === "memento" && (
            <StepMemento
              key="memento"
              nombre={userData.nombre}
              onNext={() => setStep("ikigai")}
            />
          )}
          {step === "ikigai" && (
            <StepIkigai
              key="ikigai"
              onNext={(data) => {
                setIkigaiData(data);
                setStep("cimientos");
              }}
            />
          )}
          {step === "cimientos" && (
            <StepCimientos
              key="cimientos"
              onNext={(data) => {
                setCimientosData(data);
                setStep("matriz");
              }}
            />
          )}
          {step === "matriz" && (
            <StepMatriz
              key="matriz"
              onNext={(scores) => {
                setMatrizScores(scores);
                setStep("resultados");
              }}
            />
          )}
          {step === "resultados" && (
            <Resultados
              key="resultados"
              userData={userData}
              ikigai={ikigaiData}
              cimientos={cimientosData}
              scores={matrizScores}
              onClose={onClose}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

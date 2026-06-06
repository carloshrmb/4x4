"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { questions, getProfile, scoreColor } from "@/lib/questions";

interface Props {
  userData: { nombre: string; email: string };
  ikigai: { love: string; good: string; world: string; paid: string };
  cimientos: { conocer: number; hacer: number; convivir: number; ser: number };
  scores: Record<string, number>;
  onClose: () => void;
}

const RADAR_FILL = "#C41E1E";
const RADAR_STROKE = "#D4A017";

export default function Resultados({ userData, ikigai, cimientos, scores, onClose }: Props) {
  const reportRef = useRef<HTMLDivElement>(null);

  const radarData = questions.map((q) => ({
    subject: q.id,
    value: scores[q.id] ?? 0,
    fullMark: 10,
  }));

  const avg =
    Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length;
  const profile = getProfile(avg);

  const sorted = [...questions].sort(
    (a, b) => (scores[a.id] ?? 0) - (scores[b.id] ?? 0)
  );
  const blindSpot = sorted[0];
  const top3 = sorted.slice(-3).reverse();
  const bottom3 = sorted.slice(0, 3);

  async function handleDownloadPDF() {
    const { default: jsPDF } = await import("jspdf");
    const html2canvas = (await import("html2canvas")).default;

    if (!reportRef.current) return;

    const canvas = await html2canvas(reportRef.current, {
      backgroundColor: "#0A0A0A",
      scale: 2,
    });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`diagnostico-4x4-${userData.nombre.replace(/\s+/g, "-")}.pdf`);
  }

  const waMessage = `Hola Carlos, soy ${userData.nombre} y acab%C3%A9 mi diagn%C3%B3stico 4x4. Me gustar%C3%ADa agendar una sesi%C3%B3n`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-4xl mx-auto"
    >
      {/* Printable area */}
      <div ref={reportRef} className="bg-[#0A0A0A] px-6 py-8">
        {/* Header */}
        <div className="border-b border-[#D4A017]/30 pb-6 mb-8">
          <p className="text-[#D4A017] font-bebas text-2xl tracking-widest mb-1">
            DIAGNÓSTICO DE: {userData.nombre.toUpperCase()}
          </p>
          <p className="text-white/50 text-sm">
            {userData.email} · {new Date().toLocaleDateString("es-MX", { dateStyle: "long" })}
          </p>
        </div>

        {/* Profile */}
        <div className="text-center mb-10">
          <p className="text-white/50 text-sm tracking-widest mb-2">RESULTADO</p>
          <p
            className="font-bebas text-[clamp(2.5rem,8vw,5rem)] leading-none tracking-wide"
            style={{ color: profile.color }}
          >
            {profile.emoji} {profile.label}
          </p>
          <p className="text-white/70 mt-3 max-w-lg mx-auto text-base leading-relaxed">
            {profile.description}
          </p>
          <p className="mt-2 text-white/40 text-sm">
            Promedio general:{" "}
            <span className="font-bold" style={{ color: profile.color }}>
              {avg.toFixed(1)} / 10
            </span>
          </p>
        </div>

        {/* Radar */}
        <div className="mb-10">
          <h3 className="font-bebas text-2xl text-white tracking-wide mb-4 text-center">
            MAPA DE TU MOTOR 4×4
          </h3>
          <ResponsiveContainer width="100%" height={360}>
            <RadarChart data={radarData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
              <PolarGrid stroke="rgba(255,255,255,0.1)" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: "#F5F5F5", fontSize: 11, fontFamily: "Inter" }}
              />
              <Radar
                name="Puntaje"
                dataKey="value"
                stroke={RADAR_STROKE}
                fill={RADAR_FILL}
                fillOpacity={0.4}
                strokeWidth={2}
              />
              <Tooltip
                contentStyle={{ background: "#1A1A1A", border: "1px solid #D4A017", color: "#F5F5F5" }}
                formatter={(val) => [val ?? 0, "Puntaje"]}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Punto ciego */}
        <div
          className="bg-[#1A1A1A] p-5 mb-8"
          style={{ borderLeft: "4px solid #C41E1E" }}
        >
          <p className="text-[#C41E1E] text-xs font-bold tracking-widest mb-1">
            PUNTO CIEGO — ÁREA PRIORITARIA
          </p>
          <p className="text-white font-semibold mb-1">
            {blindSpot.id} — {blindSpot.category} · {blindSpot.dimension}
          </p>
          <p className="text-white/70 text-sm">{blindSpot.text}</p>
          <p className="mt-2">
            <span className="font-bebas text-2xl" style={{ color: scoreColor(scores[blindSpot.id] ?? 0) }}>
              {scores[blindSpot.id] ?? 0}/10
            </span>
          </p>
        </div>

        {/* Fortalezas y mejoras */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h4 className="font-bebas text-xl text-[#D4A017] tracking-wider mb-3">
              TOP 3 FORTALEZAS
            </h4>
            <div className="space-y-3">
              {top3.map((q) => (
                <div key={q.id} className="flex items-center gap-3">
                  <span
                    className="font-bebas text-2xl w-10 text-right"
                    style={{ color: scoreColor(scores[q.id] ?? 0) }}
                  >
                    {scores[q.id] ?? 0}
                  </span>
                  <div>
                    <p className="text-white text-sm font-semibold">{q.id} — {q.dimension}</p>
                    <p className="text-white/50 text-xs">{q.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bebas text-xl text-[#C41E1E] tracking-wider mb-3">
              TOP 3 ÁREAS DE MEJORA
            </h4>
            <div className="space-y-3">
              {bottom3.map((q) => (
                <div key={q.id} className="flex items-center gap-3">
                  <span
                    className="font-bebas text-2xl w-10 text-right"
                    style={{ color: scoreColor(scores[q.id] ?? 0) }}
                  >
                    {scores[q.id] ?? 0}
                  </span>
                  <div>
                    <p className="text-white text-sm font-semibold">{q.id} — {q.dimension}</p>
                    <p className="text-white/50 text-xs">{q.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* All 16 scores */}
        <div className="mb-8">
          <h4 className="font-bebas text-xl text-white tracking-wider mb-4">
            LAS 16 DIMENSIONES
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {questions.map((q) => (
              <div key={q.id} className="flex items-center gap-3 bg-[#1A1A1A] px-4 py-3">
                <span
                  className="font-bebas text-xl w-8"
                  style={{ color: scoreColor(scores[q.id] ?? 0) }}
                >
                  {scores[q.id] ?? 0}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-semibold truncate">
                    {q.id} · {q.category}
                  </p>
                  <p className="text-white/40 text-xs">{q.dimension}</p>
                </div>
                <div
                  className="w-20 h-1 rounded"
                  style={{
                    background: `linear-gradient(to right, ${scoreColor(scores[q.id] ?? 0)} ${(scores[q.id] ?? 0) * 10}%, rgba(255,255,255,0.1) ${(scores[q.id] ?? 0) * 10}%)`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Ikigai summary */}
        {(ikigai.love || ikigai.good) && (
          <div className="bg-[#1A1A1A] p-5 mb-8" style={{ borderTop: "3px solid #D4A017" }}>
            <h4 className="font-bebas text-xl text-[#D4A017] tracking-wider mb-3">
              TU IKIGAI
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {[
                { label: "Amas", val: ikigai.love },
                { label: "Eres bueno en", val: ikigai.good },
                { label: "El mundo necesita", val: ikigai.world },
                { label: "Te pueden pagar por", val: ikigai.paid },
              ].map((i) => (
                <div key={i.label}>
                  <p className="text-white/40 text-xs">{i.label.toUpperCase()}</p>
                  <p className="text-white">{i.val || "—"}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-white/10 pt-6 text-center text-white/40 text-xs">
          <p className="font-bebas text-lg text-[#D4A017] tracking-widest mb-1">
            CARLOS HERMOSILLO
          </p>
          <p>carhermosilloja@gmail.com · wa.me/526671500717 · @carhermosillo</p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8 px-6">
        <button
          onClick={handleDownloadPDF}
          className="flex-1 bg-[#D4A017] hover:bg-[#b88a12] text-black font-bold py-4 tracking-wider transition-colors duration-200 text-center"
        >
          📄 DESCARGAR MI DIAGNÓSTICO PDF
        </button>
        <a
          href={`https://wa.me/526671500717?text=${waMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-[#C41E1E] hover:bg-[#a01818] text-white font-bold py-4 tracking-wider transition-colors duration-200 text-center"
        >
          🚙 AGENDA TU SESIÓN CON CARLOS
        </a>
        <a
          href="https://www.amazon.com.mx/El-4x4-Productividad-%C2%A1Convi%C3%A9rtete-Todoterreno/dp/B0DXDXX5MN/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 border-2 border-[#D4A017] text-[#D4A017] hover:bg-[#D4A017] hover:text-black font-bold py-4 tracking-wider transition-colors duration-200 text-center"
        >
          📖 COMPRAR EL LIBRO
        </a>
      </div>

      <div className="text-center mt-8 px-6">
        <button
          onClick={onClose}
          className="text-white/40 hover:text-white text-sm underline transition-colors"
        >
          Volver al inicio
        </button>
      </div>
    </motion.div>
  );
}

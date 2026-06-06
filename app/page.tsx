"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import AboutAuthor from "@/components/AboutAuthor";
import Metodologia from "@/components/Metodologia";
import CTADiagnostico from "@/components/CTADiagnostico";
import DiagnosticoFlow from "@/components/DiagnosticoFlow";

export default function Home() {
  const [showDiagnostico, setShowDiagnostico] = useState(false);

  return (
    <>
      {showDiagnostico && (
        <DiagnosticoFlow onClose={() => setShowDiagnostico(false)} />
      )}

      <main>
        <Hero onStartDiagnostico={() => setShowDiagnostico(true)} />
        <AboutAuthor />
        <Metodologia />
        <CTADiagnostico onStart={() => setShowDiagnostico(true)} />
      </main>
    </>
  );
}

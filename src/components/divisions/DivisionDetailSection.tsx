"use client";

import { useState } from "react";
import type { Division } from "@/types";
import { LogoModal } from "@/components/layout/LogoModal";
import { DivisionDetailSectionLayout } from "./DivisionDetailSection/DivisionDetailSectionLayout";

interface DivisionDetailSectionProps {
  division: Division;
  index: number;
}

const SPARKLES = [
  { top: "8%", left: "12%", delay: 0 },
  { top: "18%", left: "88%", delay: 0.6 },
  { top: "82%", left: "10%", delay: 1.2 },
  { top: "88%", left: "82%", delay: 0.3 },
];

export function DivisionDetailSection({ division, index }: DivisionDetailSectionProps) {
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);

  return (
    <>
      <DivisionDetailSectionLayout
        division={division}
        index={index}
        isLogoModalOpen={isLogoModalOpen}
        setIsLogoModalOpen={setIsLogoModalOpen}
        SPARKLES={SPARKLES}
      />

      {isLogoModalOpen && division.logoUrl && (
        <LogoModal
          logoUrl={division.logoUrl}
          alt={`Logo ${division.name}`}
          onClose={() => setIsLogoModalOpen(false)}
        />
      )}
    </>
  );
}

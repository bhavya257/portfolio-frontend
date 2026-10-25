"use client";

import { useState } from "react";
import {
  ArrowRight,
  Briefcase,
  Code2,
  FileText,
  Home as HomeIcon,
  Mail,
  Volume2,
  Wrench,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/Card";

const TILES = [
  { id: "home", icon: HomeIcon, className: "bg-purple text-black border-transparent", label: "Home" },
  { id: "experience", icon: Briefcase, className: "bg-orange text-black border-transparent", label: "Experience" },
  { id: "projects", icon: Code2, className: "bg-green text-black border-transparent", label: "Projects" },
  { id: "skills", icon: Wrench, className: "bg-blue text-black border-transparent", label: "Skills" },
  { id: "contact", icon: Mail, className: "bg-yellow text-black border-transparent", label: "Contact" },
  { id: "resume", icon: FileText, className: "bg-lime text-black border-transparent", label: "Resume" },
];

export function TileShowcase() {
  const [selectedId, setSelectedId] = useState("home");

  return (
    <div className="flex flex-col items-center gap-8 max-w-md w-full">
      <div className="flex flex-wrap items-center justify-center gap-3 p-3 bg-[#1c1c1c] rounded-2xl border border-white/10">
        {TILES.map((tile) => (
          <Button
            key={tile.id}
            size="icon"
            variant="solid"
            className={tile.className}
            isActive={selectedId === tile.id}
            onClick={() => setSelectedId(tile.id)}
            aria-label={tile.label}
            iconStart={tile.icon}
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button variant="outline" iconEnd={ArrowRight}>Outline</Button>
        <Button variant="plain" iconEnd={ArrowRight}>No Outline</Button>
        <Button variant="outline" className="border-lime text-lime" sweepClassName="bg-lime">Lime Sweep</Button>
        <Button variant="solid">Solid</Button>
        <Button size="icon" variant="outline" aria-label="Close modal" iconStart={X} />
        <Button size="icon" variant="plain" aria-label="Toggle audio" iconStart={Volume2} />
      </div>

      <div className="w-full flex flex-col gap-6 text-left">
        <Card className="border-b border-white/10 pb-6">
          <CardHeader className="space-y-2">
            <CardTitle>Speaker Verification System</CardTitle>
            <CardDescription>
              A deep learning project that matches audio clips to an enrolled speaker&apos;s voice, deployed as a Streamlit web app.
            </CardDescription>
          </CardHeader>
          <CardFooter className="pt-4">
            <Button
              variant="plain"
              size="sm"
              iconEnd={ArrowRight}
            >
              View Project
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-b border-white/10 pb-6">
          <CardHeader className="space-y-2">
            <CardTitle>Spam SMS Classifier</CardTitle>
            <CardDescription>
              A machine learning project to detect spam SMS, deployed as a Streamlit web app.
            </CardDescription>
          </CardHeader>
          <CardFooter className="pt-4">
            <Button
              variant="plain"
              size="sm"
              iconEnd={ArrowRight}
            >
              View Project
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

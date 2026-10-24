"use client";

import { useState } from "react";
import {
  Briefcase,
  Code2,
  FileText,
  Home as HomeIcon,
  Mail,
  Wrench,
} from "lucide-react";
import { IconTile } from "@/components/ui/IconTile";
import type { TileColor } from "@/lib/site";

const TILES = [
  { id: "home", icon: HomeIcon, color: "purple" as TileColor, label: "Home" },
  { id: "experience", icon: Briefcase, color: "orange" as TileColor, label: "Experience" },
  { id: "projects", icon: Code2, color: "green" as TileColor, label: "Projects" },
  { id: "skills", icon: Wrench, color: "blue" as TileColor, label: "Skills" },
  { id: "contact", icon: Mail, color: "yellow" as TileColor, label: "Contact" },
  { id: "resume", icon: FileText, color: "lime" as TileColor, label: "Resume" },
];

export function TileShowcase() {
  const [selectedId, setSelectedId] = useState("home");

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-wrap items-center justify-center gap-3 p-3 bg-[#1c1c1c] rounded-2xl border border-white/10">
        {TILES.map((tile) => (
          <IconTile
            key={tile.id}
            icon={tile.icon}
            color={tile.color}
            isActive={selectedId === tile.id}
            interactive
            onClick={() => setSelectedId(tile.id)}
            aria-label={tile.label}
          />
        ))}
      </div>
    </div>
  );
}

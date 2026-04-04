export const toolThemes = {
  nmap: {
    accent: "text-emerald-400",
    accentSoft: "text-emerald-300",
    borderHover: "hover:border-emerald-400/50",
    glow: "hover:shadow-[0_0_30px_rgba(52,211,153,0.25)]",
  },

  wireshark: {
    accent: "text-sky-400",
    accentSoft: "text-sky-300",
    borderHover: "hover:border-sky-400/50",
    glow: "hover:shadow-[0_0_30px_rgba(56,189,248,0.25)]",
  },

  tcpdump: {
    accent: "text-teal-400",
    accentSoft: "text-teal-300",
    borderHover: "hover:border-teal-400/50",
    glow: "hover:shadow-[0_0_30px_rgba(45,212,191,0.25)]",
  },

  netcat: {
    accent: "text-lime-400",
    accentSoft: "text-lime-300",
    borderHover: "hover:border-lime-400/50",
    glow: "hover:shadow-[0_0_30px_rgba(163,230,53,0.25)]",
  },

  bettercap: {
    accent: "text-purple-400",
    accentSoft: "text-purple-300",
    borderHover: "hover:border-purple-400/50",
    glow: "hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]",
  },

  burpsuite: {
    accent: "text-orange-400",
    accentSoft: "text-orange-300",
    borderHover: "hover:border-orange-400/50",
    glow: "hover:shadow-[0_0_30px_rgba(251,146,60,0.25)]",
  },

  owaspzap: {
    accent: "text-amber-400",
    accentSoft: "text-amber-300",
    borderHover: "hover:border-amber-400/50",
    glow: "hover:shadow-[0_0_30px_rgba(252,211,77,0.25)]",
  },

  sqlmap: {
    accent: "text-rose-400",
    accentSoft: "text-rose-300",
    borderHover: "hover:border-rose-400/50",
    glow: "hover:shadow-[0_0_30px_rgba(251,113,133,0.25)]",
  },

  hydra: {
    accent: "text-fuchsia-400",
    accentSoft: "text-fuchsia-300",
    borderHover: "hover:border-fuchsia-400/50",
    glow: "hover:shadow-[0_0_30px_rgba(232,121,249,0.25)]",
  },

  johntheripper: {
    accent: "text-indigo-400",
    accentSoft: "text-indigo-300",
    borderHover: "hover:border-indigo-400/50",
    glow: "hover:shadow-[0_0_30px_rgba(129,140,248,0.25)]",
  },

  hashcat: {
    accent: "text-cyan-400",
    accentSoft: "text-cyan-300",
    borderHover: "hover:border-cyan-400/50",
    glow: "hover:shadow-[0_0_30px_rgba(34,211,238,0.25)]",
  },

  aircrackng: {
    accent: "text-green-400",
    accentSoft: "text-green-300",
    borderHover: "hover:border-green-400/50",
    glow: "hover:shadow-[0_0_30px_rgba(74,222,128,0.25)]",
  },

  metasploit: {
    accent: "text-red-400",
    accentSoft: "text-red-300",
    borderHover: "hover:border-red-400/50",
    glow: "hover:shadow-[0_0_30px_rgba(248,113,113,0.25)]",
  },

  maltego: {
    accent: "text-violet-400",
    accentSoft: "text-violet-300",
    borderHover: "hover:border-violet-400/50",
    glow: "hover:shadow-[0_0_30px_rgba(167,139,250,0.25)]",
  },

  sherlock: {
    accent: "text-pink-400",
    accentSoft: "text-pink-300",
    borderHover: "hover:border-pink-400/50",
    glow: "hover:shadow-[0_0_30px_rgba(244,114,182,0.25)]",
  },

  shodan: {
    accent: "text-blue-400",
    accentSoft: "text-blue-300",
    borderHover: "hover:border-blue-400/50",
    glow: "hover:shadow-[0_0_30px_rgba(96,165,250,0.25)]",
  },

  theharvester: {
    accent: "text-slate-400",
    accentSoft: "text-slate-300",
    borderHover: "hover:border-slate-400/50",
    glow: "hover:shadow-[0_0_30px_rgba(148,163,184,0.25)]",
  },
} as const;

export type ToolName = keyof typeof toolThemes;

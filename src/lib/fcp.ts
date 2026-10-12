export type FcpGroup = "ring" | "study" | "bench" | "made";

export type Fcp = {
  id: string;
  name: string;
  href: string;
  group: FcpGroup;
  note: string;
  aliases: string[];
  madeHere: boolean;
};

export type LinkResult = {
  ok: boolean;
  detail: string;
  at: string;
};

export const GROUP_LABEL: Record<FcpGroup, string> = {
  ring: "Ring",
  study: "Study",
  bench: "Bench",
  made: "Made here",
};

export const SEEDS: Fcp[] = [
  site("doinbetter-com", "DoinBetter.com", "https://doinbetter.com", "ring", "Products and services."),
  site("doinbetter-org", "DoinBetter.org", "https://doinbetter.org", "ring", "Mission and public good."),
  site("heymico-com", "HeyMico.com", "https://heymico.com", "ring", "Assistant surface."),
  site("heymico-org", "HeyMico.org", "https://heymico.org", "ring", "Open knowledge."),
  site("tailly", "Tailly.cc", "https://tailly.cc", "ring", "Receipts and short links."),
  site("ahig", "ahig.xyz", "https://ahig.xyz", "ring", "Lab and prototypes."),
  site("timmyu", "TimmyU.in", "https://timmyu.in", "ring", "Identity hub."),
  site("winxm", "winxm.art", "https://winxm.art", "ring", "Studio and merch."),
  site("chabad", "Chabad.org", "https://www.chabad.org", "study", "Chabad-Lubavitch library and community.", ["chabad.org"]),
  site("lubavitch-house", "LubavitchHouse.org", "https://lubavitchhouse.org", "study", "Named as given."),
  site("aish", "Aish.com", "https://www.aish.com", "study", "Aish learning surface.", ["aish.com"]),
  site("asknoah", "ASKnOAH.org", "https://asknoah.org", "study", "Ask Noah.", ["asknoah.org", "asknoah.com"]),
  site("noahide-academy", "noahideacademy.org", "https://noahideacademy.org", "study", "Noahide Academy."),
  site("outreach", "outreachjudaism.com", "https://outreachjudaism.org", "study", "Outreach Judaism. The .org is the public site.", ["outreachjudaism.com", "outreachjudaism.org"]),
  site("aste", "asimpletheoryofeverything.com", "https://asimpletheoryofeverything.com", "study", "Named as given."),
  site("jff", "j.f.f.", "", "study", "Alias on the board. Paste an address when you have one."),
  site("canva", "Canva", "https://www.canva.com", "bench", "Design, if you already have it.", ["canva.com"]),
  site("printify", "Printify", "https://printify.com", "bench", "Save-state to cloth, if you already have it."),
  site("drive", "Google Drive", "https://drive.google.com", "bench", "Files, if you already have them.", ["drive.google.com"]),
  site("github", "GitHub", "https://github.com", "bench", "Code, if you already have it.", ["github.com"]),
];

function site(
  id: string,
  name: string,
  href: string,
  group: FcpGroup,
  note: string,
  aliases: string[] = [],
): Fcp {
  return { id, name, href, group, note, aliases, madeHere: false };
}

export function hostOf(href: string): string {
  if (!href) return "";
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return href.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  }
}

function norm(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");
}

export function matches(fcp: Fcp, query: string): boolean {
  const q = norm(query);
  if (!q) return true;
  if (norm(fcp.name).includes(q)) return true;
  if (fcp.href && norm(fcp.href).includes(q)) return true;
  if (hostOf(fcp.href) && norm(hostOf(fcp.href)).includes(q)) return true;
  return fcp.aliases.some((alias) => norm(alias).includes(q) || q.includes(norm(alias)));
}

export function findExact(list: Fcp[], query: string): Fcp | null {
  const q = norm(query);
  if (!q) return null;
  return (
    list.find((fcp) => {
      if (norm(fcp.name) === q) return true;
      if (fcp.href && (norm(fcp.href) === q || norm(hostOf(fcp.href)) === q)) return true;
      return fcp.aliases.some((alias) => norm(alias) === q);
    }) ?? null
  );
}

export function looksLikeAddress(query: string): boolean {
  const q = query.trim();
  return /^https?:\/\//i.test(q) || /^[\w.-]+\.[a-z]{2,}([/:?#].*)?$/i.test(q);
}

export function draftFromQuery(query: string): Fcp {
  const q = query.trim();
  const href = looksLikeAddress(q) ? (q.startsWith("http") ? q : `https://${q}`) : "";
  const name = href ? hostOf(href) : q;
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? `made-${crypto.randomUUID()}`
      : `made-${Date.now()}`;
  return {
    id,
    name: name || "Untitled",
    href,
    group: "made",
    note: href ? "Made from an address you gave." : "Made. Paste an address, then connect it.",
    aliases: [],
    madeHere: true,
  };
}

export function toPacket(fcp: Fcp) {
  return {
    name: fcp.name,
    href: fcp.href,
    group: fcp.group,
    verb: fcp.href ? "connect" : "make",
  };
}

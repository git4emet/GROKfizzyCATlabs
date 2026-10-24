import "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[opacity,transform,background-color,color,box-shadow] duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-accent text-accent-foreground hover:opacity-90",
			outline: "bg-transparent text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
			ghost: "bg-transparent text-muted hover:text-fg hover:bg-subtle",
			bind: "bg-accent text-accent-foreground hover:opacity-90"
		},
		size: {
			default: "h-11 rounded-md px-4 text-sm",
			sm: "h-9 rounded-sm px-3 text-sm",
			lg: "h-12 rounded-md px-5 text-sm",
			icon: "size-11 rounded-md"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-11 w-full rounded-md bg-subtle px-3 text-sm text-fg shadow-[var(--shadow-border)]", "placeholder:text-subtle-fg", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", "disabled:cursor-not-allowed disabled:opacity-40", className),
		...props
	});
}
var GROUP_LABEL = {
	ring: "Ring",
	study: "Study",
	bench: "Bench",
	made: "Made here"
};
var SEEDS = [
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
	site("github", "GitHub", "https://github.com", "bench", "Code, if you already have it.", ["github.com"])
];
function site(id, name, href, group, note, aliases = []) {
	return {
		id,
		name,
		href,
		group,
		note,
		aliases,
		madeHere: false
	};
}
function hostOf(href) {
	if (!href) return "";
	try {
		return new URL(href).hostname.replace(/^www\./, "");
	} catch {
		return href.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
	}
}
function norm(value) {
	return value.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");
}
function matches(fcp, query) {
	const q = norm(query);
	if (!q) return true;
	if (norm(fcp.name).includes(q)) return true;
	if (fcp.href && norm(fcp.href).includes(q)) return true;
	if (hostOf(fcp.href) && norm(hostOf(fcp.href)).includes(q)) return true;
	return fcp.aliases.some((alias) => norm(alias).includes(q) || q.includes(norm(alias)));
}
function findExact(list, query) {
	const q = norm(query);
	if (!q) return null;
	return list.find((fcp) => {
		if (norm(fcp.name) === q) return true;
		if (fcp.href && (norm(fcp.href) === q || norm(hostOf(fcp.href)) === q)) return true;
		return fcp.aliases.some((alias) => norm(alias) === q);
	}) ?? null;
}
function looksLikeAddress(query) {
	const q = query.trim();
	return /^https?:\/\//i.test(q) || /^[\w.-]+\.[a-z]{2,}([/:?#].*)?$/i.test(q);
}
function draftFromQuery(query) {
	const q = query.trim();
	const href = looksLikeAddress(q) ? q.startsWith("http") ? q : `https://${q}` : "";
	const name = href ? hostOf(href) : q;
	return {
		id: typeof crypto !== "undefined" && "randomUUID" in crypto ? `made-${crypto.randomUUID()}` : `made-${Date.now()}`,
		name: name || "Untitled",
		href,
		group: "made",
		note: href ? "Made from an address you gave." : "Made. Paste an address, then connect it.",
		aliases: [],
		madeHere: true
	};
}
function toPacket(fcp) {
	return {
		name: fcp.name,
		href: fcp.href,
		group: fcp.group,
		verb: fcp.href ? "connect" : "make"
	};
}
//#endregion
export { draftFromQuery as a, looksLikeAddress as c, SEEDS as i, matches as l, GROUP_LABEL as n, findExact as o, Input as r, hostOf as s, Button as t, toPacket as u };

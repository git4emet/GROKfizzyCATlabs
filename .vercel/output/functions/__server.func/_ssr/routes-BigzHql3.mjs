import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { i as string, r as object } from "../_libs/zod.mjs";
import { a as Copy, i as ExternalLink, n as Trash2, r as Plus } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BigzHql3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
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
var useFcp = create()(persist((set) => ({
	extras: [],
	hrefs: {},
	results: {},
	add: (fcp) => set((state) => ({ extras: [fcp, ...state.extras.filter((item) => item.id !== fcp.id)] })),
	setHref: (id, href) => set((state) => ({
		hrefs: {
			...state.hrefs,
			[id]: href
		},
		extras: state.extras.map((item) => item.id === id ? {
			...item,
			href
		} : item)
	})),
	setResult: (id, result) => set((state) => ({ results: {
		...state.results,
		[id]: result
	} })),
	remove: (id) => set((state) => ({ extras: state.extras.filter((item) => item.id !== id) }))
}), { name: "fcp-adapter" }));
function mergeBoard(extras, hrefs) {
	const seeded = SEEDS.map((fcp) => hrefs[fcp.id] !== void 0 ? {
		...fcp,
		href: hrefs[fcp.id]
	} : fcp);
	const ids = new Set(seeded.map((fcp) => fcp.id));
	return [...extras.filter((fcp) => !ids.has(fcp.id)), ...seeded];
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var probeFcp = createServerFn({ method: "POST" }).validator(object({ href: string().min(1).max(500) })).handler(createSsrRpc("744ab667592050bde647e4b727fe7c91776ee010f7cffb89706b07f28b6f1e73"));
var ORDER = [
	"ring",
	"study",
	"bench",
	"made"
];
function AdapterPage() {
	const extras = useFcp((state) => state.extras);
	const hrefs = useFcp((state) => state.hrefs);
	const results = useFcp((state) => state.results);
	const add = useFcp((state) => state.add);
	const setHref = useFcp((state) => state.setHref);
	const setResult = useFcp((state) => state.setResult);
	const remove = useFcp((state) => state.remove);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	const [query, setQuery] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const finish = () => setHydrated(true);
		const unsub = useFcp.persist.onFinishHydration(finish);
		if (useFcp.persist.hasHydrated()) finish();
		return unsub;
	}, []);
	const board = (0, import_react.useMemo)(() => hydrated ? mergeBoard(extras, hrefs) : mergeBoard([], {}), [
		extras,
		hrefs,
		hydrated
	]);
	const visible = board.filter((fcp) => matches(fcp, query));
	const exact = findExact(board, query);
	const trimmed = query.trim();
	async function connect(fcp) {
		if (!fcp.href) return;
		window.open(fcp.href, "_blank", "noopener,noreferrer");
		setBusy(fcp.id);
		try {
			const result = await probeFcp({ data: { href: fcp.href } });
			setResult(fcp.id, {
				ok: result.ok,
				detail: result.detail,
				at: (/* @__PURE__ */ new Date()).toISOString()
			});
		} catch {
			setResult(fcp.id, {
				ok: false,
				detail: "Opened. The check did not finish.",
				at: (/* @__PURE__ */ new Date()).toISOString()
			});
		} finally {
			setBusy(null);
		}
	}
	function make() {
		if (!trimmed || exact) return;
		const draft = draftFromQuery(trimmed);
		add(draft);
		setQuery("");
		toast(`Made ${draft.name}`);
		if (draft.href) connect(draft);
	}
	function onSubmit(event) {
		event.preventDefault();
		if (exact?.href) {
			connect(exact);
			return;
		}
		make();
	}
	async function copyOne(fcp) {
		try {
			await navigator.clipboard.writeText(JSON.stringify(toPacket(fcp), null, 2));
			toast(`Copied ${fcp.name}`);
		} catch {
			toast("Copy is blocked in this view");
		}
	}
	function downloadAll() {
		const blob = new Blob([JSON.stringify(board.map(toPacket), null, 2)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = "fcp-adapter.json";
		link.click();
		URL.revokeObjectURL(url);
	}
	const primaryLabel = !trimmed ? "Make or connect" : exact?.href ? `Connect ${exact.name}` : exact ? "Needs an address" : looksLikeAddress(trimmed) ? "Make FCP and connect" : "Make FCP";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs tracking-wide text-muted uppercase",
					children: "Adapter"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-4xl leading-tight text-fg",
							children: "FCP"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-muted",
							children: "Paste an address to connect it. Name something that does not have one, and this makes the card."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "outline",
						onClick: downloadAll,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {}), "Download the set"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "flex flex-col gap-2 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: query,
					onChange: (event) => setQuery(event.target.value),
					placeholder: "Chabad.org, a new name, or https://…",
					"aria-label": "Name or address",
					autoCapitalize: "off",
					autoCorrect: "off",
					spellCheck: false
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "submit",
					className: "sm:min-w-52",
					disabled: !trimmed || !!exact && !exact.href,
					children: [exact?.href ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), primaryLabel]
				})]
			}),
			ORDER.map((group) => {
				const cards = visible.filter((fcp) => fcp.group === group);
				if (cards.length === 0) return null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "flex flex-col gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-mono text-xs tracking-wide text-muted uppercase",
						children: GROUP_LABEL[group]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 gap-3 md:grid-cols-2",
						children: cards.map((fcp) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "flex flex-col gap-3 rounded-lg bg-elevated p-4 shadow-[var(--shadow-border)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-base font-medium text-fg",
										children: fcp.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-muted",
										children: fcp.note
									})] }), fcp.madeHere ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "ghost",
										size: "icon",
										onClick: () => remove(fcp.id),
										"aria-label": `Remove ${fcp.name}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {})
									}) : null]
								}),
								fcp.href ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate font-mono text-xs text-subtle-fg",
									children: hostOf(fcp.href)
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: `href-${fcp.id}`,
									placeholder: "Paste the address",
									"aria-label": `Address for ${fcp.name}`,
									onBlur: (event) => {
										const next = event.target.value.trim();
										if (!next) return;
										setHref(fcp.id, next.startsWith("http") ? next : `https://${next}`);
									},
									onKeyDown: (event) => {
										if (event.key !== "Enter") return;
										event.preventDefault();
										const next = event.currentTarget.value.trim();
										if (!next) return;
										setHref(fcp.id, next.startsWith("http") ? next : `https://${next}`);
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-auto flex flex-wrap gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "button",
										disabled: !fcp.href || busy === fcp.id,
										onClick: () => void connect(fcp),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {}), busy === fcp.id ? "Connecting" : "Connect"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "button",
										variant: "outline",
										onClick: () => void copyOne(fcp),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {}), "Copy FCP"]
									})]
								}),
								results[fcp.id] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: results[fcp.id].ok ? "text-sm text-keep" : "text-sm text-warn",
									children: results[fcp.id].detail
								}) : null
							]
						}, fcp.id))
					})]
				}, group);
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdapterPage, {});
}
//#endregion
export { Home as component };

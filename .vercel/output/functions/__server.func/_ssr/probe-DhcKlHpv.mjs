import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import { i as string, r as object } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/probe-DhcKlHpv.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function blockedHost(hostname) {
	const host = hostname.replace(/^\[|\]$/g, "").toLowerCase();
	if (host === "localhost" || host.endsWith(".local") || host.endsWith(".internal") || host === "0.0.0.0") return true;
	const v4 = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
	if (!v4) return host === "::1" || host.startsWith("fe80:") || host.startsWith("fc") || host.startsWith("fd");
	const a = Number(v4[1]);
	const b = Number(v4[2]);
	if (a === 10 || a === 127 || a === 0) return true;
	if (a === 169 && b === 254) return true;
	if (a === 172 && b >= 16 && b <= 31) return true;
	if (a === 192 && b === 168) return true;
	return false;
}
var probeFcp_createServerFn_handler = createServerRpc({
	id: "744ab667592050bde647e4b727fe7c91776ee010f7cffb89706b07f28b6f1e73",
	name: "probeFcp",
	filename: "src/lib/probe.ts"
}, (opts) => probeFcp.__executeServer(opts));
var probeFcp = createServerFn({ method: "POST" }).validator(object({ href: string().min(1).max(500) })).handler(probeFcp_createServerFn_handler, async ({ data }) => {
	let url;
	try {
		url = new URL(data.href);
	} catch {
		return {
			ok: false,
			detail: "That is not an address."
		};
	}
	if (url.protocol !== "https:" && url.protocol !== "http:") return {
		ok: false,
		detail: "Only a web address can be connected."
	};
	if (blockedHost(url.hostname)) return {
		ok: false,
		detail: "That address stays off this adapter."
	};
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), 6e3);
	try {
		const response = await fetch(url.toString(), {
			method: "GET",
			redirect: "follow",
			signal: controller.signal,
			headers: { accept: "text/html,application/json;q=0.9,*/*;q=0.8" }
		});
		const ok = response.status > 0 && response.status < 500;
		return {
			ok,
			status: response.status,
			detail: ok ? `Opened. It answered ${response.status}.` : `Opened. It answered ${response.status}.`
		};
	} catch {
		return {
			ok: false,
			detail: "Opened. No answer from this side."
		};
	} finally {
		clearTimeout(timer);
	}
});
//#endregion
export { probeFcp_createServerFn_handler };

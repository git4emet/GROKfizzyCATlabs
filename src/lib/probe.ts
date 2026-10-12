import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type ProbeResult = {
  ok: boolean;
  detail: string;
  status?: number;
};

function blockedHost(hostname: string): boolean {
  const host = hostname.replace(/^\[|\]$/g, "").toLowerCase();
  if (
    host === "localhost" ||
    host.endsWith(".local") ||
    host.endsWith(".internal") ||
    host === "0.0.0.0"
  ) {
    return true;
  }
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

export const probeFcp = createServerFn({ method: "POST" })
  .validator(z.object({ href: z.string().min(1).max(500) }))
  .handler(async ({ data }): Promise<ProbeResult> => {
    let url: URL;
    try {
      url = new URL(data.href);
    } catch {
      return { ok: false, detail: "That is not an address." };
    }
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return { ok: false, detail: "Only a web address can be connected." };
    }
    if (blockedHost(url.hostname)) {
      return { ok: false, detail: "That address stays off this adapter." };
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);
    try {
      const response = await fetch(url.toString(), {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
        headers: { accept: "text/html,application/json;q=0.9,*/*;q=0.8" },
      });
      const ok = response.status > 0 && response.status < 500;
      return {
        ok,
        status: response.status,
        detail: ok ? `Opened. It answered ${response.status}.` : `Opened. It answered ${response.status}.`,
      };
    } catch {
      return { ok: false, detail: "Opened. No answer from this side." };
    } finally {
      clearTimeout(timer);
    }
  });

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** @param {...Parameters<typeof clsx>} inputs */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const isIframe =
  typeof window !== "undefined" && window.self !== window.top;
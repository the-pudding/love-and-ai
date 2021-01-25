import { writable, derived } from "svelte/store";

export const innerWidth = writable(0);
export const innerHeight = writable(0);
export const scrollY = writable(0);
export const bottomOffset = derived(innerHeight, $innerHeight => Math.round($innerHeight * 0.25));
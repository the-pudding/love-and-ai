import { writable, derived } from "svelte/store";

export const windowWidth = writable(0);
export const windowHeight = writable(0);
export const scrollY = writable(0);
export const bottomOffset = derived(windowHeight, $windowHeight => Math.round($windowHeight * 0.25));
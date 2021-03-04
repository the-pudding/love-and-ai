import { derived, writable } from "svelte/store";
import viewport from "./viewport.js";

export const bottomOffset = derived(viewport, $viewport => Math.round($viewport.height * 0.5));
export const animations = writable(true);
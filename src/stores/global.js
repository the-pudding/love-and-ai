import { writable } from "svelte/store";

export const innerWidth = writable(0);
export const innerHeight = writable(0);
export const scrollY = writable(0);
import { writable } from 'svelte/store';

export interface Section {
	id: string;
	text: string;
}

export const currentSection = writable<Section | null>(null);

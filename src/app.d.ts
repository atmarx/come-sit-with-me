// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

// Pagefind is generated at build time
declare module '/pagefind/pagefind.js' {
	export function init(): Promise<void>;
	export function search(query: string): Promise<{
		results: Array<{
			id: string;
			data: () => Promise<{
				url: string;
				excerpt: string;
				meta?: { title?: string };
			}>;
		}>;
	}>;
}

export {};

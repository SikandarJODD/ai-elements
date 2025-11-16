/**
 * OpenRouter API Key Store
 *
 * Global store for managing OpenRouter API key with localStorage persistence.
 * Uses Svelte 5 class-based store pattern.
 *
 * ## Usage
 * ```svelte
 * <script lang="ts">
 *   import { openRouterKeyStore } from "$lib/config/open-router-key.svelte";
 *
 *   let apiKey = $state("");
 *
 *   onMount(() => {
 *     apiKey = openRouterKeyStore.key;
 *   });
 *
 *   function saveKey() {
 *     openRouterKeyStore.key = apiKey;
 *   }
 *
 *   function removeKey() {
 *     openRouterKeyStore.clear();
 *   }
 * </script>
 * ```
 */

const STORAGE_KEY = "openrouter-api-key";

export class OpenRouterKeyStore {
	#key = $state<string>("");
	#initialized = $state<boolean>(false);

	constructor() {
		// Initialize from localStorage on browser
		if (typeof window !== "undefined") {
			this.#initialize();
		}
	}

	#initialize() {
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored) {
				this.#key = stored;
			}
			this.#initialized = true;
		} catch (error) {
			console.error("Failed to initialize OpenRouter API key from localStorage:", error);
			this.#initialized = true;
		}
	}

	/**
	 * Get the current API key
	 */
	get key(): string {
		return this.#key;
	}

	/**
	 * Set and persist the API key to localStorage
	 */
	set key(value: string) {
		this.#key = value;

		if (typeof window !== "undefined") {
			try {
				if (value.trim()) {
					localStorage.setItem(STORAGE_KEY, value.trim());
				} else {
					localStorage.removeItem(STORAGE_KEY);
				}
			} catch (error) {
				console.error("Failed to save OpenRouter API key to localStorage:", error);
			}
		}
	}

	/**
	 * Check if the store has been initialized
	 */
	get initialized(): boolean {
		return this.#initialized;
	}

	/**
	 * Check if a valid API key exists
	 */
	get hasKey(): boolean {
		return this.#key.trim().length > 0;
	}

	/**
	 * Clear the API key from both store and localStorage
	 */
	clear() {
		this.#key = "";

		if (typeof window !== "undefined") {
			try {
				localStorage.removeItem(STORAGE_KEY);
			} catch (error) {
				console.error("Failed to remove OpenRouter API key from localStorage:", error);
			}
		}
	}
}

// Export singleton instance
export const openRouterKeyStore = new OpenRouterKeyStore();

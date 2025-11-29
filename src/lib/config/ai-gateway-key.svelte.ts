/**
 * AI Gateway API Key Store
 *
 * Global store for managing Vercel AI Gateway API key with localStorage persistence.
 * Uses Svelte 5 class-based store pattern.
 * This key is used for OpenAI models (e.g., gpt-5-nano for image generation).
 *
 * ## Usage
 * ```svelte
 * <script lang="ts">
 *   import { aiGatewayKeyStore } from "$lib/config/ai-gateway-key.svelte";
 *
 *   let apiKey = $state("");
 *
 *   onMount(() => {
 *     apiKey = aiGatewayKeyStore.key;
 *   });
 *
 *   function saveKey() {
 *     aiGatewayKeyStore.key = apiKey;
 *   }
 *
 *   function removeKey() {
 *     aiGatewayKeyStore.clear();
 *   }
 * </script>
 * ```
 */

const STORAGE_KEY = "ai-gateway-api-key";

export class AiGatewayKeyStore {
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
			console.error("Failed to initialize AI Gateway API key from localStorage:", error);
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
				console.error("Failed to save AI Gateway API key to localStorage:", error);
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
				console.error("Failed to remove AI Gateway API key from localStorage:", error);
			}
		}
	}
}

// Export singleton instance
export const aiGatewayKeyStore = new AiGatewayKeyStore();

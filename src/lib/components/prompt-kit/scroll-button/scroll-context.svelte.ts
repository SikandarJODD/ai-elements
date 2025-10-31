import { watch } from "runed";
import { setContext, getContext } from "svelte";
import { browser } from "$app/environment";

const SCROLL_CONTEXT_KEY = Symbol("scroll-context");

class ScrollContext {
	#element: HTMLElement | null = $state(null);
	#isAtBottom = $state(true);

	isAtBottom = $derived(this.#isAtBottom);

	constructor() {
		// Only set up watchers in browser environment
		if (browser) {
			watch(
				() => this.#element,
				() => {
					if (this.#element) {
						this.#setupScrollListener();
						return () => this.#cleanup();
					}
				}
			);
		}
	}

	setElement(element: HTMLElement | null) {
		if (browser) {
			this.#element = element;
		}
	}

	scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
		if (!browser || !this.#element) return;

		this.#element.scrollTo({
			top: this.#element.scrollHeight,
			behavior,
		});
	};

	#handleScroll = () => {
		if (!this.#element) return;

		const { scrollTop, scrollHeight, clientHeight } = this.#element;
		const threshold = 50;
		const isAtBottom = scrollTop + clientHeight >= scrollHeight - threshold;

		this.#isAtBottom = isAtBottom;
	};

	#setupScrollListener() {
		if (!this.#element) return;

		this.#element.addEventListener("scroll", this.#handleScroll, {
			passive: true,
		});

		// Initial check
		this.#handleScroll();
	}

	#cleanup() {
		if (this.#element) {
			this.#element.removeEventListener("scroll", this.#handleScroll);
		}
	}
}

export function setScrollContext() {
	const context = new ScrollContext();
	setContext(SCROLL_CONTEXT_KEY, context);
	return context;
}

export function getScrollContext(): ScrollContext {
	const context = getContext<ScrollContext>(SCROLL_CONTEXT_KEY);
	if (!context) {
		throw new Error(
			"ScrollContext not found. Make sure to call setScrollContext() in a parent component."
		);
	}
	return context;
}

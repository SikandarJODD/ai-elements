import { setContext, getContext } from 'svelte';
import { type Snippet } from 'svelte';

const STICK_TO_BOTTOM_CONTEXT_KEY = 'stick-to-bottom-context';

class StickToBottomContext {
	#element: HTMLElement | null = $state(null);
	#isAtBottom = $state(true);
	#resizeObserver: ResizeObserver | null = null;
	#mutationObserver: MutationObserver | null = null;
	#intersectionObserver: IntersectionObserver | null = null;
	#sentinel: HTMLElement | null = null;
	#userHasScrolled = $state(false);

	isAtBottom = $derived(this.#isAtBottom);

	constructor() {
		$effect(() => {
			if (this.#element) {
				this.#setupObservers();
				return () => this.#cleanup();
			}
		});
	}

	setElement(element: HTMLElement) {
		this.#element = element;
	}

	scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
		if (!this.#element) return;

		this.#userHasScrolled = false; // Reset user scroll flag when programmatically scrolling
		this.#element.scrollTo({
			top: this.#element.scrollHeight,
			behavior
		});
	};

	#handleScroll = () => {
		if (!this.#element) return;

		// Detect if user has scrolled up from bottom
		const { scrollTop, scrollHeight, clientHeight } = this.#element;
		const threshold = 50;
		const isAtBottom = scrollTop + clientHeight >= scrollHeight - threshold;

		if (!isAtBottom) {
			this.#userHasScrolled = true;
		} else if (isAtBottom && this.#userHasScrolled) {
			// User scrolled back to bottom, reset flag
			this.#userHasScrolled = false;
		}
	};

	#setupObservers() {
		if (!this.#element) return;

		// Create and position sentinel element
		this.#createSentinel();

		// Setup intersection observer to detect if we're at bottom
		this.#intersectionObserver = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				this.#isAtBottom = entry.isIntersecting;
			},
			{ threshold: 0.1 }
		);

		if (this.#sentinel) {
			this.#intersectionObserver.observe(this.#sentinel);
		}

		// Add scroll event listener to detect user scrolling
		this.#element.addEventListener('scroll', this.#handleScroll, { passive: true });

		// Setup resize observer for smooth scrolling on resize
		this.#resizeObserver = new ResizeObserver(() => {
			if (this.#isAtBottom && !this.#userHasScrolled) {
				this.scrollToBottom('auto');
			}
		});

		this.#resizeObserver.observe(this.#element);

		// Setup mutation observer for smooth scrolling on content changes
		this.#mutationObserver = new MutationObserver(() => {
			// Only auto-scroll if user hasn't manually scrolled and we're at bottom
			if (this.#isAtBottom && !this.#userHasScrolled) {
				// Small delay to ensure DOM has updated
				requestAnimationFrame(() => {
					this.scrollToBottom('smooth');
				});
			}
		});

		this.#mutationObserver.observe(this.#element, {
			childList: true,
			subtree: true,
			characterData: true
		});

		// Check initial state
		this.#checkScrollPosition();
	}

	#createSentinel() {
		if (!this.#element) return;

		this.#sentinel = document.createElement('div');
		this.#sentinel.style.height = '1px';
		this.#sentinel.style.position = 'absolute';
		this.#sentinel.style.bottom = '0';
		this.#sentinel.style.left = '0';
		this.#sentinel.style.right = '0';
		this.#sentinel.style.pointerEvents = 'none';
		this.#sentinel.setAttribute('data-stick-to-bottom-sentinel', '');

		this.#element.appendChild(this.#sentinel);
	}

	#checkScrollPosition() {
		if (!this.#element) return;

		const { scrollTop, scrollHeight, clientHeight } = this.#element;
		const threshold = 50; // Allow some tolerance
		this.#isAtBottom = scrollTop + clientHeight >= scrollHeight - threshold;
	}

	#cleanup() {
		this.#resizeObserver?.disconnect();
		this.#mutationObserver?.disconnect();
		this.#intersectionObserver?.disconnect();

		// Remove scroll event listener
		if (this.#element) {
			this.#element.removeEventListener('scroll', this.#handleScroll);
		}

		if (this.#sentinel && this.#element?.contains(this.#sentinel)) {
			this.#element.removeChild(this.#sentinel);
		}

		this.#resizeObserver = null;
		this.#mutationObserver = null;
		this.#intersectionObserver = null;
		this.#sentinel = null;
	}
}

export function setStickToBottomContext(): StickToBottomContext {
	const context = new StickToBottomContext();
	setContext(STICK_TO_BOTTOM_CONTEXT_KEY, context);
	return context;
}

export function getStickToBottomContext(): StickToBottomContext {
	const context = getContext<StickToBottomContext>(STICK_TO_BOTTOM_CONTEXT_KEY);
	if (!context) {
		throw new Error('StickToBottomContext must be used within a Conversation component');
	}
	return context;
}

export { StickToBottomContext };
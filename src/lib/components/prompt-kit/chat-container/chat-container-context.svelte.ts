import { watch } from "runed";
import { setContext, getContext } from "svelte";

const CHAT_CONTAINER_CONTEXT_KEY = Symbol("chat-container-context");

type ResizeMode = "smooth" | "instant";
type InitialMode = "smooth" | "instant";

class ChatContainerContext {
	#element: HTMLElement | null = $state(null);
	#isAtBottom = $state(true);
	#resizeObserver: ResizeObserver | null = null;
	#mutationObserver: MutationObserver | null = null;
	#intersectionObserver: IntersectionObserver | null = null;
	#sentinel: HTMLElement | null = null;
	#userHasScrolled = $state(false);
	#resizeMode: ResizeMode = "smooth";
	#initialMode: InitialMode = "instant";
	#isInitialized = false;

	isAtBottom = $derived(this.#isAtBottom);

	constructor(resizeMode: ResizeMode = "smooth", initialMode: InitialMode = "instant") {
		this.#resizeMode = resizeMode;
		this.#initialMode = initialMode;

		watch(
			() => this.#element,
			() => {
				if (this.#element) {
					this.#setupObservers();
					return () => this.#cleanup();
				}
			}
		);
	}

	setElement(element: HTMLElement) {
		this.#element = element;
	}

	scrollToBottom = (behavior?: ScrollBehavior) => {
		if (!this.#element) return;

		// Use initial mode for first scroll, then use provided behavior or resize mode
		let scrollBehavior: ScrollBehavior;
		if (!this.#isInitialized) {
			scrollBehavior = this.#initialMode === "instant" ? "instant" : "smooth";
			this.#isInitialized = true;
		} else {
			scrollBehavior = behavior || (this.#resizeMode === "smooth" ? "smooth" : "instant");
		}

		this.#userHasScrolled = false;
		this.#element.scrollTo({
			top: this.#element.scrollHeight,
			behavior: scrollBehavior,
		});
	};

	#handleScroll = () => {
		if (!this.#element) return;

		const { scrollTop, scrollHeight, clientHeight } = this.#element;
		const threshold = 50;
		const isAtBottom = scrollTop + clientHeight >= scrollHeight - threshold;

		this.#isAtBottom = isAtBottom;

		if (!isAtBottom) {
			this.#userHasScrolled = true;
		} else if (isAtBottom && this.#userHasScrolled) {
			this.#userHasScrolled = false;
		}
	};

	#setupObservers() {
		if (!this.#element) return;

		this.#createSentinel();

		this.#intersectionObserver = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				if (entry.isIntersecting && !this.#userHasScrolled) {
					this.#isAtBottom = true;
				}
			},
			{
				threshold: 0,
				root: this.#element,
			}
		);

		if (this.#sentinel) {
			this.#intersectionObserver.observe(this.#sentinel);
		}

		this.#element.addEventListener("scroll", this.#handleScroll, {
			passive: true,
		});

		this.#resizeObserver = new ResizeObserver(() => {
			this.#checkScrollPosition();
			if (this.#isAtBottom && !this.#userHasScrolled) {
				const behavior = this.#resizeMode === "smooth" ? "smooth" : "instant";
				this.scrollToBottom(behavior);
			}
		});

		this.#resizeObserver.observe(this.#element);

		this.#mutationObserver = new MutationObserver(() => {
			requestAnimationFrame(() => {
				const shouldAutoScroll = this.#isAtBottom && !this.#userHasScrolled;
				this.#checkScrollPosition();

				if (shouldAutoScroll) {
					this.scrollToBottom("smooth");
				}
			});
		});

		this.#mutationObserver.observe(this.#element, {
			childList: true,
			subtree: true,
			characterData: true,
		});

		// Initial scroll to bottom
		requestAnimationFrame(() => {
			this.#checkScrollPosition();
			this.scrollToBottom();
		});
	}

	#createSentinel() {
		if (!this.#element) return;

		this.#sentinel = document.createElement("div");
		this.#sentinel.style.height = "1px";
		this.#sentinel.style.width = "100%";
		this.#sentinel.style.pointerEvents = "none";
		this.#sentinel.style.opacity = "0";
		this.#sentinel.setAttribute("data-chat-container-sentinel", "");

		this.#element.appendChild(this.#sentinel);
	}

	#checkScrollPosition() {
		if (!this.#element) return;

		const { scrollTop, scrollHeight, clientHeight } = this.#element;
		const threshold = 50;
		const isAtBottom = scrollTop + clientHeight >= scrollHeight - threshold;

		this.#isAtBottom = isAtBottom;
	}

	#cleanup() {
		this.#resizeObserver?.disconnect();
		this.#mutationObserver?.disconnect();
		this.#intersectionObserver?.disconnect();

		if (this.#element) {
			this.#element.removeEventListener("scroll", this.#handleScroll);
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

export function setChatContainerContext(
	resizeMode: ResizeMode = "smooth",
	initialMode: InitialMode = "instant"
): ChatContainerContext {
	const context = new ChatContainerContext(resizeMode, initialMode);
	setContext(CHAT_CONTAINER_CONTEXT_KEY, context);
	return context;
}

export function getChatContainerContext(): ChatContainerContext {
	const context = getContext<ChatContainerContext>(CHAT_CONTAINER_CONTEXT_KEY);
	if (!context) {
		throw new Error("ChatContainerContext must be used within a ChatContainerRoot component");
	}
	return context;
}

export { ChatContainerContext };
export type { ResizeMode, InitialMode };

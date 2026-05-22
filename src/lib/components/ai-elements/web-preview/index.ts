import WebPreview from "./web-preview.svelte";
import WebPreviewBody from "./web-preview-body.svelte";
import WebPreviewConsole from "./web-preview-console.svelte";
import WebPreviewNavigation from "./web-preview-navigation.svelte";
import WebPreviewNavigationButton from "./web-preview-navigation-button.svelte";
import WebPreviewUrl from "./web-preview-url.svelte";

export {
	WebPreview,
	WebPreviewNavigation,
	WebPreviewNavigationButton,
	WebPreviewUrl,
	WebPreviewBody,
	WebPreviewConsole,
	//
	WebPreview as Root,
	WebPreviewNavigation as Navigation,
	WebPreviewNavigationButton as NavigationButton,
	WebPreviewUrl as Url,
	WebPreviewBody as Body,
	WebPreviewConsole as Console,
};

export {
	WebPreviewContext,
	getWebPreviewContext,
	setWebPreviewContext,
} from "./web-preview-context.svelte.js";
export type { LogEntry, LogLevel } from "./web-preview-context.svelte.js";

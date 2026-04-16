import WebPreview from "./WebPreview.svelte";
import WebPreviewBody from "./WebPreviewBody.svelte";
import WebPreviewConsole from "./WebPreviewConsole.svelte";
import WebPreviewNavigation from "./WebPreviewNavigation.svelte";
import WebPreviewNavigationButton from "./WebPreviewNavigationButton.svelte";
import WebPreviewUrl from "./WebPreviewUrl.svelte";

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

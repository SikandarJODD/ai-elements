import type { ComponentDoc } from "$lib/structure/structure";

export type ComponentPageDocsType = "ai-elements" | "prompt-kit" | "cookbook";

export type ComponentPageDocsInstallation = {
	specifier: string;
	blockname: string;
	isJsrepo: boolean;
};

export type ComponentPageDocsProps = {
	data: ComponentDoc;
	intro?: string;
	llmsTxtUrl: string;
	installation: ComponentPageDocsInstallation;
	type?: ComponentPageDocsType;
	componentName?: string;
	previewClass?: string;
	previewIsCentered?: boolean;
	previewShowRetry?: boolean;
};

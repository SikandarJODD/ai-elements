/**
 * GitHub repository configuration and file paths for prompt-kit and ai-elements components
 * This centralizes all GitHub URLs so they can be easily updated in one place
 */

const GITHUB_REPO_BASE = "https://github.com/SikandarJODD/ai-elements/blob/master";

/**
 * Maps component names to their main implementation file paths in the GitHub repository
 */
export const PROMPT_KIT_GITHUB_PATHS: Record<string, string> = {
	"Chain of Thought": `${GITHUB_REPO_BASE}/src/lib/components/prompt-kit/chain-of-thought`,
	"Chat Container": `${GITHUB_REPO_BASE}/src/lib/components/prompt-kit/chat-container`,
	"Code Block": `${GITHUB_REPO_BASE}/src/lib/components/prompt-kit/code-block`,
	"File Upload": `${GITHUB_REPO_BASE}/src/lib/components/prompt-kit/file-upload`,
	Image: `${GITHUB_REPO_BASE}/src/lib/components/prompt-kit/image`,
	Loader: `${GITHUB_REPO_BASE}/src/lib/components/prompt-kit/loader`,
	Markdown: `${GITHUB_REPO_BASE}/src/lib/components/prompt-kit/markdown`,
	Message: `${GITHUB_REPO_BASE}/src/lib/components/prompt-kit/message`,
	"Prompt Input": `${GITHUB_REPO_BASE}/src/lib/components/prompt-kit/prompt-input`,
	"Prompt Suggestion": `${GITHUB_REPO_BASE}/src/lib/components/prompt-kit/prompt-suggestion`,
	Reasoning: `${GITHUB_REPO_BASE}/src/lib/components/prompt-kit/reasoning`,
	"Scroll Button": `${GITHUB_REPO_BASE}/src/lib/components/prompt-kit/scroll-button`,
	Source: `${GITHUB_REPO_BASE}/src/lib/components/prompt-kit/source`,
	Steps: `${GITHUB_REPO_BASE}/src/lib/components/prompt-kit/steps`,
	"System Message": `${GITHUB_REPO_BASE}/src/lib/components/prompt-kit/system-message`,
	Tool: `${GITHUB_REPO_BASE}/src/lib/components/prompt-kit/tool`,
};

/**
 * Maps AI Elements component names to their main implementation file paths in the GitHub repository
 */
export const AI_ELEMENTS_GITHUB_PATHS: Record<string, string> = {
	Actions: `${GITHUB_REPO_BASE}/src/lib/components/ai-elements/action`,
	Artifact: `${GITHUB_REPO_BASE}/src/lib/components/ai-elements/artifact`,
	Branch: `${GITHUB_REPO_BASE}/src/lib/components/ai-elements/branch`,
	"Chain of Thought": `${GITHUB_REPO_BASE}/src/lib/components/ai-elements/chain-of-thought`,
	Code: `${GITHUB_REPO_BASE}/src/lib/components/ai-elements/code`,
	Context: `${GITHUB_REPO_BASE}/src/lib/components/ai-elements/context`,
	Conversation: `${GITHUB_REPO_BASE}/src/lib/components/ai-elements/conversation`,
	Image: `${GITHUB_REPO_BASE}/src/lib/components/ai-elements/image`,
	"Inline Citation": `${GITHUB_REPO_BASE}/src/lib/components/ai-elements/inline-citation`,
	Loader: `${GITHUB_REPO_BASE}/src/lib/components/ai-elements/loader`,
	Message: `${GITHUB_REPO_BASE}/src/lib/components/ai-elements/message`,
	"Open In Chat": `${GITHUB_REPO_BASE}/src/lib/components/ai-elements/open-in-chat`,
	"Prompt Input": `${GITHUB_REPO_BASE}/src/lib/components/ai-elements/prompt-input`,
	Reasoning: `${GITHUB_REPO_BASE}/src/lib/components/ai-elements/reasoning`,
	Response: `${GITHUB_REPO_BASE}/src/lib/components/ai-elements/response`,
	Sources: `${GITHUB_REPO_BASE}/src/lib/components/ai-elements/sources`,
	Suggestion: `${GITHUB_REPO_BASE}/src/lib/components/ai-elements/suggestion`,
	Task: `${GITHUB_REPO_BASE}/src/lib/components/ai-elements/task`,
	Tool: `${GITHUB_REPO_BASE}/src/lib/components/ai-elements/tool`,
	"Web Preview": `${GITHUB_REPO_BASE}/src/lib/components/ai-elements/web-preview`,
};

/**
 * Get the GitHub URL for a prompt-kit component
 * @param componentName - The name of the component (e.g., "Prompt Input")
 * @returns The GitHub URL for the component, or undefined if not found
 */
export function getPromptKitGithubUrl(componentName: string): string | undefined {
	return PROMPT_KIT_GITHUB_PATHS[componentName];
}

/**
 * Get the GitHub URL for an AI Elements component
 * @param componentName - The name of the component (e.g., "Prompt Input")
 * @returns The GitHub URL for the component, or undefined if not found
 */
export function getAiElementsGithubUrl(componentName: string): string | undefined {
	return AI_ELEMENTS_GITHUB_PATHS[componentName];
}

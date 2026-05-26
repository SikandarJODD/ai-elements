const GITHUB_REPO_BASE = "https://github.com/SikandarJODD/ai-elements/blob/master";

export const AI_ELEMENTS_GITHUB_PATHS: Record<string, string> = {
	Actions: `${GITHUB_REPO_BASE}/src/lib/components/ai-elements/action`,
	Artifact: `${GITHUB_REPO_BASE}/src/lib/components/ai-elements/artifact`,
	Branch: `${GITHUB_REPO_BASE}/src/lib/components/ai-elements/branch`,
	"Chain of Thought": `${GITHUB_REPO_BASE}/src/lib/components/ai-elements/chain-of-thought`,
	Checkpoint: `${GITHUB_REPO_BASE}/src/lib/components/ai-elements/checkpoint`,
	Code: `${GITHUB_REPO_BASE}/src/lib/components/ai-elements/code`,
	Confirmation: `${GITHUB_REPO_BASE}/src/lib/components/ai-elements/confirmation`,
	Context: `${GITHUB_REPO_BASE}/src/lib/components/ai-elements/context`,
	Conversation: `${GITHUB_REPO_BASE}/src/lib/components/ai-elements/conversation`,
	Image: `${GITHUB_REPO_BASE}/src/lib/components/ai-elements/image`,
	"Inline Citation": `${GITHUB_REPO_BASE}/src/lib/components/ai-elements/inline-citation`,
	Loader: `${GITHUB_REPO_BASE}/src/lib/components/ai-elements/loader`,
	Message: `${GITHUB_REPO_BASE}/src/lib/components/ai-elements/message`,
	"Model Selector": `${GITHUB_REPO_BASE}/src/lib/components/ai-elements/model-selector`,
	"Open In Chat": `${GITHUB_REPO_BASE}/src/lib/components/ai-elements/open-in-chat`,
	Plan: `${GITHUB_REPO_BASE}/src/lib/components/ai-elements/plan`,
	"Prompt Input": `${GITHUB_REPO_BASE}/src/lib/components/ai-elements/prompt-input`,
	Queue: `${GITHUB_REPO_BASE}/src/lib/components/ai-elements/queue`,
	Reasoning: `${GITHUB_REPO_BASE}/src/lib/components/ai-elements/reasoning`,
	Response: `${GITHUB_REPO_BASE}/src/lib/components/ai-elements/response`,
	Sources: `${GITHUB_REPO_BASE}/src/lib/components/ai-elements/sources`,
	Suggestion: `${GITHUB_REPO_BASE}/src/lib/components/ai-elements/suggestion`,
	Task: `${GITHUB_REPO_BASE}/src/lib/components/ai-elements/task`,
	Tool: `${GITHUB_REPO_BASE}/src/lib/components/ai-elements/tool`,
	"Web Preview": `${GITHUB_REPO_BASE}/src/lib/components/ai-elements/web-preview`,
};


export function getAiElementsGithubUrl(componentName: string): string | undefined {
	return AI_ELEMENTS_GITHUB_PATHS[componentName];
}

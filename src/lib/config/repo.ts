type GitHubRepo = {
	owner: string;
	url: string;
	name: string;
	fallback_stars: number;
};
type JsRepo = {
	name: string;
	url: string;
};

export let github_repo: GitHubRepo = {
	owner: "SikandarJODD",
	url: "https://github.com/SikandarJODD/ai-elements",
	name: "ai-elements",
	fallback_stars: 0,
};

export let jsrepo: JsRepo = {
	name: "@ai/blocks",
	url: "https://www.jsrepo.com/@ai/blocks",
};

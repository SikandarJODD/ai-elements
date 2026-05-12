import { aiElementsData } from "./ai-elements-data";
import { recipes } from "./cookbook-data";
import { promptKitData } from "./prompt-kit-data";

export type NavigationCategory = "component" | "guide" | "docs" | "cookbook";
export type NavigationSource = "ai-elements" | "prompt-kit" | "cookbook";
export type NavigationSection =
	| "docs"
	| "components"
	| "workflow"
	| "guides"
	| "primitives"
	| "blocks"
	| "recipes";

export interface NavigationItem {
	title: string;
	href: string;
	description?: string;
	category: NavigationCategory;
	source: NavigationSource;
	section: NavigationSection;
	keywords?: string[];
	icon?: string;
}

const sourceKeywords: Record<NavigationSource, string[]> = {
	"ai-elements": ["ai", "elements", "svelte ai elements"],
	"prompt-kit": ["prompt", "kit", "prompt kit"],
	cookbook: ["cookbook", "recipe", "recipes"],
};

const sectionKeywords: Record<NavigationSection, string[]> = {
	docs: ["docs", "documentation", "getting started"],
	components: ["component", "components", "ui"],
	workflow: ["workflow", "flow", "diagram"],
	guides: ["guide", "guides", "tutorial"],
	primitives: ["primitives", "building blocks"],
	blocks: ["blocks", "layouts", "templates"],
	recipes: ["recipe", "example", "tutorial"],
};

function toKeywords(
	source: NavigationSource,
	section: NavigationSection,
	value: string,
	extra: string[] = []
): string[] {
	return [
		...sourceKeywords[source],
		...sectionKeywords[section],
		...value
			.toLowerCase()
			.split(/[^a-z0-9]+/)
			.filter(Boolean),
		...extra.map((item) => item.toLowerCase()),
	];
}

const aiDocs = aiElementsData
	.filter((item) => item.category === "docs")
	.map<NavigationItem>((item) => ({
		title: item.name,
		href: item.href,
		description: item.description,
		category: "docs",
		source: "ai-elements",
		section: "docs",
		keywords: toKeywords("ai-elements", "docs", `${item.name} ${item.description}`),
	}));

const aiComponents = aiElementsData
	.filter((item) => item.category === "components" || item.category === "workflow")
	.map<NavigationItem>((item) => ({
		title: item.name,
		href: item.href,
		description: item.description,
		category: "component",
		source: "ai-elements",
		section: item.category === "workflow" ? "workflow" : "components",
		keywords: toKeywords(
			"ai-elements",
			item.category === "workflow" ? "workflow" : "components",
			`${item.name} ${item.description}`
		),
	}));

const aiGuides = aiElementsData
	.filter((item) => item.category === "guides")
	.map<NavigationItem>((item) => ({
		title: item.name,
		href: item.href,
		description: item.description,
		category: "guide",
		source: "ai-elements",
		section: "guides",
		keywords: toKeywords("ai-elements", "guides", `${item.name} ${item.description}`),
	}));

const promptKitNavigation = promptKitData.map<NavigationItem>((item) => ({
	title: item.name,
	href: item.href,
	description: item.description,
	category: item.category === "docs" ? "docs" : "component",
	source: "prompt-kit",
	section: item.category,
	keywords: toKeywords("prompt-kit", item.category, `${item.name} ${item.description}`),
}));

const cookbookNavigation = recipes.map<NavigationItem>((recipe) => ({
	title: recipe.name,
	href: `/cookbook/${recipe.slug}`,
	description: recipe.description,
	category: "cookbook",
	source: "cookbook",
	section: "recipes",
	keywords: toKeywords(
		"cookbook",
		"recipes",
		`${recipe.name} ${recipe.description} ${recipe.tags.join(" ")}`,
		recipe.tags
	),
}));

export const navigationData: NavigationItem[] = [
	...aiDocs,
	...cookbookNavigation,
	...aiComponents,
	...aiGuides,
	...promptKitNavigation,
];

export function searchNavigation(query: string): NavigationItem[] {
	const lowercaseQuery = query.toLowerCase().trim();

	if (!lowercaseQuery) {
		return [];
	}

	return navigationData
		.filter((item) => {
			const titleMatch = item.title.toLowerCase().includes(lowercaseQuery);
			const descriptionMatch = item.description?.toLowerCase().includes(lowercaseQuery);
			const keywordMatch = item.keywords?.some((keyword) =>
				keyword.toLowerCase().includes(lowercaseQuery)
			);

			return titleMatch || descriptionMatch || keywordMatch;
		})
		.sort((a, b) => {
			const aTitleMatch = a.title.toLowerCase().includes(lowercaseQuery);
			const bTitleMatch = b.title.toLowerCase().includes(lowercaseQuery);

			if (aTitleMatch && !bTitleMatch) return -1;
			if (!aTitleMatch && bTitleMatch) return 1;

			return 0;
		});
}

export function getNavigationByCategory(category: NavigationCategory): NavigationItem[] {
	return navigationData.filter((item) => item.category === category);
}

export function getNavigationBySource(source: NavigationSource): NavigationItem[] {
	return navigationData.filter((item) => item.source === source);
}

export function getNavigationGroups() {
	return {
		docs: aiDocs,
		aiElements: aiComponents,
		promptKit: promptKitNavigation,
		cookbook: cookbookNavigation,
		guides: aiGuides,
		components: getNavigationByCategory("component"),
	};
}

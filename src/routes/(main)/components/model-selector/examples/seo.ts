import { PUBLIC_WEBSITE_URL } from "$env/static/public";

export const seo = {
	title: "Model Selector - AI Elements",
	description:
		"A searchable command palette for selecting AI models with provider logos and multi-provider support.",
	canonical: `${PUBLIC_WEBSITE_URL}/components/model-selector`,
	openGraph: {
		title: "Model Selector - AI Elements",
		description:
			"A searchable command palette for selecting AI models with provider logos and multi-provider support.",
		url: `${PUBLIC_WEBSITE_URL}/components/model-selector`,
		type: "website",
		images: [
			{
				url: `${PUBLIC_WEBSITE_URL}/og-image.png`,
				width: 1200,
				height: 630,
				alt: "Model Selector Component - AI Elements",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Model Selector - AI Elements",
		description:
			"A searchable command palette for selecting AI models with provider logos and multi-provider support.",
		image: `${PUBLIC_WEBSITE_URL}/og-image.png`,
	},
};

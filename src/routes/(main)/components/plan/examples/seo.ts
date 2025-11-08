import { PUBLIC_WEBSITE_URL } from "$env/static/public";

export const seo = {
	title: "Plan - AI Elements",
	description:
		"A collapsible plan component for displaying AI-generated execution plans with streaming support and shimmer animations.",
	canonical: `${PUBLIC_WEBSITE_URL}/components/plan`,
	openGraph: {
		title: "Plan - AI Elements",
		description:
			"A collapsible plan component for displaying AI-generated execution plans with streaming support and shimmer animations.",
		url: `${PUBLIC_WEBSITE_URL}/components/plan`,
		type: "website",
		images: [
			{
				url: `${PUBLIC_WEBSITE_URL}/og-image.png`,
				width: 1200,
				height: 630,
				alt: "Plan Component - AI Elements",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Plan - AI Elements",
		description:
			"A collapsible plan component for displaying AI-generated execution plans with streaming support and shimmer animations.",
		image: `${PUBLIC_WEBSITE_URL}/og-image.png`,
	},
};

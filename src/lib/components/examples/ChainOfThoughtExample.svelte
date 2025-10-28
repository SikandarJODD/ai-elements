<script lang="ts">
	import {
		ChainOfThought,
		ChainOfThoughtContent,
		ChainOfThoughtHeader,
		ChainOfThoughtImage,
		ChainOfThoughtSearchResult,
		ChainOfThoughtSearchResults,
		ChainOfThoughtStep,
	} from "$lib/components/ai-elements/chain-of-thought/index.js";
	import SearchIcon from "@lucide/svelte/icons/search";
	import ImageIcon from "@lucide/svelte/icons/image";

	let exampleImage = "https://i.pinimg.com/736x/75/f1/8f/75f18f979262c802ed8e36b3c4f2ff4f.jpg";

	let websites1 = ["https://www.x.com", "https://www.instagram.com", "https://www.github.com"];

	let websites2 = ["https://www.github.com", "https://www.dribbble.com"];
</script>

<ChainOfThought defaultOpen>
	<ChainOfThoughtHeader />
	<ChainOfThoughtContent>
		<ChainOfThoughtStep
			icon={SearchIcon}
			label="Searching for profiles for Hayden Bleasel"
			status="complete"
		>
			<ChainOfThoughtSearchResults>
				{#each websites1 as website (website)}
					<ChainOfThoughtSearchResult>
						{new URL(website).hostname}
					</ChainOfThoughtSearchResult>
				{/each}
			</ChainOfThoughtSearchResults>
		</ChainOfThoughtStep>

		<ChainOfThoughtStep
			icon={ImageIcon}
			label="Found the profile photo for Hayden Bleasel"
			status="complete"
		>
			<ChainOfThoughtImage
				caption="Hayden Bleasel's profile photo from x.com, showing a Ghibli-style man."
			>
				<!-- svelte-ignore a11y_img_redundant_alt -->
				<img
					src={exampleImage}
					alt="Example generated image"
					class="aspect-square h-[150px] border"
				/>
			</ChainOfThoughtImage>
		</ChainOfThoughtStep>

		<ChainOfThoughtStep
			label="Hayden Bleasel is an Australian product designer, software engineer, and founder. He is currently based in the United States working for Vercel, an American cloud application company."
			status="complete"
		/>

		<ChainOfThoughtStep icon={SearchIcon} label="Searching for recent work..." status="active">
			<ChainOfThoughtSearchResults>
				{#each websites2 as website (website)}
					<ChainOfThoughtSearchResult>
						{new URL(website).hostname}
					</ChainOfThoughtSearchResult>
				{/each}
			</ChainOfThoughtSearchResults>
		</ChainOfThoughtStep>
	</ChainOfThoughtContent>
</ChainOfThought>

<script lang="ts">
	import * as ChainOfThought from "$lib/components/ai-elements/chain-of-thought";
	import SearchIcon from "@lucide/svelte/icons/search";
	import ImageIcon from "@lucide/svelte/icons/image";

	const exampleImage = "https://i.pinimg.com/736x/75/f1/8f/75f18f979262c802ed8e36b3c4f2ff4f.jpg";

	const websites1 = ["https://www.x.com", "https://www.instagram.com", "https://www.github.com"];

	const websites2 = ["https://www.github.com", "https://www.dribbble.com"];
</script>

<ChainOfThought.Root defaultOpen>
	<ChainOfThought.Header />
	<ChainOfThought.Content>
		<ChainOfThought.Step
			icon={SearchIcon}
			label="Searching for profiles for Bhide Svelte"
			status="complete"
		>
			<ChainOfThought.SearchResults>
				{#each websites1 as website (website)}
					<ChainOfThought.SearchResult>
						{new URL(website).hostname}
					</ChainOfThought.SearchResult>
				{/each}
			</ChainOfThought.SearchResults>
		</ChainOfThought.Step>

		<ChainOfThought.Step
			icon={ImageIcon}
			label="Found the profile photo for Bhide Svelte"
			status="complete"
		>
			<ChainOfThought.Image
				caption="Bhide Svelte's profile photo from x.com, showing a Ghibli-style man."
			>
				<!-- svelte-ignore a11y_img_redundant_alt -->
				<img
					src={exampleImage}
					alt="Example generated image"
					class="aspect-square h-[150px] border"
				/>
			</ChainOfThought.Image>
		</ChainOfThought.Step>

		<ChainOfThought.Step
			label="Bhide Svelte is Indian Software Engineer, currently working on Svelte Open Source Projects. He is passionate about building tools and libraries that empower developers to create amazing web applications."
			status="complete"
		/>

		<ChainOfThought.Step icon={SearchIcon} label="Searching for recent work..." status="active">
			<ChainOfThought.SearchResults>
				{#each websites2 as website (website)}
					<ChainOfThought.SearchResult>
						{new URL(website).hostname}
					</ChainOfThought.SearchResult>
				{/each}
			</ChainOfThought.SearchResults>
		</ChainOfThought.Step>
	</ChainOfThought.Content>
</ChainOfThought.Root>

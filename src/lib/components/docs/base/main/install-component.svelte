<script lang="ts" module>
	export type TailwindConfig = {
		code: CodeBlock | undefined;
	};

	export type InstallComponentProps = {
		installUrl: string;
		tailwindConfig?: TailwindConfig;
		codeBlocks?: CodeBlock[] | CodeBlock;
		class?: string;
		folderStructure?: string;
		packages?: string[];
		install?: InstallComponentDocs; // new props which covers everything like fodler structure, codeblock, tailwind stuff - will made it easy for future
		jsrepoID?: string;
	};
</script>

<script lang="ts">
	import { cn } from "$lib/utils";
	import * as Tabs from "$lib/components/ui/tabs";
	import type { CodeBlock } from "$lib/types/code";
	import { Steps, Step } from "$markdown";
	import { MultipleSelectFiles, SingleFile } from "$lib/components/ui/code";
	import { PMCommand } from "$lib/components/ui/pm-command";
	import { PersistedState } from "runed";
	import type { Agent } from "package-manager-detector";
	import { createLayoutMotion, STOP_UPDATE, MotionConfig } from "motion-sv";
	import { jsrepo } from "$lib/config/repo";
	import { page } from "$app/state";
	import type { InstallComponentDocs } from "$lib/types/structure";

	let {
		installUrl,
		tailwindConfig,
		codeBlocks = [],
		class: className,
		folderStructure = "",
		packages = [],
		jsrepoID = "",
		install
	}: InstallComponentProps = $props();

	let activeTab = $state("cli");
	let agent = new PersistedState<Agent>("user-package-manager", "pnpm");

	let layout = createLayoutMotion();
	let updateActiveTab = layout.update.with((tab: string) => {
		if (tab === activeTab) return STOP_UPDATE;
		activeTab = tab;
	});

	let jsrepoURL = $derived.by(() => {
		if (jsrepoID) {
			return jsrepo.name + jsrepoID;
		} else {
			let pathname = page.url.pathname.split("/");
			return jsrepo.name + "/" + pathname[pathname.length - 1];
		}
	});
</script>

<div class={cn("w-full", className)}>
	<Tabs.Root value={activeTab} onValueChange={updateActiveTab}>
		<MotionConfig transition={{ type: "tween", bounce: 0, duration: 0.8 }}>
			<Tabs.List
				class="relative h-auto gap-1 rounded-none bg-transparent px-0 text-foreground"
			>
				<layout.div>
					<Tabs.Trigger
						value="cli"
						class="relative border-none bg-transparent! px-4 py-1.5 shadow-none! after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5"
					>
						CLI
						{#if activeTab === "cli"}
							<layout.span
								class="absolute inset-0 -z-10 rounded-md bg-neutral-200/50 dark:bg-primary/10"
								layoutId="install-tab-highlight"
								transition={{ duration: 0.2, type: "tween" }}
							></layout.span>
						{/if}
					</Tabs.Trigger>
				</layout.div>

				<layout.div>
					<Tabs.Trigger
						value="manual"
						class="relative border-none bg-transparent! px-4 py-1.5 shadow-none! after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5"
					>
						Manual
						{#if activeTab === "manual"}
							<layout.span
								class="absolute inset-0 -z-10 rounded-md bg-neutral-200/50 dark:bg-primary/10"
								layoutId="install-tab-highlight"
								transition={{ duration: 0.2, type: "tween" }}
							></layout.span>
						{/if}
					</Tabs.Trigger>
				</layout.div>
				<!-- <layout.div>
					<Tabs.Trigger
						value="jsrepo"
						class="relative border-none bg-transparent! px-4 py-1.5 shadow-none! after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:text-amber-600 dark:hover:text-amber-300 data-active:text-amber-600 dark:data-active:text-amber-300"
					>
						jsrepo
						{#if activeTab === "jsrepo"}
							<layout.span
								class="absolute inset-0 -z-10 rounded-md bg-amber-300/30 dark:bg-amber-300/15"
								layoutId="install-tab-highlight"
								transition={{ duration: 0.2, type: "tween" }}
							></layout.span>
						{/if}
					</Tabs.Trigger>
				</layout.div> -->
			</Tabs.List>
		</MotionConfig>

		<Tabs.Content value="cli" class="mt-0">
			<PMCommand
				command="execute"
				args={["shadcn-svelte@latest", "add", installUrl]}
				bind:agent={agent.current}
			/>
		</Tabs.Content>

		<Tabs.Content value="jsrepo" class="mt-0">
			<PMCommand
				command="execute"
				args={["jsrepo", "add", jsrepoURL]}
				bind:agent={agent.current}
			/>
		</Tabs.Content>

		<Tabs.Content value="manual" class="mt-2 ml-2" data-toc-ignore="true">
			<Steps>
				{#if packages.length > 0}
					<Step title="Install dependencies">
						<p class="mb-4">
							Install the required packages for this component:
						</p>
						<PMCommand
							command="add"
							args={packages}
							bind:agent={agent.current}
						/>
					</Step>
				{/if}
				{#if install && install.shadcn_components && install.shadcn_components.length > 0}
					<Step title="Install shadcn-svelte components">
						<p class="mb-4">
							Install the required shadcn-svelte components for this component:
						</p>
						<PMCommand
							command="execute"
							args={[
								"shadcn-svelte@latest",
								"add",
								...install.shadcn_components
							]}
							bind:agent={agent.current}
						/>
					</Step>
				{/if}

				<!-- Folder Structure -->
				<!-- 
				{#if folderStructure}
					<Step title="Folder Structure">
						<div class="mt-2">
							<SingleFile
								code={{
									name: "Folder Structure",
									code: folderStructure,
									lang: "bash",
									hideLines: true
								}}
							/>
						</div>
					</Step>
				{/if} -->

				{#if codeBlocks}
					<Step title="Copy the Source Code" titleBaseClass="mb-0">
						<p class="mb-4 text-sm">
							Copy and paste the following code into your project:
						</p>
						<div class="space-y-4">
							{#if Array.isArray(codeBlocks)}
								<!-- {#each codeBlocks as codeBlock}
									<SingleFile code={codeBlock} />
								{/each} -->
								<!-- <MultipleFiles code={codeBlocks} /> -->
								<MultipleSelectFiles
									code={codeBlocks}
									{folderStructure}
								/>
							{:else}
								<SingleFile code={codeBlocks} />
							{/if}
						</div>
					</Step>
				{/if}

				<!-- Tailwind CSS Configuration -->
				{#if tailwindConfig?.code}
					<Step title="Add Tailwind CSS">
						<p class="mb-4">
							Add the following to your <code
								class="rounded bg-muted px-1.5 py-0.5 text-sm"
								>routes/layout.css</code
							> file:
						</p>
						<SingleFile code={tailwindConfig.code} />
					</Step>
				{/if}
			</Steps>
		</Tabs.Content>
	</Tabs.Root>
</div>

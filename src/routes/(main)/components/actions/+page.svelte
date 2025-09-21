<script lang="ts">
  import { MetaTags } from "svelte-meta-tags";
  import { Subheading } from "$lib/components/docs";
  // import Installation from '$lib/components/installation.svelte';
  import Playground from "$lib/components/docs/playground.svelte";
  import Code from "$lib/components/docs/code.svelte";
  import { examples } from "./examples";
  import { seo } from "./seo";

</script>

<MetaTags {...seo} />

<Playground code={examples.basic.code}>
  <examples.basic.Component />
</Playground>
<!-- <Installation specifier="ui/avatar-group" /> -->
<Subheading>Usage</Subheading>
<div>
  <Code
    lang="svelte"
    code={`\<script lang="ts"\>
	import * as AvatarGroup from '$lib/components/ui/avatar-group';
\<\/script\>

<AvatarGroup.Root>
	{#each members.slice(0, 3) as member}
		<AvatarGroup.Member>
			<AvatarGroup.MemberImage/>
			<AvatarGroup.MemberFallback>CN</AvatarGroup.MemberFallback>
		</AvatarGroup.Member>
	{/each}
	<Avatar.Etc plus={members.length - 3}/>
</AvatarGroup.Root>`}
  />
</div>

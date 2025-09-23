<script lang="ts">
  import {
    Source,
    Sources,
    SourcesContent,
    SourcesTrigger,
  } from "$lib/components/ai-elements/sources";

  let sources = [
    { href: "https://stripe.com/docs/api", title: "Stripe API Documentation" },
    { href: "https://docs.github.com/en/rest", title: "GitHub REST API" },
    {
      href: "https://docs.aws.amazon.com/sdk-for-javascript/",
      title: "AWS SDK for JavaScript",
    },
  ];
</script>

<div style="height: 110px;">
  <Sources>
    <SourcesTrigger count={sources.length} />
    <SourcesContent>
      {#each sources as source (source.href)}
        <Source href={source.href} title={source.title} />
      {/each}
    </SourcesContent>
  </Sources>
</div>

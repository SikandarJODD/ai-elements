<script lang="ts">
  import { MetaTags } from "svelte-meta-tags";
  import * as Card from "$lib/components/ui/card";
  import { Button } from "$lib/components/ui/button";
  import { guidesData } from "$lib/config/guides-data";
</script>

<MetaTags
  title="Guides - Svelte AI Elements"
  description="Step-by-step guides to help you build AI-powered applications with Svelte AI Elements. Learn best practices, integration patterns, and real-world examples."
  keywords={[
    "Svelte AI guides",
    "AI tutorials",
    "Svelte AI Elements",
    "AI integration",
    "step-by-step guides",
  ]}
  canonical="https://svelte-ai-elements.vercel.app/guides"
  openGraph={{
    type: "website",
    title: "Guides - Svelte AI Elements",
    description:
      "Step-by-step guides to help you build AI-powered applications with Svelte AI Elements.",
    url: "https://svelte-ai-elements.vercel.app/guides",
    siteName: "Svelte AI Elements",
  }}
/>

<div class="w-full max-w-7xl mx-auto py-12 space-y-12">
  <!-- Header -->
  <div class="space-y-4 text-center max-w-3xl mx-auto">
    <h1 class="text-4xl md:text-5xl font-bold tracking-tight">
      Guides & Tutorials
    </h1>
    <p class="text-lg text-muted-foreground">
      Step-by-step guides to help you build amazing AI-powered applications with
      Svelte AI Elements. Learn best practices, integration patterns, and
      real-world examples.
    </p>
  </div>

  <!-- Guides Grid -->
  <div
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
  >
    {#each guidesData as guide}
      <Card.Root
        class="flex flex-col h-full hover:shadow-lg transition-shadow overflow-hidden p-0"
      >
        <!-- Guide Image -->
        <!-- <div class="aspect-video w-full bg-muted relative">
          <img
            src={guide.image}
            alt={guide.title}
            class="w-full h-full object-cover"
          />
        </div> -->

        <!-- Guide Content -->
        <div class="flex-1 flex flex-col p-4 space-y-3">
          <div class="flex-1 space-y-2">
            <h3 class="font-semibold text-xl line-clamp-2">
              {guide.title}
            </h3>
            <p class="text-sm text-muted-foreground line-clamp-3">
              {guide.description}
            </p>
          </div>

          <!-- Tags -->
          {#if guide.tags && guide.tags.length > 0}
            <div class="flex flex-wrap gap-1.5">
              {#each guide.tags.slice(0, 4) as tag}
                <span
                  class="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
                >
                  {tag}
                </span>
              {/each}
            </div>
          {/if}

          <!-- Action Buttons -->
          <div class="flex gap-2 pt-2 justify-end">
            <Button
              href="/guides/{guide.slug}"
              class="flex-1 [&_svg:not([class*='size-'])]:size-[20px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                ><g fill="none" stroke="currentColor" stroke-width="1.2"
                  ><path
                    d="M3 10c0-3.771 0-5.657 1.172-6.828S7.229 2 11 2h2c3.771 0 5.657 0 6.828 1.172S21 6.229 21 10v4c0 3.771 0 5.657-1.172 6.828S16.771 22 13 22h-2c-3.771 0-5.657 0-6.828-1.172S3 17.771 3 14z"
                  /><path stroke-linecap="round" d="M8 10h8m-8 4h5" /></g
                ></svg
              >
              Read</Button
            >
            {#if guide.demoUrl}
              <Button
                href={guide.demoUrl}
                variant="secondary"
                class="flex-1 [&_svg:not([class*='size-'])]:size-[20px] "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  ><!-- Icon from Solar by 480 Design - https://creativecommons.org/licenses/by/4.0/ --><g
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.2"
                    ><path
                      stroke-linecap="round"
                      d="m15.5 9l.172.172c1.333 1.333 2 2 2 2.828s-.667 1.495-2 2.828L15.5 15m-2.206-7.83L12 12l-1.294 4.83M8.5 9l-.171.172c-1.334 1.333-2 2-2 2.828s.666 1.495 2 2.828L8.5 15"
                    /><path
                      d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2s7.071 0 8.535 1.464C22 4.93 22 7.286 22 12s0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Z"
                    /></g
                  ></svg
                >
                Live Demo
              </Button>
            {/if}
          </div>
        </div>
      </Card.Root>
    {/each}
  </div>

  <!-- Empty State (if no guides) -->
  {#if guidesData.length === 0}
    <div class="text-center py-12 space-y-4">
      <div class="text-6xl">📚</div>
      <h2 class="text-2xl font-semibold">More guides coming soon!</h2>
      <p class="text-muted-foreground">
        We're working on creating comprehensive guides to help you build amazing
        AI applications.
      </p>
    </div>
  {/if}
</div>

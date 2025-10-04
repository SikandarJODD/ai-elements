<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import InfoIcon from "@lucide/svelte/icons/info";
  import BookOpenIcon from "@lucide/svelte/icons/book-open";
</script>

<div
  class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6 my-8"
>
  <div class="flex items-start gap-4">
    <div class="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg shrink-0">
      <InfoIcon
        strokeWidth={1.6}
        class="size-6 text-blue-600 dark:text-blue-400"
      />
    </div>
    <div class="flex-1">
      <h3
        class="text-lg font-semibold mb-2 text-blue-900 dark:text-blue-100"
        data-toc-index={false}
      >
        Prerequisites Required
      </h3>
      <p class="text-sm text-blue-800 dark:text-blue-200 mb-4 leading-relaxed">
        This guide assumes you've completed the <strong>Basic Setup</strong>. If
        you haven't set up your environment yet, please complete the basic setup
        first:
      </p>
      <ul
        class="text-sm text-blue-800 dark:text-blue-200 space-y-2 mb-4 list-disc pl-5"
      >
        <li>SvelteKit project with TypeScript and Tailwind CSS</li>
        <li>shadcn-svelte UI components configured</li>
        <li>OpenRouter API key and AI SDK installed</li>
        <li>AI configuration file created</li>
      </ul>
      <Button
        href="/guides/basic-setup"
        variant="default"
        size="sm"
        class="bg-blue-600 hover:bg-blue-700 text-white"
      >
        <BookOpenIcon class="mr-2 size-4" />
        View Basic Setup Guide
      </Button>
    </div>
  </div>
</div>

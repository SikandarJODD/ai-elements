# Basic Setup Guide - Usage Documentation

## Overview

The **Basic Setup Guide** is a foundational, reusable guide that covers all the essential setup steps needed to start building with Svelte AI Elements. This guide eliminates the need to repeat setup instructions in every tutorial.

## What's Included

The Basic Setup Guide covers:

1. **Installing Svelte** - SvelteKit project creation with TypeScript and Tailwind CSS
2. **Installing shadcn-svelte** - UI component library setup and configuration
3. **Configuring OpenRouter** - API key setup and free AI model access
4. **AI SDK Integration** - Vercel AI SDK installation and configuration
5. **Adding Components** - How to install Svelte AI Elements components
6. **Verification** - Testing your setup
7. **Troubleshooting** - Common issues and solutions

## How to Reference in Other Guides

### Option 1: Use the BasicSetupPrereq Component (Recommended)

Import and use the reusable component at the beginning of your guide:

```svelte
<script lang="ts">
  import { BasicSetupPrereq } from "$lib/components/docs";
</script>

<BasicSetupPrereq />
```

This displays a nice callout box with:

- Clear prerequisites list
- Link to the Basic Setup Guide
- Professional styling with icons

### Option 2: Simple Link Reference

Add a simple text reference in your guide introduction:

```markdown
> **Note:** This guide assumes you've completed the [Basic Setup](/guides/basic-setup).
> If you haven't set up your environment yet, please complete it first.
```

## Component Installation Format

When your guide requires specific Svelte AI Elements components, use the `[COMPONENT]` placeholder format:

### Example in Guide Content:

```markdown
## Installing Required Components

For this tutorial, you'll need the following components:

[COMPONENT: message]
[COMPONENT: prompt-input]
[COMPONENT: loader]
```

### Then provide the installation command:

```svelte
<AiInstallCommand
  command="execute"
  args={[
    "pnpx",
    "shadcn-svelte@latest",
    "add",
    "https://svelte-ai-elements.vercel.app/r/message.json",
  ]}
/>
```

## SEO Benefits

The Basic Setup Guide includes:

✅ **Comprehensive Keywords:**

- Svelte setup, AI Elements setup, SvelteKit installation
- shadcn-svelte setup, OpenRouter API setup
- AI SDK installation, Svelte AI tutorial
- Getting started Svelte AI, Svelte AI Elements guide

✅ **Meta Tags:**

- Optimized title, description, and keywords
- Open Graph tags for social sharing
- Twitter Card support
- Canonical URL

✅ **Structured Content:**

- Clear headings (H2, H3) for SEO hierarchy
- Step-by-step numbered sections
- Code examples with syntax highlighting
- Internal linking to other guides

## Benefits of This Approach

### For Content Creators:

- ✅ **No Repetition** - Write setup instructions once, reference everywhere
- ✅ **Shorter Guides** - Focus on the actual tutorial content
- ✅ **Easy Maintenance** - Update setup steps in one place
- ✅ **Consistency** - Same setup instructions across all guides

### For Users:

- ✅ **Clear Prerequisites** - Know exactly what's needed before starting
- ✅ **Reusable Setup** - Complete setup once, use for all tutorials
- ✅ **Quick Reference** - Bookmark the setup guide for future projects
- ✅ **Troubleshooting** - Common issues documented in one place

## Example: Complete Guide Structure

Here's how a typical guide should be structured:

```svelte
<script lang="ts">
  import { BasicSetupPrereq } from "$lib/components/docs";
</script>

<article>
  <header>
    <h1>Your Guide Title</h1>
    <p>Guide description and goals...</p>
  </header>

  <!-- Add prerequisites reference -->
  <BasicSetupPrereq />

  <!-- Your guide-specific content -->
  <section>
    <h2>Component Installation</h2>
    <p>For this guide, install these components:</p>
    <!-- Component installation commands -->
  </section>

  <section>
    <h2>Building the Feature</h2>
    <!-- Your actual tutorial content -->
  </section>

  <!-- Continue with guide-specific sections -->
</article>
```

## File Locations

- **Guide Page:** `/src/routes/(main)/guides/basic-setup/+page.svelte`
- **Content:** `/src/routes/(main)/guides/basic-setup/content.md`
- **Prereq Component:** `/src/lib/components/docs/basic-setup-prereq.svelte`
- **Configuration:** `/src/lib/config/guides-data.ts`

## Updating the Setup Guide

When technologies or best practices change:

1. Update `/src/routes/(main)/guides/basic-setup/+page.svelte`
2. Update `/src/routes/(main)/guides/basic-setup/content.md` if needed
3. Test that all guides still reference it correctly
4. All tutorials automatically benefit from the update

## Questions?

For questions about using the Basic Setup Guide, create an issue or check the main documentation.

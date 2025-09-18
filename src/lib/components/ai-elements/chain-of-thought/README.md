# Chain of Thought Components

A comprehensive set of Svelte 5 components for building interactive Chain of Thought UI elements. These components allow you to create collapsible sections that display AI reasoning processes, search results, and step-by-step thinking.

## Overview

The Chain of Thought components are designed to visualize AI reasoning processes in a user-friendly, interactive format. The components use Svelte 5 runes for modern reactive state management and provide a clean, accessible interface.

## Architecture

### Context System
The components use Svelte's context API to share state between parent and child components:

- **`ChainOfThoughtContext`**: Provides `isOpen` state and `setIsOpen` function to all child components
- **`getChainOfThoughtContext()`**: Hook to access context in child components
- **`setChainOfThoughtContext()`**: Function to set context in parent component

### Component Hierarchy
```
ChainOfThought (Provider)
├── ChainOfThoughtHeader (Trigger)
└── ChainOfThoughtContent (Collapsible Content)
    ├── ChainOfThoughtStep (Individual Steps)
    ├── ChainOfThoughtSearchResults (Search Results Container)
    │   └── ChainOfThoughtSearchResult (Individual Result)
    └── ChainOfThoughtImage (Image Display)
```

## Components

### ChainOfThought
**Main wrapper component that provides context and state management.**

#### Props
- `open?: boolean` - Controlled open state (bindable)
- `defaultOpen?: boolean = false` - Default open state for uncontrolled mode
- `onOpenChange?: (open: boolean) => void` - Callback when open state changes
- `children: Snippet` - Child components
- `class?: string` - Additional CSS classes

#### Features
- **Controllable State**: Supports both controlled (`open` prop) and uncontrolled (`defaultOpen`) modes
- **Svelte 5 Runes**: Uses `$state`, `$derived`, and `$bindable` for modern reactivity
- **Context Provider**: Sets up context for all child components

#### Usage
```svelte
<script>
  import { ChainOfThought, ChainOfThoughtHeader, ChainOfThoughtContent } from '$lib/components/ai-elements/chain-of-thought';

  let isOpen = $state(false);
</script>

<!-- Controlled mode -->
<ChainOfThought bind:open={isOpen} onOpenChange={(open) => console.log('State changed:', open)}>
  <ChainOfThoughtHeader>Custom Header</ChainOfThoughtHeader>
  <ChainOfThoughtContent>
    <!-- Content goes here -->
  </ChainOfThoughtContent>
</ChainOfThought>

<!-- Uncontrolled mode -->
<ChainOfThought defaultOpen={true}>
  <!-- Content -->
</ChainOfThought>
```

### ChainOfThoughtHeader
**Collapsible trigger component with brain icon and chevron indicator.**

#### Props
- `children?: Snippet` - Custom header content (defaults to "Chain of Thought")
- `class?: string` - Additional CSS classes
- All standard HTML button attributes

#### Features
- **Brain Icon**: Uses Lucide's BrainIcon for visual identification
- **Chevron Animation**: Rotates based on open/closed state
- **Hover Effects**: Smooth color transitions on hover
- **Accessibility**: Proper button semantics and keyboard navigation

#### Usage
```svelte
<ChainOfThoughtHeader>
  Custom Chain of Thought Title
</ChainOfThoughtHeader>

<!-- Or use default text -->
<ChainOfThoughtHeader />
```

### ChainOfThoughtStep
**Individual step component for displaying reasoning steps.**

#### Props
- `icon?: ComponentType = DotIcon` - Icon component to display
- `label: string` - Step label (required)
- `description?: string` - Optional description text
- `status?: 'complete' | 'active' | 'pending' = 'complete'` - Step status
- `children?: Snippet` - Additional content
- `class?: string` - Additional CSS classes

#### Features
- **Status Styling**: Different visual styles for complete, active, and pending states
- **Icon Support**: Customizable icons using Lucide components
- **Connection Lines**: Visual lines connecting steps vertically
- **Animation**: Smooth fade-in and slide animations

#### Usage
```svelte
<script>
  import { CheckIcon, LoaderIcon } from '@lucide/svelte';
</script>

<ChainOfThoughtStep
  icon={CheckIcon}
  label="Analyze the problem"
  description="Breaking down the user's request into smaller components"
  status="complete"
>
  <p>Additional step details...</p>
</ChainOfThoughtStep>

<ChainOfThoughtStep
  icon={LoaderIcon}
  label="Processing data"
  status="active"
/>

<ChainOfThoughtStep
  label="Generate response"
  status="pending"
/>
```

### ChainOfThoughtContent
**Collapsible content wrapper with animations.**

#### Props
- `children: Snippet` - Content to display when expanded
- `class?: string` - Additional CSS classes
- All standard HTML div attributes

#### Features
- **Smooth Animations**: Slide and fade transitions when opening/closing
- **Context Integration**: Automatically responds to parent component's open state
- **Proper Spacing**: Consistent spacing for child elements

#### Usage
```svelte
<ChainOfThoughtContent>
  <ChainOfThoughtStep label="Step 1" />
  <ChainOfThoughtStep label="Step 2" />
  <ChainOfThoughtSearchResults>
    <ChainOfThoughtSearchResult>Result 1</ChainOfThoughtSearchResult>
    <ChainOfThoughtSearchResult>Result 2</ChainOfThoughtSearchResult>
  </ChainOfThoughtSearchResults>
</ChainOfThoughtContent>
```

### ChainOfThoughtSearchResults
**Container for search result badges.**

#### Props
- `children: Snippet` - Search result components
- `class?: string` - Additional CSS classes
- All standard HTML div attributes

#### Features
- **Flexible Layout**: Uses flexbox for responsive arrangement
- **Gap Spacing**: Consistent spacing between result items

### ChainOfThoughtSearchResult
**Individual search result badge component.**

#### Props
- `children: Snippet` - Badge content
- `class?: string` - Additional CSS classes
- All standard HTML div attributes

#### Features
- **Badge Styling**: Uses secondary badge variant for subtle appearance
- **Compact Layout**: Small, space-efficient design
- **Consistent Typography**: Normalized font size and weight

#### Usage
```svelte
<ChainOfThoughtSearchResults>
  <ChainOfThoughtSearchResult>React components</ChainOfThoughtSearchResult>
  <ChainOfThoughtSearchResult>State management</ChainOfThoughtSearchResult>
  <ChainOfThoughtSearchResult>Props interface</ChainOfThoughtSearchResult>
</ChainOfThoughtSearchResults>
```

### ChainOfThoughtImage
**Image display component with optional caption.**

#### Props
- `caption?: string` - Optional caption text
- `children: Snippet` - Image content
- `class?: string` - Additional CSS classes
- All standard HTML div attributes

#### Features
- **Responsive Layout**: Maximum height constraint with proper aspect ratio
- **Muted Background**: Subtle background for image containers
- **Caption Support**: Optional descriptive text below images
- **Rounded Corners**: Modern, polished appearance

#### Usage
```svelte
<ChainOfThoughtImage caption="Generated diagram showing component hierarchy">
  <img src="/diagram.png" alt="Component hierarchy" />
</ChainOfThoughtImage>

<ChainOfThoughtImage>
  <svg><!-- SVG content --></svg>
</ChainOfThoughtImage>
```

## Complete Example

```svelte
<script>
  import {
    ChainOfThought,
    ChainOfThoughtHeader,
    ChainOfThoughtContent,
    ChainOfThoughtStep,
    ChainOfThoughtSearchResults,
    ChainOfThoughtSearchResult,
    ChainOfThoughtImage
  } from '$lib/components/ai-elements/chain-of-thought';
  import { SearchIcon, BrainIcon, CheckIcon } from '@lucide/svelte';

  let isOpen = $state(false);
</script>

<ChainOfThought bind:open={isOpen}>
  <ChainOfThoughtHeader>
    Analyzing Your Request
  </ChainOfThoughtHeader>

  <ChainOfThoughtContent>
    <ChainOfThoughtStep
      icon={SearchIcon}
      label="Understanding the problem"
      description="Parsing user input and identifying key requirements"
      status="complete"
    />

    <ChainOfThoughtStep
      icon={BrainIcon}
      label="Searching knowledge base"
      description="Finding relevant patterns and solutions"
      status="complete"
    >
      <ChainOfThoughtSearchResults>
        <ChainOfThoughtSearchResult>React patterns</ChainOfThoughtSearchResult>
        <ChainOfThoughtSearchResult>Component design</ChainOfThoughtSearchResult>
        <ChainOfThoughtSearchResult>State management</ChainOfThoughtSearchResult>
      </ChainOfThoughtSearchResults>
    </ChainOfThoughtStep>

    <ChainOfThoughtStep
      icon={CheckIcon}
      label="Generating solution"
      description="Creating optimized code based on best practices"
      status="active"
    />

    <ChainOfThoughtImage caption="Proposed component architecture">
      <img src="/architecture-diagram.png" alt="Component architecture" />
    </ChainOfThoughtImage>
  </ChainOfThoughtContent>
</ChainOfThought>
```

## Key Differences from React Version

### State Management
- **React**: Uses `useControllableState` hook from Radix UI
- **Svelte 5**: Uses native `$state`, `$derived`, and `$bindable` runes

### Context
- **React**: Uses `createContext` and `useContext`
- **Svelte**: Uses `setContext` and `getContext` with unique UUID key

### Component Structure
- **React**: Higher-order components with props forwarding
- **Svelte**: Direct component props with snippets for children

### Styling
- **React**: className prop
- **Svelte**: class prop with same cn() utility

### Icons
- **React**: `lucide-react` package
- **Svelte**: `@lucide/svelte` package

## Dependencies

- **Svelte 5**: Core framework with runes
- **@lucide/svelte**: Icon components
- **tailwind-merge & clsx**: Utility for conditional styling
- **bits-ui**: Collapsible component primitives

## Best Practices

1. **Always wrap child components** in `ChainOfThought` to provide context
2. **Use semantic HTML** - components output proper heading and list structures
3. **Provide descriptive labels** for accessibility
4. **Consider performance** - large trees of steps should be virtualized if needed
5. **Test keyboard navigation** - all interactive elements support keyboard access
import type { Component } from "svelte";

export type NavigationCategory = "component" | "guide" | "docs";

export interface NavigationItem {
  title: string;
  href: string;
  description?: string;
  category: NavigationCategory;
  keywords?: string[];
  icon?: string;
}

export const navigationData: NavigationItem[] = [
  // Docs
  {
    title: "Introduction",
    href: "/docs/introduction",
    description: "Get started with Svelte AI Elements",
    category: "docs",
    keywords: ["intro", "getting started", "overview", "about"],
  },
  {
    title: "Installation",
    href: "/docs/installation",
    description: "How to install and set up Svelte AI Elements",
    category: "docs",
    keywords: ["install", "setup", "npm", "pnpm", "package"],
  },

  // Components
  {
    title: "Action",
    href: "/components/actions",
    description: "Display interactive actions within AI responses",
    category: "component",
    keywords: ["button", "interactive", "action button", "hover"],
  },
  {
    title: "Artifact",
    href: "/components/artifact",
    description: "Showcase AI-generated artifacts and content",
    category: "component",
    keywords: ["generated", "output", "content", "result"],
  },
  {
    title: "Branch",
    href: "/components/branch",
    description: "Create branching conversation flows",
    category: "component",
    keywords: ["conversation", "flow", "branching", "tree"],
  },
  {
    title: "Chain of Thought",
    href: "/components/chain-of-thought",
    description: "Display AI reasoning process step by step",
    category: "component",
    keywords: ["reasoning", "thinking", "steps", "process", "logic"],
  },
  {
    title: "Code",
    href: "/components/code",
    description: "Display code blocks with syntax highlighting",
    category: "component",
    keywords: ["syntax", "highlight", "code block", "programming"],
  },
  {
    title: "Context",
    href: "/components/context",
    description: "Show contextual information for AI responses",
    category: "component",
    keywords: ["context", "information", "metadata"],
  },
  {
    title: "Conversation",
    href: "/components/conversation",
    description: "Build complete conversation interfaces",
    category: "component",
    keywords: ["chat", "messages", "dialog", "conversation flow"],
  },
  {
    title: "Copy Button",
    href: "/components/copy-button",
    description: "Copy text to clipboard with one click",
    category: "component",
    keywords: ["copy", "clipboard", "button", "duplicate"],
  },
  {
    title: "Image",
    href: "/components/image",
    description: "Display AI-generated images from base64 data",
    category: "component",
    keywords: ["image", "picture", "generated", "base64", "media", "visual"],
  },
  {
    title: "Inline Citation",
    href: "/components/inline-citation",
    description: "Add inline citations to AI responses",
    category: "component",
    keywords: ["citation", "reference", "source", "inline"],
  },
  {
    title: "Loader",
    href: "/components/loader",
    description: "Display loading states for AI operations",
    category: "component",
    keywords: ["loading", "spinner", "skeleton", "waiting"],
  },
  {
    title: "Message",
    href: "/components/message",
    description: "Display individual chat messages",
    category: "component",
    keywords: ["chat", "message", "bubble", "text"],
  },
  {
    title: "Open in Chat",
    href: "/components/open-in-chat",
    description: "Link to open content in chat interface",
    category: "component",
    keywords: ["link", "open", "redirect", "chat"],
  },
  {
    title: "Prompt Input",
    href: "/components/prompt-input",
    description: "Input component for AI prompts",
    category: "component",
    keywords: ["input", "textarea", "prompt", "query", "ask"],
  },
  {
    title: "Reasoning",
    href: "/components/reasoning",
    description: "Show AI reasoning and thought process",
    category: "component",
    keywords: ["thinking", "logic", "reasoning", "explanation"],
  },
  {
    title: "Response",
    href: "/components/response",
    description: "Display AI responses",
    category: "component",
    keywords: ["answer", "reply", "output", "response"],
  },
  {
    title: "Sources",
    href: "/components/sources",
    description: "Display source references and citations",
    category: "component",
    keywords: ["sources", "references", "citations", "links"],
  },
  {
    title: "Suggestion",
    href: "/components/suggestion",
    description: "Show AI suggestions and recommendations",
    category: "component",
    keywords: ["suggestions", "recommendations", "options", "choices"],
  },
  {
    title: "Task",
    href: "/components/task",
    description: "Display AI tasks and task lists",
    category: "component",
    keywords: ["task", "todo", "checklist", "list"],
  },
  {
    title: "Tool",
    href: "/components/tool",
    description: "Display AI tool usage and execution",
    category: "component",
    keywords: ["tool", "function", "execution", "api"],
  },
  {
    title: "Web Preview",
    href: "/components/web-preview",
    description: "Preview web content and links",
    category: "component",
    keywords: ["preview", "link", "webpage", "url"],
  },

  // Workflow Components
  {
    title: "Canvas",
    href: "/components/workflow/canvas",
    description:
      "Svelte Flow-based canvas for building interactive node-based interfaces",
    category: "component",
    keywords: ["workflow", "canvas", "svelte flow", "nodes", "graph", "diagram"],
  },
  {
    title: "Connection",
    href: "/components/workflow/connection",
    description:
      "Styled connection line for Svelte Flow canvases with animated bezier curves",
    category: "component",
    keywords: ["workflow", "connection", "line", "edge", "bezier", "animated"],
  },
  {
    title: "Controls",
    href: "/components/workflow/controls",
    description: "Interactive zoom and fit view controls for Svelte Flow canvases",
    category: "component",
    keywords: ["workflow", "controls", "zoom", "pan", "fit view", "navigation"],
  },
  {
    title: "Edge",
    href: "/components/workflow/edge",
    description:
      "Pre-styled edge types for Svelte Flow: Temporary and Animated connections",
    category: "component",
    keywords: ["workflow", "edge", "connection", "animated", "temporary", "line"],
  },
  {
    title: "Node",
    href: "/components/workflow/node",
    description:
      "Composable Card-based node for Svelte Flow with connection handles",
    category: "component",
    keywords: ["workflow", "node", "card", "handles", "composable", "block"],
  },
  {
    title: "Panel",
    href: "/components/workflow/panel",
    description:
      "Positioned container for custom UI elements on Svelte Flow canvases",
    category: "component",
    keywords: ["workflow", "panel", "container", "overlay", "toolbar", "ui"],
  },
  {
    title: "Toolbar",
    href: "/components/workflow/toolbar",
    description: "Positioned toolbar that attaches to nodes in Svelte Flow canvases",
    category: "component",
    keywords: ["workflow", "toolbar", "node toolbar", "actions", "buttons"],
  },

  // Guides
  {
    title: "Svelte 5 + AI SDK Integration Guide",
    href: "/guides/svelte-5-ai-sdk-integration",
    description:
      "Integrate Svelte 5 with the AI SDK for powerful AI-driven applications",
    category: "guide",
    keywords: ["ai", "integration", "svelte", "response", "streaming", "chat"],
  },
];

// Helper function to search navigation data
export function searchNavigation(query: string): NavigationItem[] {
  const lowercaseQuery = query.toLowerCase().trim();

  if (!lowercaseQuery) {
    return [];
  }

  return navigationData
    .filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(lowercaseQuery);
      const descriptionMatch = item.description
        ?.toLowerCase()
        .includes(lowercaseQuery);
      const keywordMatch = item.keywords?.some((keyword) =>
        keyword.toLowerCase().includes(lowercaseQuery)
      );

      return titleMatch || descriptionMatch || keywordMatch;
    })
    .sort((a, b) => {
      // Prioritize title matches
      const aTitleMatch = a.title.toLowerCase().includes(lowercaseQuery);
      const bTitleMatch = b.title.toLowerCase().includes(lowercaseQuery);

      if (aTitleMatch && !bTitleMatch) return -1;
      if (!aTitleMatch && bTitleMatch) return 1;

      return 0;
    });
}

// Get items by category
export function getNavigationByCategory(
  category: NavigationCategory
): NavigationItem[] {
  return navigationData.filter((item) => item.category === category);
}

// Get navigation groups for display
export function getNavigationGroups() {
  return {
    components: getNavigationByCategory("component"),
    guides: getNavigationByCategory("guide"),
    docs: getNavigationByCategory("docs"),
  };
}

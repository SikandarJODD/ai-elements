// Main components
import OpenIn from "./open-in.svelte";
import OpenInContent from "./open-in-content.svelte";
import OpenInItem from "./open-in-item.svelte";
import OpenInLabel from "./open-in-label.svelte";
import OpenInSeparator from "./open-in-separator.svelte";
import OpenInTrigger from "./open-in-trigger.svelte";

// Provider-specific components
import OpenInChatGPT from "./open-in-chatgpt.svelte";
import OpenInClaude from "./open-in-claude.svelte";
import OpenInT3 from "./open-in-t3.svelte";
import OpenInScira from "./open-in-scira.svelte";
import OpenInV0 from "./open-in-v0.svelte";

// Icon components
import GitHubIcon from "./github-icon.svelte";
import SciraIcon from "./scira-icon.svelte";
import ChatGPTIcon from "./chatgpt-icon.svelte";
import ClaudeIcon from "./claude-icon.svelte";
import V0Icon from "./v0-icon.svelte";

// Context
export {
  createOpenInContext,
  getOpenInContext,
  providers,
  type OpenInContextType,
  type ProviderConfig,
} from "./open-in-context.svelte.js";

export {
  OpenIn,
  OpenInContent,
  OpenInItem,
  OpenInLabel,
  OpenInSeparator,
  OpenInTrigger,
  //
  OpenIn as Root,
  OpenInTrigger as Trigger,
  OpenInContent as Content,
  OpenInItem as Item,
  OpenInLabel as Label,
  OpenInSeparator as Separator,
  //
  OpenInChatGPT,
  OpenInClaude,
  OpenInT3,
  OpenInScira,
  OpenInV0,
  //
  GitHubIcon,
  SciraIcon,
  ChatGPTIcon,
  ClaudeIcon,
  V0Icon,
};
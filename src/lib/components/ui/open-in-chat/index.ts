// Main components
import OpenIn from "./OpenIn.svelte";
import OpenInContent from "./OpenInContent.svelte";
import OpenInItem from "./OpenInItem.svelte";
import OpenInLabel from "./OpenInLabel.svelte";
import OpenInSeparator from "./OpenInSeparator.svelte";
import OpenInTrigger from "./OpenInTrigger.svelte";

// Provider-specific components
import OpenInChatGPT from "./OpenInChatGPT.svelte";
import OpenInClaude from "./OpenInClaude.svelte";
import OpenInT3 from "./OpenInT3.svelte";
import OpenInScira from "./OpenInScira.svelte";
import OpenInV0 from "./OpenInV0.svelte";

// Icon components
import GitHubIcon from "./GitHubIcon.svelte";
import SciraIcon from "./SciraIcon.svelte";
import ChatGPTIcon from "./ChatGPTIcon.svelte";
import ClaudeIcon from "./ClaudeIcon.svelte";
import V0Icon from "./V0Icon.svelte";

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
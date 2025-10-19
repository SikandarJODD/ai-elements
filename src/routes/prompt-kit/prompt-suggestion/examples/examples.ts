import KitPromptSuggestionExample from "$lib/components/kit-examples/kit-prompt-suggestion-example.svelte";
import kitPromptSuggestionExampleRaw from "$lib/components/kit-examples/kit-prompt-suggestion-example.svelte?raw";

import KitPromptSuggestionHighlightExample from "$lib/components/kit-examples/kit-prompt-suggestion-highlight-example.svelte";
import kitPromptSuggestionHighlightExampleRaw from "$lib/components/kit-examples/kit-prompt-suggestion-highlight-example.svelte?raw";

import KitPromptSuggestionChatCompleteExample from "$lib/components/kit-examples/kit-prompt-suggestion-chat-complete-example.svelte";
import kitPromptSuggestionChatCompleteExampleRaw from "$lib/components/kit-examples/kit-prompt-suggestion-chat-complete-example.svelte?raw";

const examples = {
  basic: {
    code: kitPromptSuggestionExampleRaw,
    Component: KitPromptSuggestionExample,
  },
  highlight: {
    code: kitPromptSuggestionHighlightExampleRaw,
    Component: KitPromptSuggestionHighlightExample,
  },
  chatComplete: {
    code: kitPromptSuggestionChatCompleteExampleRaw,
    Component: KitPromptSuggestionChatCompleteExample,
  },
};

export { examples };

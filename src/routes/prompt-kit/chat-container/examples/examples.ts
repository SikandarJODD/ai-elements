import KitChatContainerBasicExample from "$lib/components/kit-examples/kit-chat-container-basic-example.svelte";
import kitChatContainerBasicExampleRaw from "$lib/components/kit-examples/kit-chat-container-basic-example.svelte?raw";

import KitChatContainerStreamingExample from "$lib/components/kit-examples/kit-chat-container-streaming-example.svelte";
import kitChatContainerStreamingExampleRaw from "$lib/components/kit-examples/kit-chat-container-streaming-example.svelte?raw";

const examples = {
  basic: {
    code: kitChatContainerBasicExampleRaw,
    Component: KitChatContainerBasicExample,
  },
  streaming: {
    code: kitChatContainerStreamingExampleRaw,
    Component: KitChatContainerStreamingExample,
  },
};

export { examples };

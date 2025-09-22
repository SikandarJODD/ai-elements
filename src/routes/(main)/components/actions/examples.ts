import Basic from "./basic.svelte";
import basicRaw from "./basic.svelte?raw";

import MessageAction from "./message-action.svelte";
import messageActionRaw from "./message-action.svelte?raw";

const examples = {
  basic: {
    code: basicRaw,
    Component: Basic,
  },
  messageAction: {
    code: messageActionRaw,
    Component: MessageAction,
  },
};

export { examples };

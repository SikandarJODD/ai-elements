<script lang="ts">
  import {
    Conversation,
    ConversationContent,
    ConversationEmptyState,
    ConversationScrollButton,
  } from "$lib/components/ai-elements/conversation/index.js";
  import {
    Message,
    MessageAvatar,
    MessageContent,
  } from "$lib/components/ai-elements/message/index.js";
  import { MessageSquare } from "@lucide/svelte";

  interface MessageData {
    key: string;
    value: string;
    name: string;
    avatar: string;
  }

  // Static messages data using crypto.randomUUID()
  const messages: MessageData[] = [
    {
      key: crypto.randomUUID(),
      value: "Hello, how are you?",
      name: "Alex Johnson",
      avatar: "https://github.com/haydenbleasel.png",
    },
    {
      key: crypto.randomUUID(),
      value: "I'm good, thank you! How can I assist you today?",
      name: "AI Assistant",
      avatar: "https://github.com/openai.png",
    },
    {
      key: crypto.randomUUID(),
      value: "I'm looking for information about your services.",
      name: "Alex Johnson",
      avatar: "https://github.com/haydenbleasel.png",
    },
    {
      key: crypto.randomUUID(),
      value:
        "Sure! We offer a variety of AI solutions. What are you interested in?",
      name: "AI Assistant",
      avatar: "https://github.com/openai.png",
    },
    {
      key: crypto.randomUUID(),
      value: "I'm interested in natural language processing tools.",
      name: "Alex Johnson",
      avatar: "https://github.com/haydenbleasel.png",
    },
    {
      key: crypto.randomUUID(),
      value: "Great choice! We have several NLP APIs. Would you like a demo?",
      name: "AI Assistant",
      avatar: "https://github.com/openai.png",
    },
    {
      key: crypto.randomUUID(),
      value: "Yes, a demo would be helpful.",
      name: "Alex Johnson",
      avatar: "https://github.com/haydenbleasel.png",
    },
    {
      key: crypto.randomUUID(),
      value: "Alright, I can show you a sentiment analysis example. Ready?",
      name: "AI Assistant",
      avatar: "https://github.com/openai.png",
    },
    {
      key: crypto.randomUUID(),
      value: "Yes, please proceed.",
      name: "Alex Johnson",
      avatar: "https://github.com/haydenbleasel.png",
    },
    {
      key: crypto.randomUUID(),
      value: "Here is a sample: 'I love this product!' → Positive sentiment.",
      name: "AI Assistant",
      avatar: "https://github.com/openai.png",
    },
    {
      key: crypto.randomUUID(),
      value: "Impressive! Can it handle multiple languages?",
      name: "Alex Johnson",
      avatar: "https://github.com/haydenbleasel.png",
    },
    {
      key: crypto.randomUUID(),
      value: "Absolutely, our models support over 20 languages.",
      name: "AI Assistant",
      avatar: "https://github.com/openai.png",
    },
    {
      key: crypto.randomUUID(),
      value: "How do I get started with the API?",
      name: "Alex Johnson",
      avatar: "https://github.com/haydenbleasel.png",
    },
    {
      key: crypto.randomUUID(),
      value: "You can sign up on our website and get an API key instantly.",
      name: "AI Assistant",
      avatar: "https://github.com/openai.png",
    },
    {
      key: crypto.randomUUID(),
      value: "Is there a free trial available?",
      name: "Alex Johnson",
      avatar: "https://github.com/haydenbleasel.png",
    },
    {
      key: crypto.randomUUID(),
      value: "Yes, we offer a 14-day free trial with full access.",
      name: "AI Assistant",
      avatar: "https://github.com/openai.png",
    },
    {
      key: crypto.randomUUID(),
      value: "What kind of support do you provide?",
      name: "Alex Johnson",
      avatar: "https://github.com/haydenbleasel.png",
    },
    {
      key: crypto.randomUUID(),
      value: "We provide 24/7 chat and email support for all users.",
      name: "AI Assistant",
      avatar: "https://github.com/openai.png",
    },
    {
      key: crypto.randomUUID(),
      value: "Thank you for the information!",
      name: "Alex Johnson",
      avatar: "https://github.com/haydenbleasel.png",
    },
    {
      key: crypto.randomUUID(),
      value: "You're welcome! Let me know if you have any more questions.",
      name: "AI Assistant",
      avatar: "https://github.com/openai.png",
    },
  ];

  // Reactive state using Svelte 5 runes
  let visibleMessages = $state<MessageData[]>([]);

  // Auto-add messages effect using Svelte 5 $effect
  $effect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < messages.length && messages[currentIndex]) {
        const currentMessage = messages[currentIndex];
        visibleMessages = [
          ...visibleMessages,
          {
            key: currentMessage.key,
            value: currentMessage.value,
            name: currentMessage.name,
            avatar: currentMessage.avatar,
          },
        ];
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  });
</script>

<Conversation class="h-full">
  <ConversationContent>
    {#if visibleMessages.length === 0}
      <ConversationEmptyState
        description="Messages will appear here as the conversation progresses."
        title="Start a conversation"
      >
        {#snippet icon()}
          <MessageSquare class="size-6" />
        {/snippet}
      </ConversationEmptyState>
    {:else}
      {#each visibleMessages as messageData, index (messageData.key)}
        <Message from={index % 2 === 0 ? "user" : "assistant"}>
          <MessageContent>{messageData.value}</MessageContent>
          <MessageAvatar name={messageData.name} src={messageData.avatar} />
        </Message>
      {/each}
    {/if}
  </ConversationContent>
  <ConversationScrollButton />
</Conversation>

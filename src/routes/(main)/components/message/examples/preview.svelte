<script lang="ts">
	import { Message, MessageContent, MessageResponse } from "$lib/components/ai-elements/message";

	let content = `Svelte is a frontend framework used to build fast web applications and user interfaces.

Unlike frameworks like React or Vue.js, Svelte shifts most of the work to the **build step** instead of doing it in the browser at runtime.

That means:

* smaller bundle sizes
* faster websites
* less boilerplate code
* simpler reactivity

---

## Simple Example

### Counter Example

\`\`\`svelte
\<\script\>
	let count = 0;
\<\/script\>

<button onclick={() => count++}>
	Clicked {count} times
</button>
\`\`\`

When you click the button, the UI updates automatically.

No \`setState\`, hooks, or complex state management needed.

---

## Reactive Example

\`\`\`svelte
\<\script\>
	let price = 100;
	let quantity = 2;

	$: total = price * quantity;
<\/\script\>

<p>Total: {total}</p>
\`\`\`

\`$:\` means “rerun this whenever dependencies change”.

If \`price\` or \`quantity\` changes, \`total\` updates automatically.

---

## Conditional Rendering

\`\`\`svelte
\<\script\>
	let loggedIn = true;
\<\/script\>

{#if loggedIn}
	<p>Welcome back!</p>
{:else}
	<p>Please login</p>
{/if}
\`\`\`

---

## Loop Example

\`\`\`svelte
\<\script\>
	let fruits = ["Apple", "Banana", "Mango"];
\<\/script\>

<ul>
	{#each fruits as fruit}
		<li>{fruit}</li>
	{/each}
</ul>
\`\`\`

---

## Component Example

### \`Button.svelte\`

\`\`\`svelte
\<\script\>
	export let text = "Click";
\<\/script\>

<button>{text}</button>
\`\`\`

### Usage

\`\`\`svelte
<Button text="Submit" />
\`\`\`

---

## Why Developers Like Svelte

* Very readable syntax
* Less code compared to React
* Built-in animations/transitions
* Great performance
* Excellent developer experience
* Easy state management

---

## Real Projects Built With Svelte

* dashboards
* AI chat apps
* landing pages
* blogs
* animations
* design systems
* browser extensions

Since you already work with Svelte, many of your projects like:

* Svelte AI Elements
* Svelte Animations
* Svelte Marketing Blocks

are examples of real-world Svelte ecosystems.
`;
</script>

<div class="flex w-full flex-col gap-4 max-w-2xl mx-auto">
	<Message from="user">
		<MessageContent>What is Svelte? provide some examples</MessageContent>
	</Message>

	<Message from="assistant">
		<MessageContent>
			<MessageResponse {content} />
		</MessageContent>
	</Message>
</div>

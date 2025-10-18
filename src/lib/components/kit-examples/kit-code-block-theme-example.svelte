<script lang="ts">
	import { CodeBlock, CodeBlockCode } from '$lib/components/prompt-kit/code-block';
	import { mode } from 'mode-watcher';

	const code = `<script lang="ts">
  import { writable } from 'svelte/store';

  const todos = writable([
    { id: 1, text: 'Learn Svelte', done: false },
    { id: 2, text: 'Build an app', done: false }
  ]);

  function addTodo(text: string) {
    todos.update(items => [
      ...items,
      { id: Date.now(), text, done: false }
    ]);
  }

  function toggleTodo(id: number) {
    todos.update(items =>
      items.map(item =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  }
<\/script>

<div class="todo-list">
  {#each $todos as todo}
    <div class="todo-item">
      <input
        type="checkbox"
        checked={todo.done}
        onchange={() => toggleTodo(todo.id)}
      />
      <span class:done={todo.done}>{todo.text}</span>
    </div>
  {/each}
</div>

<style>
  .done {
    text-decoration: line-through;
    opacity: 0.6;
  }
</style>`;
</script>

<div class="w-full max-w-4xl">
	<CodeBlock>
		<CodeBlockCode
			{code}
			language="svelte"
			theme={mode.current === 'dark' ? 'github-dark' : 'github-light'}
		/>
	</CodeBlock>
</div>

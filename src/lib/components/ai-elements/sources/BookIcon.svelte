<script lang="ts">
	interface Props {
		class?: string;
		size?: number;
		[key: string]: any;
	}

	let { class: className = "", size = 16, ...restProps }: Props = $props();
</script>

<svg
	{...restProps}
	class={className}
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
>
	<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
</svg>
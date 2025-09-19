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
	<path d="m6 9 6 6 6-6" />
</svg>
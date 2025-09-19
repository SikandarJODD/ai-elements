<script lang="ts">
	interface Props {
		class?: string;
		size?: number | string;
	}

	let { class: className = '', size = 16, ...restProps }: Props = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	class={className}
	{...restProps}
>
	<path d="M12 5a3 3 0 1 0-5.997.142 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588 4 4 0 0 0 7.636 2.106 3.2 3.2 0 0 0 .164-.546c.071-.264.142-.538.142-.828a3 3 0 0 0-.546-1.736 3 3 0 0 0 .546-1.734 3 3 0 0 0-.546-1.735A3 3 0 0 0 12 5Z"/>
	<path d="M12 5a3 3 0 1 1 5.997.142 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588 4 4 0 0 1-7.636 2.106 3.2 3.2 0 0 1-.164-.546c-.071-.264-.142-.538-.142-.828a3 3 0 0 1 .546-1.736 3 3 0 0 1-.546-1.734 3 3 0 0 1 .546-1.735A3 3 0 0 1 12 5Z"/>
	<path d="M15.7 13a3 3 0 1 1-7.4 0"/>
	<path d="M9.4 10.8 12 13l2.6-2.2"/>
</svg>
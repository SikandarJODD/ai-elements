<script lang="ts">
	import {
		getContextValue,
		ICON_RADIUS,
		ICON_VIEWBOX,
		ICON_CENTER,
		ICON_STROKE_WIDTH,
	} from "./context-context.svelte.js";

	const context = getContextValue();
	const { circumference, dashOffset } = $derived({
		circumference: context.circumference,
		dashOffset: context.dashOffset,
	});
</script>

<svg
	aria-label="Model context usage"
	height="20"
	role="img"
	style="color: currentcolor"
	viewBox="0 0 {ICON_VIEWBOX} {ICON_VIEWBOX}"
	width="20"
>
	<circle
		cx={ICON_CENTER}
		cy={ICON_CENTER}
		fill="none"
		opacity="0.25"
		r={ICON_RADIUS}
		stroke="currentColor"
		stroke-width={ICON_STROKE_WIDTH}
	/>
	<circle
		cx={ICON_CENTER}
		cy={ICON_CENTER}
		fill="none"
		opacity="0.7"
		r={ICON_RADIUS}
		stroke="currentColor"
		stroke-dasharray="{circumference} {circumference}"
		stroke-dashoffset={dashOffset}
		stroke-linecap="round"
		stroke-width={ICON_STROKE_WIDTH}
		style="transform-origin: center; transform: rotate(-90deg);"
	/>
</svg>

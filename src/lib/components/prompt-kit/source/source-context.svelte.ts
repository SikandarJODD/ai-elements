import { getContext, setContext } from 'svelte';

export type SourceSchema = {
	href: string;
	domain: string;
};

export class SourceClass {
	href = $state<string>('');
	domain = $state<string>('');

	constructor(props: { href: string }) {
		this.href = props.href;

		// Extract domain from href
		try {
			this.domain = new URL(props.href).hostname;
		} catch {
			this.domain = props.href.split('/').pop() || props.href;
		}
	}
}

const SOURCE_KEY = Symbol('source');

export function setSourceContext(contextInstance: SourceClass) {
	setContext(SOURCE_KEY, contextInstance);
}

export function getSourceContext(): SourceClass {
	const context = getContext<SourceClass>(SOURCE_KEY);

	if (!context) {
		throw new Error('Source.* must be used inside <Source>');
	}

	return context;
}

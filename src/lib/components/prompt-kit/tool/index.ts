import Root from './Tool.svelte';
import Header from './ToolHeader.svelte';
import Content from './ToolContent.svelte';
import Details from './ToolDetails.svelte';
import Composed from './ToolComposed.svelte';

export {
	Root,
	Header,
	Content,
	Details,
	Composed,
	//
	Root as Tool,
	Header as ToolHeader,
	Content as ToolContent,
	Details as ToolDetails,
	Composed as ToolComposed
};

export * from './tool-context.svelte.js';

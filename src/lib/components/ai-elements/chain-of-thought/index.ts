import ChainOfThought from "./ChainOfThought.svelte";
import ChainOfThoughtHeader from "./ChainOfThoughtHeader.svelte";
import ChainOfThoughtStep from "./ChainOfThoughtStep.svelte";
import ChainOfThoughtContent from "./ChainOfThoughtContent.svelte";
import ChainOfThoughtSearchResults from "./ChainOfThoughtSearchResults.svelte";
import ChainOfThoughtSearchResult from "./ChainOfThoughtSearchResult.svelte";
import ChainOfThoughtImage from "./ChainOfThoughtImage.svelte";

export {
	ChainOfThoughtContext,
	getChainOfThoughtContext,
	setChainOfThoughtContext,
} from "./chain-of-thought-context.svelte.js";

export {
	ChainOfThought,
	ChainOfThoughtHeader,
	ChainOfThoughtStep,
	ChainOfThoughtContent,
	ChainOfThoughtSearchResults,
	ChainOfThoughtSearchResult,
	ChainOfThoughtImage,
	//
	ChainOfThought as Root,
	ChainOfThoughtHeader as Header,
	ChainOfThoughtStep as Step,
	ChainOfThoughtContent as Content,
	ChainOfThoughtSearchResults as SearchResults,
	ChainOfThoughtSearchResult as SearchResult,
	ChainOfThoughtImage as Image,
};

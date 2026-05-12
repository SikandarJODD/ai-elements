import Subheading from "./subheading.svelte";
import CodeSpan from "./code-span.svelte";
import AiInstallCommand from "./ai-install-command.svelte";
import Installation from "./installation.svelte";
import Code from "./code.svelte";
import CodeNameBlock from "./code-name/code-name-block.svelte";
import BasicSetupPrereq from "./basic-setup-prereq.svelte";
import ComponentAPITable from "./component-api-table.svelte";
import CopyPageDropdown from "./copy-page-dropdown/copy-page-dropdown.svelte";
import PrevNext from "./prev-next.svelte";
import ComponentPageDocs from "./component-page-docs.svelte";

export {
	Subheading,
	CodeSpan,
	AiInstallCommand,
	Installation,
	Code,
	CodeNameBlock,
	BasicSetupPrereq,
	ComponentAPITable,
	CopyPageDropdown,
	PrevNext,
	ComponentPageDocs,
};
export type { PropDefinition, ComponentAPITableProps } from "./component-api-table.types";
export type {
	ComponentPageDocsProps,
	ComponentPageDocsInstallation,
	ComponentPageDocsType,
} from "./component-page-docs.types";

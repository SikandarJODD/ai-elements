export type PropDefinition = {
	name: string;
	type: string;
	default?: string;
	description: string;
};

export type ComponentAPITableProps = {
	componentName: string;
	props: PropDefinition[];
	class?: string;
	id?: string;
};

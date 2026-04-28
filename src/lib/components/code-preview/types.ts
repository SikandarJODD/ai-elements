import type { SupportedLanguage } from "$lib/components/ui/code/shiki";
import type { Component } from "svelte";

export type BlockCodeHighlight = (number | [number, number])[];

export type BlockCodeFile = {
	type: "file";
	id: string;
	name: string;
	path: string;
	code?: string;
	lang?: SupportedLanguage;
	highlight?: BlockCodeHighlight;
	externalUrl?: string;
	externalLabel?: string;
};

export type BlockCodeFolder = {
	type: "folder";
	id: string;
	name: string;
	defaultOpen?: boolean;
	children: BlockCodeNode[];
};

export type BlockCodeNode = BlockCodeFile | BlockCodeFolder;

export type BlockCodeTree = {
	defaultFileId: string;
	nodes: BlockCodeNode[];
};

export type BlockShowcaseItem = {
	id: string;
	title: string;
	description: string;
	previewComponent?: Component;
	codeTree: BlockCodeTree;
	previewHref?: string;
	previewMode: "inline" | "iframe" | "empty";
	previewHeight?: number;
	previewTitle?: string;
	previewDescription?: string;
	installId?: string;
};

export type CookbookPlaygroundPageData = BlockShowcaseItem & {
	slug: string;
	tags: string[];
};

type BlockCodeFileInput = Omit<BlockCodeFile, "type" | "name"> & {
	name?: string;
};

export function isBlockCodeFile(node: BlockCodeNode): node is BlockCodeFile {
	return node.type === "file";
}

export function isBlockCodeFolder(node: BlockCodeNode): node is BlockCodeFolder {
	return node.type === "folder";
}

export function flattenBlockCodeFiles(nodes: BlockCodeNode[]): BlockCodeFile[] {
	return nodes.flatMap((node) => {
		if (isBlockCodeFile(node)) {
			return [node];
		}

		return flattenBlockCodeFiles(node.children);
	});
}

export function findBlockCodeFile(tree: BlockCodeTree, fileId: string) {
	return flattenBlockCodeFiles(tree.nodes).find((file) => file.id === fileId);
}

export function collectDefaultOpenFolderIds(nodes: BlockCodeNode[]): string[] {
	return nodes.flatMap((node) => {
		if (!isBlockCodeFolder(node)) {
			return [];
		}

		const current = node.defaultOpen ? [node.id] : [];
		return [...current, ...collectDefaultOpenFolderIds(node.children)];
	});
}

export function createBlockCodeTree(
	defaultFileId: string,
	files: BlockCodeFileInput[]
): BlockCodeTree {
	const nodes: BlockCodeNode[] = [];

	for (const file of files) {
		const segments = file.path.split("/").filter(Boolean);
		const fileName = file.name ?? segments.at(-1) ?? file.id;
		const folderSegments = segments.slice(0, -1);

		let currentNodes = nodes;
		let currentPath = "";

		for (const folderName of folderSegments) {
			currentPath = currentPath ? `${currentPath}/${folderName}` : folderName;
			let folder = currentNodes.find(
				(node): node is BlockCodeFolder =>
					isBlockCodeFolder(node) && node.name === folderName
			);

			if (!folder) {
				folder = {
					type: "folder",
					id: `folder:${currentPath}`,
					name: folderName,
					defaultOpen: true,
					children: [],
				};

				currentNodes.push(folder);
			}

			currentNodes = folder.children;
		}

		currentNodes.push({
			type: "file",
			id: file.id,
			name: fileName,
			path: file.path,
			code: file.code,
			lang: file.lang,
			highlight: file.highlight,
			externalUrl: file.externalUrl,
			externalLabel: file.externalLabel,
		});
	}

	return {
		defaultFileId,
		nodes,
	};
}

<script lang="ts">
	import FileIcon from '@lucide/svelte/icons/file';
	import FileImageIcon from '@lucide/svelte/icons/file-image';
	import FileSpreadsheetIcon from '@lucide/svelte/icons/file-spreadsheet';
	import FileVideoIcon from '@lucide/svelte/icons/file-video';
	import ImageIcon from '@lucide/svelte/icons/image';
	import XIcon from '@lucide/svelte/icons/x';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Component } from 'svelte';
	import { cn, type WithElementRef } from '$lib/utils.js';
	import { getAttachments } from '../core/context.js';
	import type { PromptInputAttachment } from '../core/types.js';
	import PreviewImage from './preview-image.svelte';

	export interface AttachmentsPreviewProps extends WithElementRef<HTMLAttributes<HTMLDivElement>> {
		variant?: 'default' | 'compact';
	}

	type AttachmentKind = 'image' | 'spreadsheet' | 'video' | 'file';

	type AttachmentPresentation = {
		Icon: Component;
		iconClass: string;
		kind: AttachmentKind;
		label: string;
	};

	let {
		ref = $bindable(null),
		class: className,
		variant = 'compact',
		...restProps
	}: AttachmentsPreviewProps = $props();

	const attachments = getAttachments();

	const imageExtensions = new Set([
		'jpg',
		'jpeg',
		'png',
		'gif',
		'webp',
		'svg',
		'bmp',
		'avif',
		'heic',
		'heif'
	]);
	const spreadsheetExtensions = new Set(['csv', 'tsv', 'xls', 'xlsx', 'ods']);
	const videoExtensions = new Set(['mp4', 'mov', 'avi', 'mkv', 'webm', 'm4v']);

	function getExtension(filename: string) {
		const match = filename.toLowerCase().match(/\.([a-z0-9]+)$/);
		return match?.[1] ?? '';
	}

	function getAttachmentKind(file: PromptInputAttachment): AttachmentKind {
		const mediaType = file.mediaType.toLowerCase();
		const extension = getExtension(file.filename);

		if (mediaType.startsWith('image/') || imageExtensions.has(extension)) {
			return 'image';
		}

		if (
			mediaType === 'text/csv' ||
			mediaType.includes('spreadsheet') ||
			mediaType.includes('excel') ||
			spreadsheetExtensions.has(extension)
		) {
			return 'spreadsheet';
		}

		if (mediaType.startsWith('video/') || videoExtensions.has(extension)) {
			return 'video';
		}

		return 'file';
	}

	function getAttachmentPresentation(file: PromptInputAttachment): AttachmentPresentation {
		const kind = getAttachmentKind(file);

		switch (kind) {
			case 'image':
				return {
					Icon: FileImageIcon,
					iconClass: 'bg-sky-500/15 text-sky-600 dark:bg-sky-400/15 dark:text-sky-300',
					kind,
					label: 'Image'
				};
			case 'spreadsheet':
				return {
					Icon: FileSpreadsheetIcon,
					iconClass: 'bg-emerald-500 text-white dark:bg-emerald-500 dark:text-white',
					kind,
					label: 'Spreadsheet'
				};
			case 'video':
				return {
					Icon: FileVideoIcon,
					iconClass: 'bg-zinc-400 text-white dark:bg-zinc-500 dark:text-white',
					kind,
					label: 'Video'
				};
			default:
				return {
					Icon: FileIcon,
					iconClass: 'bg-zinc-400 text-white dark:bg-zinc-500 dark:text-white',
					kind,
					label: 'File'
				};
		}
	}

	function removeAttachment(event: MouseEvent, fileId: string) {
		event.stopPropagation();
		attachments.remove(fileId, 'remove');
	}
</script>

{#if attachments.files.length > 0}
	<div
		bind:this={ref}
		class={cn(variant === 'compact' ? 'min-w-0 flex-1' : '', className)}
		{...restProps}
	>
		<div class={cn('flex flex-wrap', variant === 'compact' ? 'items-start gap-2' : 'gap-3')}>
			{#each attachments.files as file (file.id)}
				{@const presentation = getAttachmentPresentation(file)}
				{@const isImage = presentation.kind === 'image'}

				{#if variant === 'compact'}
					{#if isImage}
						<article class="relative overflow-hidden rounded-xl border border-border/70 bg-background/80 shadow-xs hover:border-muted-foreground/40 transition-colors duration-200">
							<PreviewImage
								alt={file.filename}
								aria-label={`Preview ${file.filename}`}
								class="block size-18 overflow-hidden rounded-xl outline-none transition-opacity hover:opacity-95 focus-visible:ring-3 focus-visible:ring-ring/50"
								src={file.url}
								title={file.filename}
							>
								<img
									alt={file.filename}
									class="size-full object-cover"
									height="72"
									width="72"
									src={file.url}
								/>
							</PreviewImage>

							<Tooltip.Root>
								<Tooltip.Trigger>
									{#snippet child({ props })}
										<Button
											{...props}
											aria-label={`Remove ${file.filename}`}
											class="absolute top-1 right-1 z-20 rounded-full bg-primary! text-foreground shadow-sm backdrop-blur hover:bg-background"
											onclick={(event) => removeAttachment(event, file.id)}
											size="icon-xs"
											variant="outline"
										>
											<XIcon class="size-3.5 text-secondary" />
											<span class="sr-only">Remove file</span>
										</Button>
									{/snippet}
								</Tooltip.Trigger>
								<Tooltip.Content side="top" sideOffset={6}>Remove file</Tooltip.Content>
							</Tooltip.Root>
						</article>
					{:else}
						<article class="relative flex min-w-0 max-w-full items-center gap-2 rounded-2xl border border-border/70 bg-background/80 px-2 py-1.5 pr-8 shadow-xs">
							<div
								class={cn(
									'flex size-10 shrink-0 items-center justify-center rounded-xl',
									presentation.iconClass
								)}
							>
								<presentation.Icon class="size-4" />
							</div>

							<div class="min-w-0">
								<p class="max-w-[10rem] truncate text-xs font-semibold text-foreground">
									{file.filename}
								</p>
								<p class="mt-0.5 text-[11px] leading-none text-muted-foreground">
									{presentation.label}
								</p>
							</div>

							<Tooltip.Root>
								<Tooltip.Trigger>
									{#snippet child({ props })}
										<Button
											{...props}
											aria-label={`Remove ${file.filename}`}
											class="absolute top-1.5 right-1.5 rounded-full bg-background/95 text-foreground shadow-sm backdrop-blur hover:bg-background"
											onclick={(event) => removeAttachment(event, file.id)}
											size="icon-xs"
											variant="outline"
										>
											<XIcon class="size-3.5" />
											<span class="sr-only">Remove file</span>
										</Button>
									{/snippet}
								</Tooltip.Trigger>
								<Tooltip.Content side="top" sideOffset={6}>Remove file</Tooltip.Content>
							</Tooltip.Root>
						</article>
					{/if}
				{:else}
					<article class="relative flex min-h-fit min-w-0 w-full items-center overflow-hidden rounded-xl border border-border/70 bg-background/80 shadow-xs sm:w-fit">
						<Tooltip.Root>
							<Tooltip.Trigger>
								{#snippet child({ props })}
									<Button
										{...props}
										aria-label={`Remove ${file.filename}`}
										class="absolute top-1 right-1 z-20 rounded-full bg-background/95 text-foreground shadow-sm backdrop-blur hover:bg-background"
										onclick={(event) => removeAttachment(event, file.id)}
										size="icon-xs"
										variant="outline"
									>
										<XIcon class="size-3.5" />
										<span class="sr-only">Remove file</span>
									</Button>
								{/snippet}
							</Tooltip.Trigger>
							<Tooltip.Content side="top" sideOffset={6}>Remove file</Tooltip.Content>
						</Tooltip.Root>

						{#if isImage}
							<PreviewImage
								alt={file.filename}
								aria-label={`Preview ${file.filename}`}
								class="flex min-w-0 flex-1 items-center gap-3 pr-6 py-2.5 pl-2 text-left transition-colors hover:bg-muted/35"
								src={file.url}
								title={file.filename}
							>
								<div class="size-14 shrink-0 overflow-hidden rounded-xl border border-border/70 bg-muted/40">
									<img
										alt={file.filename}
										class="size-full object-cover"
										height="64"
										src={file.url}
										width="64"
									/>
								</div>

								<div class="min-w-0">
									<p class="truncate pr-2 text-sm font-semibold text-foreground">
										{file.filename}
									</p>
									<p class="mt-0.5 flex items-center gap-1.5 text-sm text-muted-foreground">
										<ImageIcon class="size-3.5" />
										{presentation.label}
									</p>
								</div>
							</PreviewImage>
						{:else}
							<div class="flex min-w-0 flex-1 items-center gap-3 px-3 py-2.5 pl-3">
								<div
									class={cn(
										'flex size-14 shrink-0 items-center justify-center rounded-2xl',
										presentation.iconClass
									)}
								>
									<presentation.Icon class="size-5.5" />
								</div>

								<div class="min-w-0">
									<p class="truncate pr-2 text-sm font-semibold text-foreground">{file.filename}</p>
									<p class="mt-0.5 text-sm text-muted-foreground">{presentation.label}</p>
								</div>
							</div>
						{/if}
					</article>
				{/if}
			{/each}
		</div>
	</div>
{/if}

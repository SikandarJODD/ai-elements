import type {
	PromptInputAttachment,
	PromptInputFilesAddSource,
	PromptInputFilesRemoveSource,
	PromptInputSubmitAttachment,
	PromptInputValidationOptions,
} from "./types.js";

export function createPromptInputId(prefix = "prompt-input") {
	if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
		return `${prefix}-${crypto.randomUUID()}`;
	}

	return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

export function fileListToArray(files: File[] | FileList) {
	return Array.from(files);
}

export function revokeObjectUrl(url?: string) {
	if (url?.startsWith("blob:")) {
		URL.revokeObjectURL(url);
	}
}

export function sameAttachment(
	left: PromptInputAttachment | undefined,
	right: PromptInputAttachment | undefined,
) {
	return (
		left?.id === right?.id &&
		left?.filename === right?.filename &&
		left?.mediaType === right?.mediaType &&
		left?.url === right?.url &&
		left?.file === right?.file
	);
}

export function sameAttachmentList(left: PromptInputAttachment[], right: PromptInputAttachment[]) {
	if (left === right) {
		return true;
	}

	if (left.length !== right.length) {
		return false;
	}

	return left.every((file, index) => sameAttachment(file, right[index]));
}

export function matchesAccept(file: File, accept?: string) {
	if (!accept?.trim()) {
		return true;
	}

	const patterns = accept
		.split(",")
		.map((pattern) => pattern.trim())
		.filter(Boolean);

	return patterns.some((pattern) => {
		if (pattern.endsWith("/*")) {
			return file.type.startsWith(pattern.slice(0, -1));
		}

		return file.type === pattern;
	});
}

export function createAttachmentFromFile(file: File): PromptInputAttachment {
	return {
		filename: file.name,
		file,
		id: createPromptInputId("attachment"),
		mediaType: file.type,
		type: "file",
		url: URL.createObjectURL(file),
	};
}

export async function fileToDataUrl(file: File): Promise<string | null> {
	return new Promise((resolve) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(typeof reader.result === "string" ? reader.result : null);
		reader.onerror = () => resolve(null);
		reader.readAsDataURL(file);
	});
}

export async function attachmentToSubmitAttachment(
	attachment: PromptInputAttachment,
): Promise<PromptInputSubmitAttachment> {
	const { file, ...rest } = attachment;

	if (!file) {
		return rest;
	}

	const dataUrl = await fileToDataUrl(file);

	return {
		...rest,
		url: dataUrl ?? rest.url,
	};
}

export async function captureScreenshot(): Promise<File | null> {
	if (
		typeof window === "undefined" ||
		typeof navigator === "undefined" ||
		!navigator.mediaDevices?.getDisplayMedia
	) {
		return null;
	}

	let stream: MediaStream | null = null;
	const video = document.createElement("video");
	video.muted = true;
	video.playsInline = true;

	try {
		stream = await navigator.mediaDevices.getDisplayMedia({
			audio: false,
			video: true,
		});

		video.srcObject = stream;

		await new Promise<void>((resolve, reject) => {
			video.onloadedmetadata = () => resolve();
			video.onerror = () => reject(new Error("Failed to load screen stream"));
		});

		await video.play();

		if (!video.videoWidth || !video.videoHeight) {
			return null;
		}

		const canvas = document.createElement("canvas");
		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;

		const context = canvas.getContext("2d");
		if (!context) {
			return null;
		}

		context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

		const blob = await new Promise<Blob | null>((resolve) => {
			canvas.toBlob(resolve, "image/png");
		});

		if (!blob) {
			return null;
		}

		const timestamp = new Date()
			.toISOString()
			.replaceAll(/[:.]/g, "-")
			.replace("T", "_")
			.replace("Z", "");

		return new File([blob], `screenshot-${timestamp}.png`, {
			lastModified: Date.now(),
			type: "image/png",
		});
	} finally {
		if (stream) {
			for (const track of stream.getTracks()) {
				track.stop();
			}
		}

		video.pause();
		video.srcObject = null;
	}
}

export function getEffectiveMaxFiles(options: PromptInputValidationOptions) {
	if (typeof options.maxFiles === "number") {
		return options.maxFiles;
	}

	if (options.multiple === false) {
		return 1;
	}

	return undefined;
}

export function formatFilesAddSource(source: PromptInputFilesAddSource) {
	switch (source) {
		case "picker":
			return "upload";
		case "paste":
			return "paste";
		case "drop":
			return "drop";
		case "screenshot":
			return "screenshot";
	}
}

export function formatFilesRemoveSource(source: PromptInputFilesRemoveSource) {
	switch (source) {
		case "remove":
			return "remove";
		case "backspace":
			return "backspace";
		case "submit-clear":
			return "submit";
	}
}

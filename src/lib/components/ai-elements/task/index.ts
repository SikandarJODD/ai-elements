import Task from "./Task.svelte";
import TaskContent from "./TaskContent.svelte";
import TaskItem from "./TaskItem.svelte";
import TaskItemFile from "./TaskItemFile.svelte";
import TaskTrigger from "./TaskTrigger.svelte";

export {
	Task,
	TaskContent,
	TaskItem,
	TaskItemFile,
	TaskTrigger,
	//
	Task as Root,
	TaskTrigger as Trigger,
	TaskContent as Content,
	TaskItem as Item,
	TaskItemFile as ItemFile,
};

export type { TaskProps } from "./Task.svelte";
export type { TaskContentProps } from "./TaskContent.svelte";
export type { TaskItemProps } from "./TaskItem.svelte";
export type { TaskItemFileProps } from "./TaskItemFile.svelte";
export type { TaskTriggerProps } from "./TaskTrigger.svelte";

<script setup lang="ts">
    import type { PropType } from "vue";
    import type { Task } from "@/models/task.types";
    import type { Edit } from "@/models/edit.types";

    const props = defineProps({
        tasks: { required: true, type: Array as PropType<Task[]> },
        editObj: { required: true, type: Object as PropType<Edit> },
        taskId: { required: true, type: Number as PropType<number | undefined> },
    });
    const emit = defineEmits<{
        (event: "close"): void
        (event: "delete"): void
        (event: "open"): void
        (event: "add-note"): void
        (event: "increase"): void
        (event: "decrease"): void
    }>();

    const taskName = ref<string>(props.editObj.taskName);
    const taskRepeatCount = ref<number>(props.editObj.taskRepeatCount);
    const taskNote = ref<string | undefined>(props.editObj.taskNote);

    function addNote(): void {
        emit("add-note");
    }

    function increase(): void {
        emit("increase");
    }

    function decrease(): void {
        emit("decrease");
    }

    function closeOrDelete(type: "close" | "delete"): void {
        if (type === "close") {
            emit("close");
        } else {
            emit("delete");
        }
    }

    function shownPremium(): void {
        emit("open");
    }

    function submitEditTask(): void {
        if (taskName.value?.length && taskRepeatCount.value) {
            props.tasks.forEach((task: Task) => {
                if (task.id === props.taskId) {
                    task.work = taskName.value;
                    task.title = taskNote.value;
                    task.count = taskRepeatCount.value;
                }
                task.isEdit = true;
            });
        }
    }
</script>

<template>
    <div class="bg-white rounded-lg shadow-md pt-5 overflow-hidden">
        <input
            v-model="taskName"
            class="pl-5 pr-5 w-full rounded text-[22px] border-none text-[#555] box-border font-bold outline-none"
            type="text"
            placeholder="What are you working on?"
        >
        <div class="pl-5 pr-5 text-[#555] w-full text-start mt-5 flex flex-wrap items-end gap-1">
            <span class="w-full block pb-2 font-bold">Est Pomodoros</span>
            <input
                v-model="taskRepeatCount"
                type="number"
                min="0"
                class="mr-3 rounded bg-[#efefef] text-[16px] p-[10px] border-none text-[#555] box-border font-bold w-[75px] outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            >
            <button
                class="shadow-md text-center rounded cursor-pointer text-[14px] px-3 py-2 inline-block w-[40px] bg-white text-[#555] border border-[#dfdfdf]"
                @click="decrease()"
            >
                <div class="i-carbon-caret-down text-black opacity-60 pointer-events-none" />
            </button>
            <button
                class="shadow-md text-center rounded cursor-pointer text-[14px] px-3 py-2 inline-block w-[40px] bg-white text-[#555] border border-[#dfdfdf]"
                @click="increase()"
            >
                <div class="i-carbon-caret-up text-black opacity-60 pointer-events-none" />
            </button>
        </div>
        <div class="pl-5 pr-5 flex pt-4 gap-3 flex-wrap">
            <button
                v-if="editObj.noteShown"
                class="underline text-center rounded opacity-90 text-[14px] font-bold text-[#0006]"
                @click="addNote()"
            >
                +Add Note
            </button>
            <textarea
                v-else
                v-model="taskNote"
                class="rounded p-2 block w-full outline-none bg-[#efefef] text-[#555]"
                placeholder="Some notes"
            />
            <button
                class="underline flex gap-1 items-center text-center rounded opacity-90 text-[14px] font-bold text-[#0006]"
                @click="shownPremium"
            >
                +Add Project
                <div class="i-carbon-locked text-3" />
            </button>
        </div>
        <div class="mt-5 w-full p-4 bg-[#efefef] flex items-center gap-2 justify-between">
            <button
                class="min-w-[70px] text-[#888] font-bold text-[12px] opacity-90 text-center px-3 py-2"
                @click="closeOrDelete('delete')"
            >
                Delete
            </button>
            <div class="flex items-center gap-2 w-full justify-end">
                <button
                    class="min-w-[70px] text-[#888] font-bold text-[12px] opacity-90 text-center px-3 py-2"
                    @click="closeOrDelete('close')"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    class="shadow-md min-w-[70px] text-[#fff] inline-block rounded bg-[#222] font-bold text-[12px] text-center px-3 py-2"
                    @click="submitEditTask"
                >
                    Save
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { PropType } from "vue";
    import type { Task } from "@/models/task.types";

    const prop = defineProps({ tasks: { required: false, type: Array as PropType<Task[]> } });
    const emit = defineEmits<{
        (event: "close"): void
        (event: "open"): void
    }>();

    const noteShown = ref<boolean>(true);
    const youWork = ref<string>();
    const taskRepeat = ref<number>(0);
    const taskNote = ref<string>();

    function addNote(): void {
        noteShown.value = false;
    }
    function changeTaskRepeatCount(type: "increase" | "decrease"): void {
        if (type === "increase") {
            taskRepeat.value++;
        } else if (type === "decrease" && taskRepeat.value > 0) {
            taskRepeat.value--;
        }
    }
    function closeOrDelete(type: "close" | "delete"): void {
        if (type === "close") {
            emit("close");
        } else {
            emit("close");
        }
    }
    function shownPremium(): void {
        emit("open");
    }
    function submitAddTask(): void {
        if (youWork.value?.length && taskRepeat.value) {
            // eslint-disable-next-line vue/no-mutating-props
            prop.tasks?.push(
                { id: Date.now(), work: youWork.value, title: taskNote.value, count: taskRepeat.value, finishedCount: 0, active: false, isEdit: true, completed: false },
            );
            emit("close");
        }
    }
</script>

<template>
    <div class="bg-white rounded-lg shadow-md pt-5 overflow-hidden">
        <input
            v-model="youWork"
            class="pl-5 pr-5 w-full rounded text-[22px] border-none text-[#555] box-border font-bold outline-none"
            type="text"
            placeholder="What are you working on?"
        >
        <div class="pl-5 pr-5 text-[#555] w-full text-start mt-5 flex flex-wrap items-end gap-1">
            <span class="w-full block pb-2 font-bold">Est Pomodoros</span>
            <input
                v-model="taskRepeat"
                type="number"
                min="0"
                class="mr-3 rounded bg-[#efefef] text-[16px] p-[10px] border-none text-[#555] box-border font-bold w-[75px] outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            >
            <button
                class="shadow-md text-center rounded cursor-pointer text-[14px] px-3 py-2 inline-block w-[40px] bg-white text-[#555] border border-[#dfdfdf]"
                @click="changeTaskRepeatCount('decrease')"
            >
                <div class="i-carbon-caret-down text-black opacity-60 pointer-events-none" />
            </button>
            <button
                class="shadow-md text-center rounded cursor-pointer text-[14px] px-3 py-2 inline-block w-[40px] bg-white text-[#555] border border-[#dfdfdf]"
                @click="changeTaskRepeatCount('increase')"
            >
                <div class="i-carbon-caret-up text-black opacity-60 pointer-events-none" />
            </button>
        </div>
        <div class="pl-5 pr-5 flex pt-4 gap-3 flex-wrap">
            <button
                v-if="noteShown"
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
                    @click="submitAddTask"
                >
                    Save
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    const taskDialogShown = ref<boolean>(false);

    function close(): void {
        taskDialogShown.value = false;
    }
    function open(): void {
        taskDialogShown.value = true;
    }
</script>

<template>
    <form @submit.prevent>
        <div class="m-auto max-w-[480px] w-full mt-5">
            <div class="relative flex items-center justify-between mb-5 pb-[14px] border-w-[2px] border-b-2px border-b-[#fff9]">
                <span class="text-[18px] font-bold tracking-widest">Task</span>
                <button
                    class="px-[1px] py-[1px] bg-[#fff3] rounded shadow"
                    @click="open"
                >
                    <div i-carbon-overflow-menu-vertical class="font-extrabold text-[24px] pointer-events-none" />
                </button>
                <TasksDialog :show="taskDialogShown" @close="close" />
            </div>
        </div>
    </form>
</template>

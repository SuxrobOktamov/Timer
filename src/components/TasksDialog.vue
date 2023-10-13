<script setup lang="ts">
    import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from "@headlessui/vue";

    const emit = defineEmits<{
        (event: "close"): void
    }>();

    function close(): void {
        emit("close");
    }
</script>

<template>
    <TransitionRoot as="template">
        <Dialog as="div" class="relative z-10" @close="close">
            <div class="absolute right-[-17rem] top-[-262rem] inset-0 z-10">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild
                        as="template"
                        enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all">
                            <div class="w-[210px]  rounded py-1 shadow-md bg-white">
                                <button class="gap-1 flex items-center text-[#4f2b2d] px-[16px] py-[10px] text-[14px]">
                                    <div i-carbon-trash-can class="font-black" />
                                    <span>Clear finished tasks</span>
                                </button>
                                <button class="gap-1 flex items-center text-[#4f2b2d] px-[16px] py-[10px] text-[14px]">
                                    <div i-carbon-checkmark class="font-black" />
                                    <span>Clear act pomodoros</span>
                                </button>
                                <button class="gap-1 flex items-center text-[#4f2b2d] px-[16px] py-[10px] text-[14px]">
                                    <div i-carbon-save class="font-black" />
                                    <span>Save as template</span>
                                </button>
                                <button class="gap-1 flex items-center text-[#4f2b2d] px-[16px] py-[10px] text-[14px]">
                                    <div i-carbon-add class="font-black" />
                                    <span>Add from templates</span>
                                </button>
                                <button class="gap-1 flex items-center text-[#4f2b2d] px-[16px] py-[10px] text-[14px]">
                                    <div i-carbon-ibm-data-replication class="font-black" />
                                    <span>Import from Todoist</span>
                                    <div i-carbon-locked class="font-black" />
                                </button>
                                <button class="gap-1 flex items-center text-[#4f2b2d] px-[16px] py-[10px] text-[14px]">
                                    <div i-carbon-trash-can class="font-black" />
                                    <span>Clear all tasks</span>
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

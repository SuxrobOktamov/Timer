<script setup lang="ts">
    import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from "@headlessui/vue";

    const emit = defineEmits<{
        (event: "close"): void

    }>();

    function close() {
        emit("close");
    }
</script>

<template>
    <TransitionRoot as="template">
        <Dialog as="div" class="relative z-10" @close="close">
            <TransitionChild
                as="template"
                enter="ease-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in duration-200"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="relative flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild
                        as="template"
                        enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm">
                            <div
                                i-carbon-close
                                class="text-[24px] text-[#575757] absolute cursor-pointer top-2 right-2 font-"
                                aria-hidden="true"
                                @click="close"
                            />
                            <div class="text-start">
                                <DialogTitle as="h3" class="p-4 border-b text-[16px] font-bold leading-7 text-[#575757]">
                                    Setting
                                </DialogTitle>
                                <slot name="timer" />
                                <SettingsDialogTask />
                                <SettingsDialogSound />
                                <SettingsDialogTheme />
                                <SettingsDialogNotification />
                                <SettingsDialogIntegration />
                                <div class="p-5 bg-[#efefef] text-end">
                                    <button class="bg-[#000] text-white px-4 py-1 shadow-md rounded" @click="close">
                                        Ok
                                    </button>
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

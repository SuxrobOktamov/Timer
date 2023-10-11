<!-- eslint-disable no-alert -->
<script setup lang="ts">
    import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from "@headlessui/vue";
    const emit = defineEmits(["close"]);
    function handleClose(type: "close") {
        emit("close", type);
    }
</script>

<template>
    <TransitionRoot as="template">
        <Dialog as="div" class="relative z-10" @close="handleClose('close')">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="relative flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm">
                            <div i-carbon-close class="text-[24px] text-[#575757] absolute cursor-pointer top-2 right-2 font-" aria-hidden="true" @click="handleClose('close')" />
                            <div class="text-start">
                                <DialogTitle as="h3" class="p-4 border-b text-[16px] font-bold leading-7 text-[#575757]">
                                    Setting
                                </DialogTitle>
                                <div id="timer" class="py-4 px-6">
                                    <div class="uppercase mt-[4px] flex items-center gap-1 text-[#bdbdbd] font-bold text-[16px]">
                                        <div i-carbon-time class="text-[16px] font-bold" /> Timer
                                    </div>
                                    <div class="mt-[20px] flex items-center gap-1 text-[#000] text-[16px]">
                                        Time (minutes)
                                    </div>
                                    <div class="mt-[10px] flex gap-5">
                                        <div class="flex flex-col gap-1 w-full">
                                            <label class="text-[#bbb] font-black text-[14px]">
                                                Pomodoro
                                            </label>
                                            <input value="1" class="w-full bg-[#efefef] text-[#555] rounded p-2 outline-none" type="number">
                                        </div>
                                        <div class="flex flex-col gap-1 w-full">
                                            <label class="text-[#bbb] font-black text-[14px]">
                                                Short Break
                                            </label>
                                            <input value="1" class="w-full bg-[#efefef] text-[#555] rounded p-2 outline-none" type="number">
                                        </div>
                                        <div class="flex flex-col gap-1 w-full">
                                            <label class="text-[#bbb] font-black text-[14px]">
                                                Long break
                                            </label>
                                            <input value="1" class="w-full bg-[#efefef] text-[#555] rounded p-2 outline-none" type="number">
                                        </div>
                                    </div>
                                    <div class="flex items-center justify-between mt-4">
                                        <span>Auto Start Breaks</span>
                                        <div class="cursor-pointer w-[60px] h-[30px] p-[2px] relative rounded-full bg-[#ccc]">
                                            <div class="w-[26px] h-[26px] rounded-full bg-white pointer-events-none" />
                                        </div>
                                    </div>
                                    <div class="flex items-center justify-between mt-4">
                                        <span>Auto Start Pomodoros</span>
                                        <div class="cursor-pointer w-[60px] h-[30px] p-[2px] relative rounded-full bg-[#ccc]">
                                            <div class="w-[26px] h-[26px] rounded-full bg-white pointer-events-none" />
                                        </div>
                                    </div>
                                    <div class="border-b border-b-2px flex items-center justify-between mt-4 pb-10">
                                        <span>Long Break interval</span>
                                        <input value="1" class="w-[70px] bg-[#efefef] text-[#555] rounded p-2 outline-none" type="number">
                                    </div>
                                </div>
                                <div id="task" class="px-6 pb-4">
                                    <div class="uppercase mt-[4px] flex items-center gap-1 text-[#bdbdbd] font-bold text-[16px]">
                                        <div i-carbon-task-complete class="text-[16px] font-bold" /> Task
                                    </div>
                                    <div class="flex items-center justify-between mt-4">
                                        <span class="flex items-center gap-2">
                                            Auto Check Tasks
                                        </span>
                                        <div class="cursor-pointer w-[60px] h-[30px] p-[2px] relative rounded-full bg-[#ccc]">
                                            <div class="w-[26px] h-[26px] rounded-full bg-white toggle" />
                                        </div>
                                    </div>
                                    <div class="flex items-center justify-between mt-4 border-b border-b-2px pb-10">
                                        <span class="flex items-center gap-2">
                                            Auto Switch Tasks
                                        </span>
                                        <div class="cursor-pointer w-[60px] h-[30px] p-[2px] relative rounded-full bg-[#ccc]">
                                            <div class="w-[26px] h-[26px] rounded-full bg-white toggle" />
                                        </div>
                                    </div>
                                </div>
                                <div id="sound" class="px-6 pb-4">
                                    <div class="uppercase mt-[4px] flex items-center gap-1 text-[#bdbdbd] font-bold text-[16px]">
                                        <div i-carbon-volume-up-filled class="text-[16px] font-bold" /> Sound
                                    </div>
                                    <div class="flex flex-wrap items-center justify-between mt-4 gap-y-2">
                                        <span>Alarm Sound</span>
                                        <div class="text-[14px] relative flex items-center justify-between text-[#787878] cursor-pointer w-[130px] p-[10px] rounded bg-[#ebebeb]">
                                            Wood <div i-carbon-caret-down class="text-[18px]" />
                                        </div>
                                        <div class="w-full text-end flex items-center justify-end gap-1">
                                            <label>100</label>
                                            <input type="range" min="0" max="100" class="focus:outline-none appearance-none rounded-full h-[7px]  bg-[#ccc]">
                                        </div>
                                    </div>
                                    <div class="flex flex-wrap items-center justify-between mt-4 gap-y-2 border-b border-b-2px pb-10">
                                        <span> Ticking Sound</span>
                                        <div class="text-[14px] flex items-center justify-between text-[#787878] cursor-pointer w-[130px] p-[10px] relative rounded bg-[#ebebeb]">
                                            Bell<div i-carbon-caret-down class="text-[18px]" />
                                        </div>
                                        <div class="w-full text-end flex items-center justify-end gap-1">
                                            <label>100</label>
                                            <input type="range" min="0" max="100" class="focus:outline-none appearance-none rounded-full h-[7px]  bg-[#ccc]">
                                        </div>
                                    </div>
                                </div>
                                <div id="theme" class="px-6 pb-4">
                                    <div class="uppercase mt-[4px] flex items-center gap-1 text-[#bdbdbd] font-bold text-[16px]">
                                        <div i-carbon-interactive-segmentation-cursor class="text-[16px] font-bold" /> Theme
                                    </div>
                                    <div class="flex items-center justify-between mt-4">
                                        <span class="flex items-center gap-2">Color Themes </span>
                                        <div class="flex items-center justify-center gap-3">
                                            <div class="cursor-pointer w-7 h-7 rounded-md" />
                                            <div class="cursor-pointer w-7 h-7 rounded-md" />
                                            <div class="cursor-pointer w-7 h-7 rounded-md" />
                                        </div>
                                    </div>
                                    <div class="flex items-center justify-between mt-5">
                                        <span class="flex items-center gap-2">Dark Mode when running </span>
                                        <div class="cursor-pointer w-[60px] h-[30px] p-[2px] relative rounded-full bg-[#ccc]">
                                            <div class="w-[26px] h-[26px] rounded-full bg-white toggle" />
                                        </div>
                                    </div>
                                    <div class="flex flex-wrap items-center justify-between mt-5 gap-y-2 border-b border-b-2px pb-10">
                                        <span> Small Window</span>
                                        <button class="text-[14px] flex items-center justify-between text-[#787878] cursor-pointer w-[80px] p-[8px] relative shadow-md border rounded bg-[#fff]">
                                            Open<div i-carbon-chat-launch class="text-[18px] pointer-events-none" />
                                        </button>
                                    </div>
                                </div>
                                <div id="notification" class="px-6 pb-4">
                                    <div class="uppercase mt-[4px] flex items-center gap-1 text-[#bdbdbd] font-bold text-[16px]">
                                        <div i-carbon-notification class="text-[16px] font-bold" /> Notification
                                    </div>
                                    <div class="flex items-center justify-between mt-4">
                                        <span class="flex items-center gap-2">Reminder</span>
                                        <div class="flex items-center gap-2">
                                            <div class="text-[14px] relative flex items-center justify-between text-[#787878] cursor-pointer w-[80px] p-[10px] rounded bg-[#ebebeb]">
                                                Every<div i-carbon-caret-down class="text-18px" />
                                            </div>
                                            <input value="1" class="w-[80px] bg-[#efefef] text-[#555] rounded p-2 outline-none" type="number">
                                            <span>min</span>
                                        </div>
                                    </div>
                                    <div class="flex items-center justify-between mt-4 border-b border-b-2px pb-10">
                                        <span class="flex items-center gap-2">Mobile Alarm <div i-carbon-information-filled class="text-[#bdbdbd] cursor-pointer" /></span>
                                        <button class="gap-1 flex items-center underline text-[#4f2b2d] px-[16px] py-[10px] text-[14px]">
                                            <div i-carbon-add class="font-black pointer-events-none" />
                                            <span class="pointer-events-none">Add this device</span>
                                        </button>
                                    </div>
                                </div>
                                <div class="px-6 pb-4">
                                    <div class="uppercase mt-[4px] flex items-center gap-1 text-[#bdbdbd] font-bold text-[16px]">
                                        <div i-carbon-arrows-horizontal class="text-[16px] font-bold" /> Integration
                                    </div>
                                    <div class="flex items-center justify-between mt-4">
                                        <span class="flex items-center gap-2">Todoist <div i-carbon-information-filled class="text-[#bdbdbd] cursor-pointer" /></span>
                                        <button class="text-[14px] flex items-center justify-between text-[#787878] cursor-pointer w-[100px] p-[8px] relative shadow-md border rounded bg-[#fff]">
                                            Connect<div i-carbon-locked class="text-[14px] pointer-events-none" />
                                        </button>
                                    </div>
                                    <div class="flex items-center justify-between mt-4 pb-10">
                                        <span class="flex items-center gap-2">Webhook<div i-carbon-information-filled class="text-[#bdbdbd] cursor-pointer" /></span>
                                        <button class="text-[14px] flex items-center justify-between text-[#787878] cursor-pointer w-[70px] p-[8px] relative shadow-md border rounded bg-[#fff]">
                                            Add<div i-carbon-locked class="text-[14px] pointer-events-none" />
                                        </button>
                                    </div>
                                </div>
                                <div class="p-5 bg-[#efefef] text-end">
                                    <button class="bg-[#000] text-white px-4 py-1 shadow-md rounded">
                                        Save
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

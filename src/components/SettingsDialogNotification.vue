<script lang="ts" setup>
    import { BellIcon } from "@heroicons/vue/24/outline";
    import { InformationCircleIcon } from "@heroicons/vue/24/solid";

    const alarmShown = ref<boolean>(false);

    function close(): void {
        alarmShown.value = false;
    }

    function open(): void {
        alarmShown.value = true;
    }
</script>

<template>
    <div class="px-6 pb-4">
        <div class="uppercase mt-[4px] flex items-center gap-1 text-[#bdbdbd] font-bold text-[16px]">
            <BellIcon class="text-[16px] font-bold w-[1.2rem]" />  Notification
            <NotificationMobileInfoDialog :show="alarmShown" @close="close" />
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
            <span class="flex items-center gap-2">Mobile Alarm <InformationCircleIcon class="w-[1.2rem] text-[#bdbdbd] cursor-pointer" @click="open" /></span>
            <button class="gap-1 flex items-center underline text-[#4f2b2d] px-[16px] py-[10px] text-[14px]">
                <div i-carbon-add class="font-black pointer-events-none" />
                <span class="pointer-events-none">Add this device</span>
            </button>
        </div>
    </div>
</template>

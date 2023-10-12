<script lang="ts" setup>
    import { SwatchIcon } from "@heroicons/vue/24/outline";
</script>

<template>
    <div class="px-6 pb-4">
        <div class="uppercase mt-[4px] flex items-center gap-1 text-[#bdbdbd] font-bold text-[16px]">
            <SwatchIcon class="text-[16px] font-bold w-[1.2rem]" />  Theme
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
</template>

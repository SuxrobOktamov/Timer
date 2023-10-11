<script lang="ts" setup>
    import { SpeakerWaveIcon } from "@heroicons/vue/24/outline";
</script>

<template>
    <div class="px-6 pb-4">
        <div class="uppercase mt-[4px] flex items-center gap-1 text-[#bdbdbd] font-bold text-[16px]">
            <SpeakerWaveIcon class="text-[16px] font-bold w-[1.2rem]" /> Sound
        </div>
        <div class="flex flex-wrap items-center justify-between mt-4 gap-y-2">
            <span>Alarm Sound</span>
            <div class="text-[14px] relative flex items-center justify-between text-[#787878] cursor-pointer w-[130px] p-[10px] rounded bg-[#ebebeb]">
                Wood <div i-carbon-caret-down class="text-[18px]" />
            </div>
            <div class="w-full text-end flex items-center justify-end gap-1">
                <label>100</label>
                <input
                    type="range"
                    min="0"
                    max="100"
                    class="focus:outline-none appearance-none rounded-full h-[7px]  bg-[#ccc]"
                >
            </div>
        </div>
        <div class="flex flex-wrap items-center justify-between mt-4 gap-y-2 border-b border-b-2px pb-10">
            <span> Ticking Sound</span>
            <div class="text-[14px] flex items-center justify-between text-[#787878] cursor-pointer w-[130px] p-[10px] relative rounded bg-[#ebebeb]">
                Bell<div i-carbon-caret-down class="text-[18px]" />
            </div>
            <div class="w-full text-end flex items-center justify-end gap-1">
                <label>100</label>
                <input
                    type="range"
                    min="0"
                    max="100"
                    class="focus:outline-none appearance-none rounded-full h-[7px]  bg-[#ccc]"
                >
            </div>
        </div>
    </div>
</template>

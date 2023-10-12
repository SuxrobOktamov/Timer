<script lang="ts" setup>
    import { ClipboardDocumentCheckIcon } from "@heroicons/vue/24/outline";
</script>

<template>
    <div class="px-6 pb-4">
        <div class="uppercase mt-[4px] flex items-center gap-1 text-[#bdbdbd] font-bold text-[16px]">
            <ClipboardDocumentCheckIcon class="text-[16px] font-bold w-[1.2rem]" /> Task
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
</template>

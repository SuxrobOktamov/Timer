<script lang="ts" setup>
    import { ArrowsRightLeftIcon, LockClosedIcon } from "@heroicons/vue/24/outline";
    import { InformationCircleIcon } from "@heroicons/vue/24/solid/";

    const isTodoist = ref<boolean>(false);
    const isWebhook = ref<boolean>(false);
    const isPremium = ref<boolean>(false);

    function openHandler(type: "todo" | "web" | "premium"): void {
        // eslint-disable-next-line max-statements-per-line
        if (type === "todo") { isTodoist.value = true; }
        // eslint-disable-next-line max-statements-per-line
        if (type === "web") { isWebhook.value = true; }
        // eslint-disable-next-line max-statements-per-line
        if (type === "premium") { isPremium.value = true; }
    }

    function closeHandler(): void {
        isTodoist.value = false;
        isWebhook.value = false;
        isPremium.value = false;
    }
</script>

<template>
    <div class="px-6 pb-4">
        <div class="uppercase mt-[4px] flex items-center gap-1 text-[#bdbdbd] font-bold text-[16px]">
            <ArrowsRightLeftIcon class="text-[16px] font-bold w-[1.2rem]" /> Integration
        </div>
        <div class="flex items-center justify-between mt-4">
            <span class="flex items-center gap-2">Todoist <InformationCircleIcon class="text-[#bdbdbd] cursor-pointer w-[1.2rem]" @click="openHandler('todo')" /></span>
            <button class="text-[14px] flex items-center justify-between text-[#787878] cursor-pointer w-[100px] p-[8px] relative shadow-md border rounded bg-[#fff]" @click="openHandler('premium')">
                Connect<LockClosedIcon class="w-[1.2rem] text-[14px] pointer-events-none" />
            </button>
            <TodoistDialog :show="isTodoist" @close="closeHandler" />
        </div>
        <div class="flex items-center justify-between mt-4 pb-10">
            <span class="flex items-center gap-2">Webhook<InformationCircleIcon class="w-[1.2rem] text-[#bdbdbd] cursor-pointer" @click="openHandler('web')" /></span>
            <button class="text-[14px] flex items-center justify-between text-[#787878] cursor-pointer w-[70px] p-[8px] relative shadow-md border rounded bg-[#fff]" @click="openHandler('premium')">
                Add<LockClosedIcon class="w-[1.2rem] text-[14px] pointer-events-none" />
            </button>
            <WebhookDialog :show="isWebhook" @close="closeHandler" />
        </div>
        <PremiumDialog :show="isPremium" @close="closeHandler" />
    </div>
</template>

<script lang="ts" setup>
    import { ArrowsRightLeftIcon, LockClosedIcon } from "@heroicons/vue/24/outline";
    import { InformationCircleIcon } from "@heroicons/vue/24/solid/";

    const todoistShown = ref<boolean>(false);
    const webhookShown = ref<boolean>(false);
    const premiumShown = ref<boolean>(false);

    function openTodo(): void {
        todoistShown.value = true;
    }

    function openWeb(): void {
        webhookShown.value = true;
    }

    function openPremium(): void {
        premiumShown.value = true;
    }
</script>

<template>
    <div class="px-6 pb-4">
        <div class="uppercase mt-[4px] flex items-center gap-1 text-[#bdbdbd] font-bold text-[16px]">
            <ArrowsRightLeftIcon class="text-[16px] font-bold w-[1.2rem]" /> Integration
        </div>
        <div class="flex items-center justify-between mt-4">
            <span class="flex items-center gap-2">Todoist <InformationCircleIcon class="text-[#bdbdbd] cursor-pointer w-[1.2rem]" @click="openTodo()" /></span>
            <button class="text-[14px] flex items-center justify-between text-[#787878] cursor-pointer w-[100px] p-[8px] relative shadow-md border rounded bg-[#fff]" @click="openPremium()">
                Connect<LockClosedIcon class="w-[1.2rem] text-[14px] pointer-events-none" />
            </button>
            <IntegrationTodoistInfoDialog v-model="todoistShown" />
        </div>
        <div class="flex items-center justify-between mt-4 pb-10">
            <span class="flex items-center gap-2">Webhook<InformationCircleIcon class="w-[1.2rem] text-[#bdbdbd] cursor-pointer" @click="openWeb()" /></span>
            <button class="text-[14px] flex items-center justify-between text-[#787878] cursor-pointer w-[70px] p-[8px] relative shadow-md border rounded bg-[#fff]" @click="openPremium()">
                Add<LockClosedIcon class="w-[1.2rem] text-[14px] pointer-events-none" />
            </button>
            <IntegrationWebhookInfoDialog v-model="webhookShown" />
        </div>
        <PremiumDialog v-model="premiumShown" />
    </div>
</template>

<script lang="ts" setup>
    import { ArrowsRightLeftIcon, LockClosedIcon } from "@heroicons/vue/24/outline";
    import { InformationCircleIcon } from "@heroicons/vue/24/solid/";

    const todoistShown = ref<boolean>(false);
    const webhookShown = ref<boolean>(false);
    const premiumShown = ref<boolean>(false);

    function open(type: "todo" | "web" | "premium"): void {
        if (type === "todo") {
            todoistShown.value = true;
        }
        if (type === "web") {
            webhookShown.value = true;
        }
        if (type === "premium") {
            premiumShown.value = true;
        }
    }

    function close(): void {
        todoistShown.value = false;
        webhookShown.value = false;
        premiumShown.value = false;
    }
</script>

<template>
    <div class="px-6 pb-4">
        <div class="uppercase mt-[4px] flex items-center gap-1 text-[#bdbdbd] font-bold text-[16px]">
            <ArrowsRightLeftIcon class="text-[16px] font-bold w-[1.2rem]" /> Integration
        </div>
        <div class="flex items-center justify-between mt-4">
            <span class="flex items-center gap-2">Todoist <InformationCircleIcon class="text-[#bdbdbd] cursor-pointer w-[1.2rem]" @click="open('todo')" /></span>
            <button class="text-[14px] flex items-center justify-between text-[#787878] cursor-pointer w-[100px] p-[8px] relative shadow-md border rounded bg-[#fff]" @click="open('premium')">
                Connect<LockClosedIcon class="w-[1.2rem] text-[14px] pointer-events-none" />
            </button>
            <IntegrationTodoistInfoDialog :show="todoistShown" @close="close" />
        </div>
        <div class="flex items-center justify-between mt-4 pb-10">
            <span class="flex items-center gap-2">Webhook<InformationCircleIcon class="w-[1.2rem] text-[#bdbdbd] cursor-pointer" @click="open('web')" /></span>
            <button class="text-[14px] flex items-center justify-between text-[#787878] cursor-pointer w-[70px] p-[8px] relative shadow-md border rounded bg-[#fff]" @click="open('premium')">
                Add<LockClosedIcon class="w-[1.2rem] text-[14px] pointer-events-none" />
            </button>
            <IntegrationWebhookInfoDialog :show="webhookShown" @close="close" />
        </div>
        <PremiumDialog :show="premiumShown" @close="close" />
    </div>
</template>

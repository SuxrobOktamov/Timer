<script lang="ts" setup>
    import { BellIcon } from "@heroicons/vue/24/outline";
    import { InformationCircleIcon } from "@heroicons/vue/24/solid";

    const alarmShown = ref<boolean>(false);
    const shownType = ref<boolean>(false);
    const showName = ref<"Every" | "Last">("Every");

    function close(): void {
        alarmShown.value = false;
    }

    function open(): void {
        alarmShown.value = true;
    }

    function addDevice(): void {
        // eslint-disable-next-line no-alert
        alert("Please log in use this feature.");
    }

    function changeType(id: number): void {
        if (id === 1) {
            shownType.value = !shownType.value;
        } else if (id === 2) {
            showName.value = "Every";
            shownType.value = true;
        } else {
            showName.value = "Last";
            shownType.value = true;
        }
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
                <div class="text-[14px] relative flex items-center justify-between text-[#787878] cursor-pointer w-[80px] p-[10px] rounded bg-[#ebebeb]" @click="changeType(1)">
                    {{ showName }}<div i-carbon-caret-down class="text-18px" />
                    <div v-if="shownType" class="py-2 absolute w-full right-0 top-11 bg-white rounded-md border shadow-2xl z-[999999]">
                        <div class="p-3 box-border" @click="changeType(2)">
                            Every
                        </div>
                        <div class="p-3 box-border" @click="changeType(3)">
                            Last
                        </div>
                    </div>
                </div>
                <input value="1" class="w-[80px] bg-[#efefef] text-[#555] rounded p-2 outline-none" type="number">
                <span>min</span>
            </div>
        </div>
        <div class="flex items-center justify-between mt-4 border-b border-b-2px pb-10">
            <span class="flex items-center gap-2">Mobile Alarm <InformationCircleIcon class="w-[1.2rem] text-[#bdbdbd] cursor-pointer" @click="open" /></span>
            <button class="gap-1 flex items-center underline text-[#4f2b2d] px-[16px] py-[10px] text-[14px]" @click="addDevice">
                <div i-carbon-add class="font-black pointer-events-none" />
                <span class="pointer-events-none">Add this device</span>
            </button>
        </div>
    </div>
</template>

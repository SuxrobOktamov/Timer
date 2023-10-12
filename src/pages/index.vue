<script setup lang="ts">
    import type { btn } from "@/types";

    defineProps({ bgColor: { required: true, type: String } });

    const emit = defineEmits<{
        (event: "change", color: string): void
    }>();

    const buttons = ref<btn[]>([
        { name: "Pomodoro", id: 1, active: true, time: 25, color: "#ba4949", spendTime: "Time to focus!" },
        { name: "Short Break", id: 2, active: false, time: 5, color: "#38858a", spendTime: "Time for a break!" },
        { name: "Long Break", id: 3, active: false, time: 15, color: "#397097", spendTime: "Time for a break!" },
    ]);

    const overTime = computed<number>(() => {
        const time = buttons.value.find(item => item.active) as btn;
        return time.time;
    });

    const overSecond = ref<string>("00");
    const isStart = ref<boolean>(false);

    function changeButtonHandler(id: number, color: string): void {
        emit("change", color);
        buttons.value.map<btn>((item) => {
            if (item.id === id) {
                item.active = true;
            } else {
                item.active = false;
            }
            return item;
        });
    }
    function playHandler(): void {
        isStart.value = !isStart.value;
    }
</script>

<template>
    <div class="w-full text-center px-2 mx-auto max-w-[620px]">
        <div class="h-2px rounded-full bg-white mb-[40px]" :style="{ width: `${0}%` }" />
        <div class="m-auto max-w-[480px] w-full pt-[20px] pb-[30px] rounded-6px bg-[#ffffff1a] shadow-md">
            <div class="flex justify-center gap-1 lt-sm:gap-1">
                <button
                    v-for="button in buttons"
                    :key="button.id"
                    :style="{ backgroundColor: `${button.active ? '#00000026' : 'transparent'}` }"
                    class="overflow-hidden capitalize lt-sm:h-[28px] lt-sm:text-[14px] rounded-[4px] text-[16px] px-[12px] py-[2px] h-[28px] cursor-pointer text-white font-bold"
                    @click="changeButtonHandler(button.id, button.color)"
                >
                    {{ button.name }}
                </button>
            </div>
            <div class="tracking-tighter text-[100px] font-bold mt-5 text-center lt-sm:mt-4 lt-sm:text-[70px]">
                {{ overTime >= 10 ? overTime : `0${overTime}` }} : {{ overSecond }}
            </div>
            <div class="relative w-full text-center flex items-center justify-center">
                <button
                    :style="{ color: bgColor }"
                    :class="isStart ? 'stop' : 'starts'"
                    class="uppercase lt-sm:w-[170px] lt-sm:h-[45px] lt-sm:text-[20px]"
                    @click="playHandler"
                >
                    {{ isStart ? 'pause' : 'start' }}
                </button>
                <button v-if="isStart" class="absolute right-15 top-8 opacity-90">
                    <div i-carbon-skip-forward-filled class="text-[28px]" />
                </button>
            </div>
        </div>
    </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>

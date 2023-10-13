<script setup lang="ts">
    import type { Button } from "../models/button.types";
    import type { Song } from "../models/song.types";

    const PomofocusStore = usePomofocusStore();

    const buttons = ref<Button[]>([
        { name: "Pomodoro", id: 1, active: true, time: 1, color: "#ba4949", spendTime: "Time to focus!" },
        { name: "Short Break", id: 2, active: false, time: 5, color: "#38858a", spendTime: "Time for a break!" },
        { name: "Long Break", id: 3, active: false, time: 15, color: "#397097", spendTime: "Time for a break!" },
    ]);
    const tickingSongArr = ref<Song[]>([
        { path: "", id: 0, name: "None" },
        { path: "/src/assets/audio/tickingSong/Ticking_fast.mp3", id: 1, name: "Ticking Fast" },
        { path: "/src/assets/audio/tickingSong/ticking_slow.mp3", id: 2, name: "Ticking Slow" },
        { path: "/src/assets/audio/tickingSong/white_noise.mp3", id: 3, name: "White Noise" },
        { path: "/src/assets/audio/tickingSong/brown_noise.mp3", id: 4, name: "Brown Noise" },
    ]);
    const alarmSongArr = ref<Song[]>([
        { path: "/src/assets/audio/alarmSong/bell.mp3", id: 0, name: "Bell" },
        { path: "/src/assets/audio/alarmSong/bird.mp3", id: 1, name: "Bird" },
        { path: "/src/assets/audio/alarmSong/digital.mp3", id: 2, name: "Digital" },
        { path: "/src/assets/audio/alarmSong/kitchen.mp3", id: 3, name: "Kitchen" },
        { path: "/src/assets/audio/alarmSong/wood.mp3", id: 4, name: "Wood" },
    ]);

    const borderW = ref<number>(0);
    const overSecond = ref<string>("00");
    const second = ref<number>(60);
    const isStart = ref<boolean>(false);
    const updateMinute = ref<any>();
    const updateSecond = ref<any>();
    const freshStart = ref<boolean>(false);
    const timerSoundChange = ref<number>(3);
    const startSoundChange = ref<number>(2);
    const finishedPomos = ref<number>(1);

    const startSound = document.createElement("audio");
    const timerSound = document.createElement("audio");
    const taskEndSound = document.createElement("audio");

    const overTime = computed<number>(() => {
        const time = buttons.value.find(item => item.active) as Button;
        if (freshStart.value) {
            return time.time - 1;
        } else {
            return time.time;
        }
    });
    const spendTime = computed<string>(() => {
        const focus = buttons.value.find(item => item.active) as Button;
        return focus.spendTime;
    });

    function changeButton(id: number, color: string): void {
        PomofocusStore.bgColor = color;
        timerSound.pause();
        buttons.value.map<Button>((item) => {
            if (item.id === id) {
                item.active = true;
                refreshTimer();
            } else {
                item.active = false;
            }
            return item;
        });
    }
    function startTimer(): void {
        isStart.value = !isStart.value;
        if (isStart.value) {
            const borderLength = ref<number>((100 / (overTime.value * 60)));
            if (!(overTime.value === 0 && overSecond.value === "00")) {
                updateSecond.value = setInterval(() => {
                    second.value--;
                    borderW.value += borderLength.value;
                    if (second.value >= 0 && second.value < 10) {
                        overSecond.value = `0${second.value}`;
                    } else if (second.value > 0 && second.value >= 10) {
                        overSecond.value = `${second.value}`;
                    } else {
                        second.value = 60;
                    }
                }, 1000);
                setTimeout(() => {
                    freshStart.value = true;
                }, 1000);
            }
            updateMinute.value = setInterval(() => {
                buttons.value.forEach((item: Button) => {
                    if (item.active) {
                        item.time--;
                    }
                });
            }, 1000 * 60);
        } else {
            clearInterval(updateMinute.value);
            clearInterval(updateSecond.value);
        }
    }
    function finishedTasks(): void {
        if (overTime.value === 0 && second.value === 0) {
            taskEndSound.play();
            refreshTimer();
            nextTimer();
            finishedPomos.value++;
        }
    }
    function refreshTimer(): void {
        borderW.value = 0;
        clearInterval(updateMinute.value);
        clearInterval(updateSecond.value);
        isStart.value = false;
        freshStart.value = false;
        second.value = 60;
        overSecond.value = "00";
    }
    function nextTimer(): void {
        timerSound.pause();
        refreshTimer();
        if (buttons.value[0].active) {
            buttons.value.forEach((item: Button) => item.active = false);
            buttons.value[1].active = true;
            PomofocusStore.bgColor = buttons.value[1].color;
        } else if (buttons.value[1].active) {
            buttons.value.forEach((item: Button) => item.active = false);
            buttons.value[0].active = true;
            PomofocusStore.bgColor = buttons.value[0].color;
        } else {
            buttons.value.forEach((item: Button) => item.active = false);
            buttons.value[0].active = true;
            PomofocusStore.bgColor = buttons.value[0].color;
        }
    }
    function playTimer(): void {
        startTimer();
        loadSong();
        playSong();
    }
    function loadSong(): void {
        startSound.src = "/src/assets/audio/start-13691.mp3";
        startSound.load();
        timerSound.src = tickingSongArr.value[timerSoundChange.value].path as string;
        timerSound.load();
        taskEndSound.src = alarmSongArr.value[startSoundChange.value].path as string;
        taskEndSound.load();
    }
    function playSong(): void {
        startSound.play();
        if (!isStart.value) {
            timerSound.pause();
            timerSound.loop = false;
        } else if (buttons.value[0].active) {
            if (!(overTime.value === 0 && overSecond.value === "00")) {
                timerSound.play();
                timerSound.loop = true;
            }
        }
    }

    watch(overSecond, () => {
        finishedTasks();
    });
</script>

<template>
    <div class="w-full text-center px-2 mx-auto max-w-[620px]">
        <div class="h-2px rounded-full bg-white mb-[40px]" :style="{ width: `${borderW}%` }" />
        <div class="m-auto max-w-[480px] w-full pt-[20px] pb-[30px] rounded-6px bg-[#ffffff1a] shadow-md">
            <div class="flex justify-center gap-1 lt-sm:gap-1">
                <button
                    v-for="button in buttons"
                    :key="button.id"
                    :style="{ backgroundColor: `${button.active ? '#00000026' : 'transparent'}` }"
                    class="overflow-hidden capitalize lt-sm:h-[28px] lt-sm:text-[14px] rounded-[4px] text-[16px] px-[12px] py-[2px] h-[28px] cursor-pointer text-white font-bold"
                    @click="changeButton(button.id, button.color)"
                >
                    {{ button.name }}
                </button>
            </div>
            <div class="tracking-tighter text-[100px] font-bold mt-5 text-center lt-sm:mt-4 lt-sm:text-[70px]">
                {{ overTime >= 10 ? overTime : `0${overTime}` }} : {{ overSecond }}
            </div>
            <div class="relative w-full text-center flex items-center justify-center">
                <button
                    :style="{ color: PomofocusStore.bgColor }"
                    :class="isStart ? 'stop' : 'starts'"
                    class="uppercase lt-sm:w-[170px] lt-sm:h-[45px] lt-sm:text-[20px]"
                    @click="playTimer"
                >
                    {{ isStart ? 'pause' : 'start' }}
                </button>
                <button v-if="isStart" class="absolute right-15 top-8 opacity-90" @click="nextTimer">
                    <div i-carbon-skip-forward-filled class="text-[28px]" />
                </button>
            </div>
        </div>
        <div class="mt-5 cursor-pointer select-none inline-block text-[16px] opacity-80 mb-1">
            #{{ finishedPomos }}
        </div>
        <div class="text-[18px] font-bold text-white">
            {{ spendTime }}
        </div>
        <TheTasks />
    </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>

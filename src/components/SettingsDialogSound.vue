<script lang="ts" setup>
    import { SpeakerWaveIcon } from "@heroicons/vue/24/outline";
    import type { Song } from "@/models/song.types";

    const PomofocusStore = usePomofocusStore();
    const shownAlarm = ref<boolean>(false);
    const shownTicking = ref<boolean>(false);
    const alarmSoundName = ref<string>(PomofocusStore.alarmSongArr[PomofocusStore.endSoundChange].name);
    const tickingSoundName = ref<string>(PomofocusStore.tickingSongArr[PomofocusStore.timerSoundChange].name);

    function selectSound(id: number, type: "alarm" | "ticking"): void {
        if (type === "alarm") {
            PomofocusStore.endSoundChange = id;
            PomofocusStore.loadSong();
            PomofocusStore.taskEndSound.play();
            PomofocusStore.alarmSongArr.map<Song>((item) => {
                if (id === item.id) {
                    alarmSoundName.value = item.name;
                }
                return item;
            });
        } else {
            PomofocusStore.timerSoundChange = id;
            PomofocusStore.loadSong();
            PomofocusStore.timerSound.play();
            PomofocusStore.tickingSongArr.map<Song>((item) => {
                if (id === item.id) {
                    tickingSoundName.value = item.name;
                }
                return item;
            });
        }
        shownAlarm.value = false;
        shownTicking.value = false;
    }

    function changeSound(id: number): void {
        if (id === 1) {
            shownTicking.value = false;
            shownAlarm.value = !shownAlarm.value;
        }
        if (id === 2) {
            shownAlarm.value = false;
            shownTicking.value = !shownTicking.value;
        }
    }

    function changeSoundValue(type: "alarm" | "ticking"): void {
        PomofocusStore.loadSong();
        if (type === "alarm") {
            PomofocusStore.taskEndSound.volume = PomofocusStore.alarmSound / 100;
            PomofocusStore.taskEndSound.play();
        } else {
            PomofocusStore.timerSound.volume = PomofocusStore.tickingSound / 100;
            PomofocusStore.timerSound.play();
        }
    }

    watchEffect(() => {
        if (!PomofocusStore.settingsShown) {
            PomofocusStore.taskEndSound.pause();
            PomofocusStore.timerSound.pause();
        }
    });
</script>

<template>
    <div class="px-6 pb-4">
        <div class="uppercase mt-[4px] flex items-center gap-1 text-[#bdbdbd] font-bold text-[16px]">
            <SpeakerWaveIcon class="text-[16px] font-bold w-[1.2rem]" /> Sound
        </div>
        <div class="flex flex-wrap items-center justify-between mt-4 gap-y-2">
            <span>Alarm Sound</span>
            <div class="text-[14px] relative flex items-center justify-between text-[#787878] cursor-pointer w-[130px] p-[10px] rounded bg-[#ebebeb]" @click.self="changeSound(1)">
                {{ alarmSoundName }} <div i-carbon-caret-down class="text-[18px] pointer-events-none" />
                <ul v-if="shownAlarm" class="py-2 absolute w-full right-0 -bottom-61 bg-white rounded-md border shadow-2xl z-[999999]">
                    <li
                        v-for="alarmArr in PomofocusStore.alarmSongArr"
                        :key="alarmArr.id"
                        class="p-3 box-border"
                        @click="selectSound(alarmArr.id, 'alarm')"
                    >
                        {{ alarmArr.name }}
                    </li>
                </ul>
            </div>
            <div class="w-full text-end flex items-center justify-end gap-1">
                <label>{{ PomofocusStore.alarmSound }}</label>
                <input
                    v-model="PomofocusStore.alarmSound"
                    type="range"
                    min="0"
                    max="100"
                    class="focus:outline-none appearance-none rounded-full h-[7px]  bg-[#ccc]"
                    @change="changeSoundValue('alarm')"
                >
            </div>
        </div>
        <div class="flex flex-wrap items-center justify-between mt-4 gap-y-2 border-b border-b-2px pb-10">
            <span> Ticking Sound</span>
            <div class="text-[14px] flex items-center justify-between text-[#787878] cursor-pointer w-[130px] p-[10px] relative rounded bg-[#ebebeb]" @click.self="changeSound(2)">
                {{ tickingSoundName }}<div i-carbon-caret-down class="text-[18px] pointer-events-none" />
                <ul v-if="shownTicking" class="py-2 absolute w-full right-0 -bottom-61 bg-white rounded-md border shadow-2xl z-[999999]">
                    <li
                        v-for="tickingArr in PomofocusStore.tickingSongArr"
                        :key="tickingArr.id"
                        class="p-3 box-border"
                        @click="selectSound(tickingArr.id, 'ticking')"
                    >
                        {{ tickingArr.name }}
                    </li>
                </ul>
            </div>
            <div class="w-full text-end flex items-center justify-end gap-1">
                <label>{{ PomofocusStore.tickingSound }}</label>
                <input
                    v-model="PomofocusStore.tickingSound"
                    type="range"
                    min="0"
                    max="100"
                    class="focus:outline-none appearance-none rounded-full h-[7px]  bg-[#ccc]"
                    @change="changeSoundValue('ticking')"
                >
            </div>
        </div>
    </div>
</template>

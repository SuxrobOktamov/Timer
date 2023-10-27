<script lang="ts" setup>
    import { SpeakerWaveIcon } from "@heroicons/vue/24/outline";
    import { storeToRefs } from "pinia";
    import type { Song } from "@/models/song.types";

    const { loadSong, timerSound, taskEndSound } = usePomofocusStore();
    const { alarmSongArr, endSoundChange, tickingSongArr, timerSoundChange, alarmSound, tickingSound, settingsShown } = storeToRefs(usePomofocusStore());

    const alarmDropdownShown = ref<boolean>(false);
    const tickingSoundDropdownShown = ref<boolean>(false);
    const alarmSoundName = ref<string>(alarmSongArr.value[endSoundChange.value].name);
    const tickingSoundName = ref<string>(tickingSongArr.value[timerSoundChange.value].name);

    function selectAlarmSound(id: number): void {
        endSoundChange.value = id;
        loadSong();
        taskEndSound.play();
        alarmSongArr.value.map<Song>((item) => {
            if (id === item.id) {
                alarmSoundName.value = item.name;
            }
            return item;
        });
        alarmDropdownShown.value = false;
    }

    function selectTickingSound(id: number): void {
        timerSoundChange.value = id;
        loadSong();
        timerSound.play();
        tickingSongArr.value.map<Song>((item) => {
            if (id === item.id) {
                tickingSoundName.value = item.name;
            }
            return item;
        });
        tickingSoundDropdownShown.value = false;
    }

    function shownAlarmSound(): void {
        tickingSoundDropdownShown.value = false;
        alarmDropdownShown.value = !alarmDropdownShown.value;
    }

    function tickingSoundDropdownShownSound(): void {
        alarmDropdownShown.value = false;
        tickingSoundDropdownShown.value = !tickingSoundDropdownShown.value;
    }

    function changeAlarmSoundValue(): void {
        loadSong();
        taskEndSound.volume = alarmSound.value / 100;
        taskEndSound.play();
    }

    function openTickingSoundDropdown(): void {
        loadSong();
        timerSound.volume = tickingSound.value / 100;
        timerSound.play();
    }

    watchEffect(() => {
        if (!settingsShown.value) {
            taskEndSound.pause();
            timerSound.pause();
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
            <div class="text-[14px] relative flex items-center justify-between text-[#787878] cursor-pointer w-[130px] p-[10px] rounded bg-[#ebebeb]" @click.self="shownAlarmSound()">
                {{ alarmSoundName }} <div i-carbon-caret-down class="text-[18px] pointer-events-none" />
                <ul v-if="alarmDropdownShown" class="py-2 absolute w-full right-0 -bottom-61 bg-white rounded-md border shadow-2xl z-[999999]">
                    <li
                        v-for="alarmArr in alarmSongArr"
                        :key="alarmArr.id"
                        class="p-3 box-border"
                        @click="selectAlarmSound(alarmArr.id)"
                    >
                        {{ alarmArr.name }}
                    </li>
                </ul>
            </div>
            <div class="w-full text-end flex items-center justify-end gap-1">
                <label>{{ alarmSound }}</label>
                <input
                    v-model="alarmSound"
                    type="range"
                    min="0"
                    max="100"
                    class="focus:outline-none appearance-none rounded-full h-[7px]  bg-[#ccc]"
                    @change="changeAlarmSoundValue()"
                >
            </div>
        </div>
        <div class="flex flex-wrap items-center justify-between mt-4 gap-y-2 border-b border-b-2px pb-10">
            <span> Ticking Sound</span>
            <div class="text-[14px] flex items-center justify-between text-[#787878] cursor-pointer w-[130px] p-[10px] relative rounded bg-[#ebebeb]" @click.self="tickingSoundDropdownShownSound()">
                {{ tickingSoundName }}<div i-carbon-caret-down class="text-[18px] pointer-events-none" />
                <ul v-if="tickingSoundDropdownShown" class="py-2 absolute w-full right-0 -bottom-61 bg-white rounded-md border shadow-2xl z-[999999]">
                    <li
                        v-for="tickingArr in tickingSongArr"
                        :key="tickingArr.id"
                        class="p-3 box-border"
                        @click="selectTickingSound(tickingArr.id)"
                    >
                        {{ tickingArr.name }}
                    </li>
                </ul>
            </div>
            <div class="w-full text-end flex items-center justify-end gap-1">
                <label>{{ tickingSound }}</label>
                <input
                    v-model="tickingSound"
                    type="range"
                    min="0"
                    max="100"
                    class="focus:outline-none appearance-none rounded-full h-[7px]  bg-[#ccc]"
                    @change="openTickingSoundDropdown()"
                >
            </div>
        </div>
    </div>
</template>

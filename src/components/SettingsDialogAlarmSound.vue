<script lang="ts" setup>
    import { storeToRefs } from "pinia";

    const { alarmSongArr, endSoundChange, alarmSound, settingsShown, alarmSoundName } = storeToRefs(usePomofocusStore());

    const taskEndSound = document.createElement("audio");
    const alarmDropdownShown = ref<boolean>(false);
    const tickingSoundDropdownShown = ref<boolean>(false);

    function loadSong(): void {
        taskEndSound.src = alarmSongArr.value[endSoundChange.value].path as string;
        taskEndSound.load();
    }

    function selectAlarmSound(id: number): void {
        endSoundChange.value = id;
        loadSong();
        taskEndSound.play();
        alarmDropdownShown.value = false;
    }

    function shownAlarmSound(): void {
        tickingSoundDropdownShown.value = false;
        alarmDropdownShown.value = !alarmDropdownShown.value;
    }

    function openAlarmSoundDropdown(): void {
        loadSong();
        taskEndSound.volume = alarmSound.value / 100;
        taskEndSound.play();
    }

    watchEffect(() => {
        if (!settingsShown.value) {
            taskEndSound.pause();
        }
    });
</script>

<template>
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
                @change="openAlarmSoundDropdown()"
            >
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { storeToRefs } from "pinia";

    const { tickingSongArr, timerSoundChange, tickingSound, settingsShown, tickingSoundName } = storeToRefs(usePomofocusStore());

    const timerSound = document.createElement("audio");
    const alarmDropdownShown = ref<boolean>(false);
    const tickingSoundDropdownShown = ref<boolean>(false);

    function loadSong(): void {
        timerSound.src = tickingSongArr.value[timerSoundChange.value].path as string;
        timerSound.load();
    }

    function selectTickingSound(id: number): void {
        timerSoundChange.value = id;
        loadSong();
        timerSound.play();
        tickingSoundDropdownShown.value = false;
    }

    function tickingSoundDropdownShownSound(): void {
        alarmDropdownShown.value = false;
        tickingSoundDropdownShown.value = !tickingSoundDropdownShown.value;
    }

    function openTickingSoundDropdown(): void {
        loadSong();
        timerSound.volume = tickingSound.value / 100;
        timerSound.play();
    }

    watchEffect(() => {
        if (!settingsShown.value) {
            timerSound.pause();
        }
    });
</script>

<template>
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
</template>

<script lang="ts" setup>
    import { storeToRefs } from "pinia";

    const props = defineProps<{
        modelValue: boolean
        tickingSoundDropdownShown: boolean
    }>();
    const emit = defineEmits<{
        (event: "update: modelValue", value: boolean): void
        (event: "update: tickingSoundDropdownShown", value: boolean): void
    }>();

    const shown = useVModel(props, "modelValue", emit);
    const tickingHide = useVModel(props, "tickingSoundDropdownShown", emit);

    const { alarmSongArr, endSoundChange, alarmSound, alarmSoundName } = storeToRefs(usePomofocusStore());

    const timerSound = document.getElementById("tickingAudioSound") as HTMLAudioElement;
    const taskEndSound = document.getElementById("alarmAudioSound") as HTMLAudioElement;

    function loadSong(): void {
        if (!taskEndSound) {
            return;
        }

        taskEndSound.src = alarmSongArr.value[endSoundChange.value].path as string;
        taskEndSound.load();
    }

    function selectAlarmSound(id: number): void {
        if (!taskEndSound) {
            return;
        }

        tickingHide.value = false;
        endSoundChange.value = id;
        loadSong();
        taskEndSound.play();
        timerSound.pause();
        shown.value = false;
    }

    function shownAlarmSound(): void {
        tickingHide.value = false;
        shown.value = !shown.value;
    }

    function openAlarmSoundDropdown(): void {
        if (!taskEndSound) {
            return;
        }

        loadSong();
        taskEndSound.volume = alarmSound.value / 100;
        taskEndSound.play();
        timerSound.pause();
    }

    onUnmounted(() => {
        taskEndSound.pause();
    });
</script>

<template>
    <audio ref="taskEndSound" />
    <div class="flex flex-wrap items-center justify-between mt-4 gap-y-2">
        <span>Alarm Sound</span>
        <div class="text-[14px] relative flex items-center justify-between text-[#787878] cursor-pointer w-[130px] p-[10px] rounded bg-[#ebebeb]" @click.self="shownAlarmSound()">
            {{ alarmSoundName }} <div i-carbon-caret-down class="text-[18px] pointer-events-none" />
            <ul v-if="shown" class="py-2 absolute w-full right-0 -bottom-61 bg-white rounded-md border shadow-2xl z-[999999]">
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

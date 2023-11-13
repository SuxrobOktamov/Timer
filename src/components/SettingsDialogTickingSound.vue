<script lang="ts" setup>
    import { storeToRefs } from "pinia";

    const props = defineProps<{
        modelValue: boolean
        alarmDropdownShown: boolean
    }>();
    const emit = defineEmits<{
        (event: "update:modelValue", value: boolean): void
        (event: "update:alarmDropdownShown", value: boolean): void
    }>();

    const shown = useVModel(props, "modelValue", emit);
    const alarmHide = useVModel(props, "alarmDropdownShown", emit);

    const { tickingSongArr, timerSoundChange, tickingSound, settingsShown, tickingSoundName } = storeToRefs(usePomofocusStore());

    const timerSound = ref<HTMLAudioElement>();

    function loadSong(): void {
        if (!timerSound.value) {
            return;
        }

        timerSound.value.src = tickingSongArr.value[timerSoundChange.value].path as string;
        timerSound.value.load();
    }

    function selectTickingSound(id: number): void {
        if (!timerSound.value) {
            return;
        }

        timerSoundChange.value = id;
        loadSong();
        timerSound.value.play();
        shown.value = false;
    }

    function tickingSoundDropdownShownSound(): void {
        alarmHide.value = false;
        shown.value = !shown.value;
    }

    function openTickingSoundDropdown(): void {
        if (!timerSound.value) {
            return;
        }

        loadSong();
        timerSound.value.volume = tickingSound.value / 100;
        timerSound.value.play();
    }

    watchEffect(() => {
        if (!settingsShown.value) {
            if (!timerSound.value) {
                return;
            }
            timerSound.value.pause();
        }
    });
</script>

<template>
    <audio ref="timerSound" disabled />
    <div class="flex flex-wrap items-center justify-between mt-4 gap-y-2 border-b border-b-2px pb-10">
        <span> Ticking Sound</span>
        <div class="text-[14px] flex items-center justify-between text-[#787878] cursor-pointer w-[130px] p-[10px] relative rounded bg-[#ebebeb]" @click.self="tickingSoundDropdownShownSound()">
            {{ tickingSoundName }}<div i-carbon-caret-down class="text-[18px] pointer-events-none" />
            <ul v-if="shown" class="py-2 absolute w-full right-0 -bottom-61 bg-white rounded-md border shadow-2xl z-[999999]">
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

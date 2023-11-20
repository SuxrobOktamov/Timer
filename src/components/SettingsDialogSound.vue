<script setup lang="ts">
    const alarmDropdownShown = ref<boolean>(false);
    const tickingSoundDropdownShown = ref<boolean>(false);
</script>

<template>
    <div class="px-6 pb-4">
        <div class="uppercase mt-[4px] flex items-center gap-1 text-[#bdbdbd] font-bold text-[16px]">
            <SpeakerWaveIcon class="text-[16px] font-bold w-[1.2rem]" /> Sound
        </div>
        <SettingsDialogAlarmSound v-model="alarmDropdownShown" v-model:tickingSoundDropdownShown="tickingSoundDropdownShown" />
        <SettingsDialogTickingSound v-model="tickingSoundDropdownShown" v-model:alarmDropdownShown="alarmDropdownShown" />
    </div>
</template>

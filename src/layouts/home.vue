<script lang="ts" setup>
    const bgColor = ref<string>("#ba4949");

    // function changeBackground(color: string) {
    //     bgColor.value = color;
    // }
</script>

<template>
    <main class="w-full flex flex-col gap-5">
        <div class="app" :style="{ backgroundColor: bgColor }">
            <TheHeader />
            <!-- <router-view :bg-color="bgColor" @change="changeBackground($event)" /> -->
        </div>
        <!-- <TheFooter /> -->
    </main>
</template>

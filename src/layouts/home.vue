<script lang="ts" setup>
    const PomofocusStore = usePomofocusStore();
</script>

<template>
    <main class="w-full flex flex-col gap-5">
        <div class="app" :style="{ backgroundColor: PomofocusStore.bgColor }">
            <TheHeader />
            <router-view />
        </div>
        <TheFooter />
    </main>
</template>

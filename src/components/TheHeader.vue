<script setup lang="ts">
    import { CheckCircleIcon } from "@heroicons/vue/24/solid";
    import { Cog6ToothIcon, DocumentChartBarIcon, UserCircleIcon } from "@heroicons/vue/24/outline";

    const settingsShown = ref<boolean>(false);

    function closeSettings(): void {
        settingsShown.value = false;
    }

    function openSettings(): void {
        settingsShown.value = true;
    }
</script>

<template>
    <header class="flex items-center justify-between py-4 px-2 mx-auto max-w-[620px] border-b border-gray-900 border-opacity-10">
        <router-link to="/" class="flex items-center gap-1">
            <CheckCircleIcon class="w-6 object-contain text-white" />
            <div class="lt-sm:hidden text-xl font-semibold text-white">
                Pomofocus
            </div>
        </router-link>
        <div class="flex gap-2">
            <router-link to="report">
                <button class="cursor-pointer flex items-center gap-1 font-sans rounded opacity-90 bg-gray-1/20 py-2 px-3 text-[13px] min-w-[70px] lt-md:min-w-auto">
                    <DocumentChartBarIcon class="pointer-events-none lt-sm:text-xl w-[1.2rem]" />
                    <span class="lt-sm:hidden capitalize pointer-events-none">Report</span>
                </button>
            </router-link>
            <button class="cursor-pointer flex items-center gap-1 font-sans rounded opacity-90 bg-gray-1/20 py-2 px-3 text-[13px] min-w-[70px] lt-md:min-w-auto" @click="openSettings">
                <Cog6ToothIcon class="pointer-events-none lt-sm:text-xl w-[1.2rem]" />
                <span class="lt-sm:hidden capitalize pointer-events-none">Setting</span>
                <TheSettingsDialog :show="settingsShown" @close="closeSettings" />
            </button>
            <router-link to="login">
                <button class="cursor-pointer flex items-center gap-1 font-sans rounded opacity-90 bg-gray-1/20 py-2 px-3 text-[13px] min-w-[70px] lt-md:min-w-auto">
                    <UserCircleIcon class="pointer-events-none lt-sm:text-xl w-[1.2rem]" />
                    <span class="lt-sm:hidden capitalize pointer-events-none">Login</span>
                </button>
            </router-link>
        </div>
    </header>
</template>

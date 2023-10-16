<script lang="ts" setup>
    import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
    import { EllipsisVerticalIcon } from "@heroicons/vue/20/solid";

    const emit = defineEmits<{
        (event: "finished"): void
        (event: "all"): void
    }>();

    function clearFinishedTasks(): void {
        emit("finished");
    }
    function clearAllTasks(): void {
        emit("all");
    }
    function login(): void {
        // eslint-disable-next-line no-alert
        alert("Please login to use the template feature.");
    }
  </script>

<template>
    <Menu as="div" class="relative inline-block text-left">
        <div>
            <MenuButton class="px-[1px] py-[3px] bg-[#fff3] rounded shadow">
                <span class="sr-only">Open options</span>
                <EllipsisVerticalIcon class="h-5 w-5 outline-none border-none" aria-hidden="true" />
            </MenuButton>
        </div>

        <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
        >
            <MenuItems class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div class="py-1">
                    <MenuItem v-slot="{ active }">
                        <button class="gap-1 flex items-center text-[#4f2b2d] px-[16px] py-[10px] text-[14px] w-full" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700']" @click="clearFinishedTasks">
                            <div i-carbon-trash-can class="font-black" />
                            <span>Clear finished tasks</span>
                        </button>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                        <button class="gap-1 flex items-center text-[#4f2b2d] px-[16px] py-[10px] text-[14px] w-full" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700']">
                            <div i-carbon-checkmark class="font-black" />
                            <span>Clear act pomodoros</span>
                        </button>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                        <button class="gap-1 flex items-center text-[#4f2b2d] px-[16px] py-[10px] text-[14px] w-full" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700']" @click="login">
                            <div i-carbon-save class="font-black" />
                            <span>Save as template</span>
                        </button>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                        <button class="gap-1 flex items-center text-[#4f2b2d] px-[16px] py-[10px] text-[14px] w-full" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700']" @click="login">
                            <div i-carbon-add class="font-black" />
                            <span>Add from templates</span>
                        </button>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                        <button class="gap-1 flex items-center text-[#4f2b2d] px-[16px] py-[10px] text-[14px] w-full" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700']" @click="login">
                            <div i-carbon-ibm-data-replication class="font-black" />
                            <span>Import from Todoist</span>
                            <div i-carbon-locked class="font-black" />
                        </button>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                        <button class="gap-1 flex items-center text-[#4f2b2d] px-[16px] py-[10px] text-[14px] w-full" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700']" @click="clearAllTasks">
                            <div i-carbon-trash-can class="font-black" />
                            <span>Clear all tasks</span>
                        </button>
                    </MenuItem>
                </div>
            </MenuItems>
        </transition>
    </Menu>
</template>

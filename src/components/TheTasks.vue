<script setup lang="ts">
    import type { Task } from "../models/task.types";
    import type { Button } from "../models/button.types";
    import type { Edit } from "../models/edit.types";

    const props = defineProps<{
        refreshTimer: Function
        tasks: Task[]
        buttons: Button[]
    }>();
    const emit = defineEmits<{
        (event: "close"): void
        (event: "delete", type: number): void
        (event: "clear-finished-tasks"): void
        (event: "clear-all-tasks"): void
        (event: "submit", type: any): void
    }>();

    const editObj = ref<Edit>({
        noteShown: true, taskName: "", taskRepeatCount: 0, taskNote: "",
    });
    const addTaskShown = ref<boolean>(false);
    const premiumShown = ref<boolean>(false);
    const timeHour = ref<number>(0);
    const taskId = ref<number>();

    function showTask(type: "add" | "edit", id?: number): void {
        if (type === "add") {
            addTaskShown.value = true;
            props.tasks.forEach((item: Task) => {
                item.isEdit = true;
            });
        } else {
            props.tasks.forEach((task: Task) => {
                taskId.value = id;
                addTaskShown.value = false;
                task.isEdit = true;
                if (task.id === id) {
                    task.isEdit = false;
                    editObj.value.taskName = task.work;
                    editObj.value.taskRepeatCount = task.count;
                    editObj.value.taskNote = task.title;
                    if (task.title?.length) {
                        editObj.value.noteShown = false;
                    } else {
                        editObj.value.noteShown = true;
                    }
                }
            });
        }
    }

    function onCancel(type: number, id?: number): void {
        if (type === 1) {
            addTaskShown.value = false;
        } else if (type === 2) {
            props.tasks.forEach((item: Task) => {
                if (item.id === id) {
                    item.isEdit = true;
                }
            });
        } else {
            addTaskShown.value = false;
            props.tasks.forEach((item: Task) => {
                item.isEdit = true;
            });
        }
    }

    function deleteTask(id: number): void {
        emit("delete", id);
    }

    function activePomos(id: number): void {
        props.refreshTimer();
        props.tasks.forEach((item: Task) => {
            if (item.id === id) {
                item.active = !item.active;
            }
        });
    }

    function completed(id: number): void {
        props.refreshTimer();
        props.tasks.map<Task>((item) => {
            item.completed = false;
            if (item.id === id) {
                item.completed = true;
            }
            return item;
        });
    }

    function closePremium(): void {
        premiumShown.value = false;
    }

    function openPremium(): void {
        premiumShown.value = true;
    }

    function clearFinishedTasks(): void {
        emit("clear-finished-tasks");
    }

    function clearAllTasks(): void {
        emit("clear-all-tasks");
    }

    function addNote(): void {
        editObj.value.noteShown = false;
    }

    function increase(): void {
        editObj.value.taskRepeatCount++;
    }

    function decrease(): void {
        if (editObj.value.taskRepeatCount > 0) {
            editObj.value.taskRepeatCount--;
        }
    }
    function onSubmit(obj: any): void {
        emit("submit", obj);
    }

    const filterTasks = computed<Task[]>(() => {
        return [...props.tasks].sort((a: Task, b: Task): number => {
            return a.active > b.active ? 1 : -1;
        });
    });
    const finishedPomos = computed<Task[]>(() => {
        return props.tasks.filter((item: Task) => item.active);
    });
    const pomos = computed<number>(() => {
        let count = 0 as number;
        props.tasks.map<Task>((item) => {
            if (!item.active) {
                count += item.count;
                count -= item.finishedCount;
            }
            return item;
        });
        return count;
    });
    const finishedTime = computed<string>(() => {
        const today = new Date() as Date;
        const hours = today.getHours() as number;
        const minutes = today.getMinutes() as number;
        const pomo = Math.floor((minutes + ((props.buttons[0].time))) / 60) as number;
        let date = "" as string;
        if (pomo > 0 && !((hours + pomo) > 24)) {
            if ((minutes + (pomos.value * props.buttons[0].time - (pomo * 60)) < 10 && (hours + pomo) < 10)) {
                date = `0${hours + pomo} : 0${minutes + ((pomos.value * props.buttons[0].time) - (pomo * 60))}`;
            } else if ((minutes + (pomos.value * props.buttons[0].time - (pomo * 60)) > 10 && (hours + pomo) < 10)) {
                date = `0${hours + pomo} : ${minutes + ((pomos.value * props.buttons[0].time) - (pomo * 60))}`;
            } else if ((minutes + (pomos.value * props.buttons[0].time - (pomo * 60)) < 10 && (hours + pomo) > 10)) {
                date = `${hours + pomo} : 0${minutes + ((pomos.value * props.buttons[0].time) - (pomo * 60))}`;
            } else {
                date = `${hours + pomo} : ${minutes + ((pomos.value * props.buttons[0].time) - (pomo * 60))}`;
            }
        } else if (((hours + pomo) > 24)) {
            date = `00 : 00`;
        } else {
            if ((minutes + (props.buttons[0].time * pomos.value)) < 10 && (hours) < 10) {
                date = `0${hours} : 0${minutes + (props.buttons[0].time * pomos.value)}`;
            } else
                if ((minutes + (props.buttons[0].time * pomos.value)) > 10 && (hours) < 10) {
                    date = `0${hours} : ${minutes + (props.buttons[0].time * pomos.value)}`;
                } else if ((minutes + (props.buttons[0].time * pomos.value)) < 10 && (hours) > 10) {
                    date = `${hours} : 0${minutes + (props.buttons[0].time * pomos.value)}`;
                } else {
                    date = `${hours} : ${minutes + (props.buttons[0].time * pomos.value)}`;
                }
        }
        timeHour.value = (props.buttons[0].time * pomos.value) / 60;
        return date;
    });
</script>

<template>
    <form class="w-full" @submit.prevent @click.self="onCancel(3)">
        <div class="m-auto max-w-[480px] w-full mt-5 relative">
            <div class="relative flex items-center justify-between mb-5 pb-[14px] border-w-[2px] border-b-2px border-b-[#fff9]">
                <span class="text-[18px] font-bold tracking-widest">Task</span>
                <TasksDropDown @finished="clearFinishedTasks" @all="clearAllTasks" />
            </div>
            <div
                v-for="task in filterTasks"
                :key="task.id"
                class="flex flex-col gap-2 cursor-pointer m-auto mb-3 max-w-[480px] text-[#555] w-full"
                @click="completed(task.id)"
            >
                <div v-if="task.isEdit" class="relative overflow-hidden p-4 flex flex-wrap items-center justify-between bg-[#fff] rounded-[6px] shadow-md">
                    <div v-show="task.completed || tasks.length === 1" class="absolute left-0 top-0 h-full w-[6px] bg-[#222]" />
                    <div class="flex items-center gap-2">
                        <div
                            i-carbon-checkmark-filled
                            class="text-[24px] checked"
                            :style="{ color: `${task.active ? '#ba4949' : '#dfdfdf'}`, pointerEvents: (task.count === task.finishedCount) ? 'none' : 'auto' }"
                            @click.self="activePomos(task.id)"
                        />
                        <span class="font-bold max-w-[300px] text-ellipsis block whitespace-nowrap  overflow-hidden" :style="{ textDecoration: `${task.active ? 'line-through' : 'none'}`, opacity: `${task.active ? '0.4' : '1'}` }">{{ task.work }}</span>
                    </div>
                    <div class="flex items-center gap-3">
                        <span class="text-[18px] text-[#bbb] font-bold">{{ task.finishedCount }}/ <small>{{ task.count }}</small></span>
                        <button
                            class="px-[1px] border py-[1px] bg-[#fff] rounded shadow"
                            @click="showTask('edit', task.id)"
                        >
                            <div i-carbon-overflow-menu-vertical class="text-gray-400 font-extrabold text-[24px] pointer-events-none" />
                        </button>
                    </div>
                    <div v-if="task.title" class="w-[90%] bg-[#fcf8de] text-[#605515] whitespace-pre-wrap break-words text-start m-auto mt-2 p-3 rounded-md shadow-md">
                        {{ task.title }}
                    </div>
                </div>
                <TaskEdit
                    v-else
                    :tasks="tasks"
                    :edit-obj="editObj"
                    :task-id="taskId"
                    @cancel="onCancel(2, task.id)"
                    @delete="deleteTask(task.id)"
                    @open="openPremium"
                    @add-note="addNote"
                    @increase="increase"
                    @decrease="decrease"
                    @submit="onSubmit"
                />
            </div>
            <button
                v-if="!addTaskShown"
                class="w-full flex text-[18px] cursor-pointer opacity-60 p-4 border-dashed border-2px bg-[#0000001a] rounded-lg items-center justify-center gap-2"
                @click="showTask('add')"
            >
                <div i-carbon-add-filled />
                <span>Add Task</span>
            </button>
            <TaskAdd
                v-else
                :tasks="tasks"
                @cancel="onCancel(1)"
                @open="openPremium"
                @submit="onSubmit"
            />
            <div v-show="tasks.length" class="flex items-center justify-center gap-5 m-auto mb-3 mt-7 max-w-[480px] w-full border-t border-[#eee] shadow-md py-6 bg-[#ffffff1a]">
                <div class="text-[#ffffffb3]">
                    Pomos: <span class="text-[#fff] text-[24px] pl-1">{{ finishedPomos.length }}<small class="text-[16px] text-[#ffffffb3]">/</small>{{ tasks.length }}</span>
                </div>
                <div class="text-[#ffffffb3]">
                    Finish At: <span class="text-[#fff] text-[24px] px-1">{{ finishedTime }}</span> ( {{ timeHour.toFixed(1) }}h)
                </div>
            </div>
            <PremiumDialog :show="premiumShown" @close="closePremium" />
        </div>
    </form>
</template>

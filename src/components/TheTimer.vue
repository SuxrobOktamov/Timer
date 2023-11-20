<script setup lang="ts">
    import { storeToRefs } from "pinia";
    import type { Button } from "../models/button.types";
    import type { Task } from "@/models/task.types";
    import type { SettingTimer } from "@/models/settingTimer.types";

    const { timerTypes, backgroundSound, bgColor, settingsShown } = storeToRefs(usePomofocusStore());
    const { timerSound, taskEndSound, loadSong, startSound } = usePomofocusStore();

    const tasks = ref<Task[]>([]);

    const borderW = ref<number>(0);
    const overSecond = ref<string>("00");
    const second = ref<number>(60);
    const isStart = ref<boolean>(false);
    const updateMinute = ref<any>();
    const updateSecond = ref<any>();
    const freshStart = ref<boolean>(false);
    const finishedPomos = ref<number>(1);
    const isStartPomodoros = ref<boolean>(false);
    const isStartBreaks = ref<boolean>(false);

    const onTimeOver = computed<number>(() => {
        const time = timerTypes.value.find(item => item.active) as Button;
        if (freshStart.value) {
            return time.time - 1;
        } else {
            return time.time;
        }
    });
    const spendTime = computed<string>(() => {
        const focus = timerTypes.value.find(item => item.active) as Button;
        return focus.message;
    });
    const timerStartDisabled = computed<boolean>(() => {
        if (!tasks.value.length && timerTypes.value[0].active) {
            return true;
        } else if (timerTypes.value[0].active) {
            const disabled = ref<boolean>(false);
            tasks.value.forEach((item: Task) => {
                if (item.completed && item.active) {
                    disabled.value = true;
                }
            });
            return disabled.value;
        } else {
            return false;
        }
    });
    const doneAllTasks = computed<boolean>(() => {
        if (tasks.value.length) {
            return tasks.value.every((item: Task) => item.active);
        } else {
            return false;
        }
    });
    const titlePomos = computed<string>(() => {
        if (tasks.value.length === 1) {
            return tasks.value[0].work;
        } else if (tasks.value.length > 1) {
            const filteredPomos = ref<Task[]>(tasks.value.filter((item: Task) => item.completed));
            if (!filteredPomos.value.length) {
                tasks.value[0].completed = true;
                return tasks.value[0].work;
            } else {
                return filteredPomos.value[0].work;
            }
        } else {
            return "";
        }
    });

    function changeButton(id: number): void {
        timerSound.pause();
        timerTypes.value.map<Button>((item) => {
            if (item.id === id) {
                item.active = true;
                refreshTimer();
            } else {
                item.active = false;
            }
            return item;
        });
    }

    function startTimer(): void {
        isStart.value = !isStart.value;
        if (isStart.value) {
            const borderLength = ref<number>((100 / (onTimeOver.value * 60)));
            if (!(onTimeOver.value === 0 && overSecond.value === "00")) {
                updateSecond.value = setInterval(() => {
                    second.value--;
                    borderW.value += borderLength.value;
                    if (second.value >= 0 && second.value < 10) {
                        overSecond.value = `0${second.value}`;
                    } else if (second.value > 0 && second.value >= 10) {
                        overSecond.value = `${second.value}`;
                    } else {
                        second.value = 60;
                    }
                }, 1000);
                setTimeout(() => {
                    freshStart.value = true;
                }, 1000);
            }
            updateMinute.value = setInterval(() => {
                timerTypes.value.forEach((item: Button) => {
                    if (item.active) {
                        item.time--;
                    }
                });
            }, 1000 * 60);
        } else {
            clearInterval(updateMinute.value);
            clearInterval(updateSecond.value);
        }
        if (isStart.value && backgroundSound.value) {
            bgColor.value = "black";
        } else {
            timerTypes.value.forEach((item: Button) => {
                if (item.active) {
                    bgColor.value = item.color;
                }
            });
        }
    }

    function finishedTasks(): void {
        if (onTimeOver.value === 0 && second.value === 0 && timerTypes.value[0].active) {
            if (tasks.value.length === 1) {
                tasks.value[0].finishedCount++;
                if (tasks.value[0].finishedCount === tasks.value[0].count) {
                    tasks.value[0].active = true;
                }
            } else {
                tasks.value.forEach((item: Task) => {
                    if (item.completed) {
                        item.finishedCount++;
                        if (item.finishedCount === item.count) {
                            item.active = true;
                        }
                    }
                });
            }
            taskEndSound.play();
            refreshTimer();
            nextTimer();
            finishedPomos.value++;
            if (isStartBreaks.value) {
                playTimer();
            }
        } else if (onTimeOver.value === 0 && second.value === 0) {
            refreshTimer();
            nextTimer();
            if (isStartPomodoros.value && !timerStartDisabled.value) {
                playTimer();
            }
        }
    }

    function refreshTimer(): void {
        borderW.value = 0;
        clearInterval(updateMinute.value);
        clearInterval(updateSecond.value);
        isStart.value = false;
        freshStart.value = false;
        second.value = 60;
        overSecond.value = "00";
        timerSound.pause();
    }

    function nextTimer(): void {
        freshStart.value = false;
        timerSound.pause();
        refreshTimer();
        if (timerTypes.value[0].active) {
            timerTypes.value.forEach((item: Button) => item.active = false);
            timerTypes.value[1].active = true;
        } else if (timerTypes.value[1].active) {
            timerTypes.value.forEach((item: Button) => item.active = false);
            timerTypes.value[0].active = true;
        } else {
            timerTypes.value.forEach((item: Button) => item.active = false);
            timerTypes.value[0].active = true;
        }
    }

    function playTimer(): void {
        startTimer();
        loadSong();
        playSong();
    }

    function playSong(): void {
        startSound.play();
        if (!isStart.value) {
            timerSound.pause();
            timerSound.loop = false;
        } else if (timerTypes.value[0].active) {
            if (!(onTimeOver.value === 0 && overSecond.value === "00")) {
                timerSound.play();
                timerSound.loop = true;
            }
        }
    }

    function deleteTask(id: number): void {
        tasks.value = tasks.value.filter((item: Task) => item.id !== id);
    }

    function clearFinishedTasks(): void {
        tasks.value = tasks.value.filter((item: Task) => !item.active);
    }

    function clearAllTasks(): void {
        tasks.value = [];
        finishedPomos.value = 1;
    }

    function onSubmit(obj: any): void {
        if (obj.type === "add") {
            tasks.value.push(
                { id: Date.now(), work: obj.taskName, title: obj.taskNote, count: obj.taskRepeatCount, finishedCount: 0, active: false, isEdit: true, completed: false },
            );
        } else {
            tasks.value.forEach((task: Task) => {
                if (task.id === obj?.id) {
                    task.work = obj.taskName;
                    task.title = obj.taskNote;
                    task.count = obj.taskRepeatCount;
                }
                task.isEdit = true;
            });
        }
    }

    function closeSettings(): void {
        settingsShown.value = false;
    }

    function timeSaveChanges(obj: SettingTimer): void {
        if (obj.breakLongTime && obj.breakShortTime && obj.pomodoroTime) {
            timerTypes.value[0].time = obj.pomodoroTime;
            timerTypes.value[1].time = obj.breakShortTime;
            timerTypes.value[2].time = obj.breakLongTime;
        }
    }

    function autoStartPomodoro(): void {
        isStartPomodoros.value = !isStartPomodoros.value;
    }

    function autoStartBreaks(): void {
        isStartBreaks.value = !isStartBreaks.value;
    }

    watch(overSecond, () => {
        finishedTasks();
        if (settingsShown.value) {
            refreshTimer();
            timerTypes.value.forEach((item: Button) => {
                if (item.active) {
                    bgColor.value = item.color;
                }
            });
        }
    });
</script>

<template>
    <TheSettingsDialog
        :show="settingsShown"
        @close="closeSettings"
    >
        <template #timer>
            <SettingsDialogTimer
                :is-start-pomodoros="isStartPomodoros"
                :is-start-breaks="isStartBreaks"
                @time-save-changes="timeSaveChanges"
                @auto-start-pomodoro="autoStartPomodoro"
                @auto-start-breaks="autoStartBreaks"
            />
        </template>
    </TheSettingsDialog>
    <div class="w-full text-center px-2 mx-auto max-w-[620px]">
        <div class="h-2px rounded-full bg-white mb-[40px]" :style="{ width: `${borderW}%` }" />
        <div class="m-auto max-w-[480px] w-full pt-[20px] pb-[30px] rounded-6px bg-[#ffffff1a] shadow-md">
            <div class="flex justify-center gap-1 lt-sm:gap-1">
                <button
                    v-for="button in timerTypes"
                    :key="button.id"
                    :style="{ backgroundColor: `${button.active ? '#00000026' : 'transparent'}` }"
                    class="overflow-hidden capitalize lt-sm:h-[28px] lt-sm:text-[14px] rounded-[4px] text-[16px] px-[12px] py-[2px] h-[28px] cursor-pointer text-white font-bold"
                    @click="changeButton(button.id)"
                >
                    {{ button.name }}
                </button>
            </div>
            <div class="tracking-tighter text-[100px] font-bold mt-5 text-center lt-sm:mt-4 lt-sm:text-[70px]">
                {{ onTimeOver >= 10 ? onTimeOver : `0${onTimeOver}` }} : {{ overSecond }}
            </div>
            <div class="relative w-full text-center flex items-center justify-center">
                <button
                    :style="{ color: bgColor, cursor: timerStartDisabled ? 'not-allowed' : 'pointer', opacity: timerStartDisabled ? '0.4' : '1' }"
                    :class="isStart ? 'stop' : 'starts'"
                    :disabled="timerStartDisabled"
                    class="uppercase border-none lt-sm:w-[170px] lt-sm:h-[45px] lt-sm:text-[20px]"
                    @click="playTimer"
                >
                    {{ isStart ? 'pause' : 'start' }}
                </button>
                <button v-if="isStart" class="absolute right-15 top-8 opacity-90" @click="nextTimer">
                    <div i-carbon-skip-forward-filled class="text-[28px]" />
                </button>
            </div>
        </div>
        <div class="mt-5 cursor-pointer select-none inline-block text-[16px] opacity-80 mb-1">
            #{{ finishedPomos }}
        </div>
        <div class="text-[18px] font-bold text-white">
            {{ titlePomos ? titlePomos : spendTime }}
        </div>
        <TheTasks
            :refresh-timer="refreshTimer"
            :tasks="tasks"
            :timer-types="timerTypes"
            @delete="deleteTask"
            @clear-finished-tasks="clearFinishedTasks"
            @clear-all-tasks="clearAllTasks"
            @submit="onSubmit"
        />
        <div v-show="doneAllTasks" class="fixed z-[9999] bottom-0 w-full left-0 box-border text-center py-5">
            <div class="m-auto flex items-center max-w-[480px] justify-between bg-white text-[black] rounded-6px shadow-2xl shadow-[#666] p-4">
                <p>You've finished all your tasks for today 🎉</p>
                <button
                    class="px-3 py-2 text-[12px] rounded shadow-lg text-white bg-[#379580]"
                    @click="clearAllTasks()"
                >
                    Clear Tasks
                </button>
            </div>
        </div>
    </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>

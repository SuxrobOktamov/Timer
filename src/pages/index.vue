<script setup lang="ts">
    import type { Button } from "../models/button.types";
    import type { Task } from "@/models/task.types";
    import type { SettingTimer } from "@/models/settingTimer.types";

    const PomofocusStore = usePomofocusStore();

    // const startSound = document.createElement("audio");
    // const timerSound = document.createElement("audio");
    // const taskEndSound = document.createElement("audio");

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

    const overTime = computed<number>(() => {
        const time = PomofocusStore.buttons.find(item => item.active) as Button;
        if (freshStart.value) {
            return time.time - 1;
        } else {
            return time.time;
        }
    });
    const spendTime = computed<string>(() => {
        const focus = PomofocusStore.buttons.find(item => item.active) as Button;
        return focus.spendTime;
    });
    const disabled = computed<boolean>(() => {
        if (!tasks.value.length && PomofocusStore.buttons[0].active) {
            return true;
        } else if (PomofocusStore.buttons[0].active) {
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
    const showAllTasks = computed<boolean>(() => {
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
            const filter = ref<Task[]>(tasks.value.filter((item: Task) => item.completed));
            if (!filter.value.length) {
                tasks.value[0].completed = true;
                return tasks.value[0].work;
            } else {
                return filter.value[0].work;
            }
        } else {
            return "";
        }
    });

    function changeButton(id: number): void {
        PomofocusStore.timerSound.pause();
        PomofocusStore.buttons.map<Button>((item) => {
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
            const borderLength = ref<number>((100 / (overTime.value * 60)));
            if (!(overTime.value === 0 && overSecond.value === "00")) {
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
                PomofocusStore.buttons.forEach((item: Button) => {
                    if (item.active) {
                        item.time--;
                    }
                });
            }, 1000 * 60);
        } else {
            clearInterval(updateMinute.value);
            clearInterval(updateSecond.value);
        }
        if (isStart.value && PomofocusStore.runDarking) {
            PomofocusStore.bgColor = "black";
        } else {
            PomofocusStore.buttons.forEach((item: Button) => {
                if (item.active) {
                    PomofocusStore.bgColor = item.color;
                }
            });
        }
    }

    function finishedTasks(): void {
        if (overTime.value === 0 && second.value === 0 && PomofocusStore.buttons[0].active) {
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
            PomofocusStore.taskEndSound.play();
            refreshTimer();
            nextTimer();
            finishedPomos.value++;
            if (isStartBreaks.value) {
                playTimer();
            }
        } else if (overTime.value === 0 && second.value === 0) {
            refreshTimer();
            nextTimer();
            if (isStartPomodoros.value && !disabled.value) {
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
        PomofocusStore.timerSound.pause();
    }

    function nextTimer(): void {
        freshStart.value = false;
        PomofocusStore.timerSound.pause();
        refreshTimer();
        if (PomofocusStore.buttons[0].active) {
            PomofocusStore.buttons.forEach((item: Button) => item.active = false);
            PomofocusStore.buttons[1].active = true;
        } else if (PomofocusStore.buttons[1].active) {
            PomofocusStore.buttons.forEach((item: Button) => item.active = false);
            PomofocusStore.buttons[0].active = true;
        } else {
            PomofocusStore.buttons.forEach((item: Button) => item.active = false);
            PomofocusStore.buttons[0].active = true;
        }
    }

    function playTimer(): void {
        startTimer();
        PomofocusStore.loadSong();
        playSong();
    }

    function playSong(): void {
        PomofocusStore.startSound.play();
        if (!isStart.value) {
            PomofocusStore.timerSound.pause();
            PomofocusStore.timerSound.loop = false;
        } else if (PomofocusStore.buttons[0].active) {
            if (!(overTime.value === 0 && overSecond.value === "00")) {
                PomofocusStore.timerSound.play();
                PomofocusStore.timerSound.loop = true;
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
        PomofocusStore.settingsShown = false;
    }

    function timeSaveChanges(obj: SettingTimer): void {
        if (obj.breakLongTime && obj.breakShortTime && obj.pomodoroTime) {
            PomofocusStore.buttons[0].time = obj.pomodoroTime;
            PomofocusStore.buttons[1].time = obj.breakShortTime;
            PomofocusStore.buttons[2].time = obj.breakLongTime;
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
        if (PomofocusStore.settingsShown) {
            refreshTimer();
            PomofocusStore.buttons.forEach((item: Button) => {
                if (item.active) {
                    PomofocusStore.bgColor = item.color;
                }
            });
        }
    });
</script>

<template>
    <TheSettingsDialog
        :show="PomofocusStore.settingsShown"
        :is-start-pomodoros="isStartPomodoros"
        :is-start-breaks="isStartBreaks"
        @close="closeSettings"
        @time-save-changes="timeSaveChanges"
        @auto-start-pomodoro="autoStartPomodoro"
        @auto-start-breaks="autoStartBreaks"
    />
    <div class="w-full text-center px-2 mx-auto max-w-[620px]">
        <div class="h-2px rounded-full bg-white mb-[40px]" :style="{ width: `${borderW}%` }" />
        <div class="m-auto max-w-[480px] w-full pt-[20px] pb-[30px] rounded-6px bg-[#ffffff1a] shadow-md">
            <div class="flex justify-center gap-1 lt-sm:gap-1">
                <button
                    v-for="button in PomofocusStore.buttons"
                    :key="button.id"
                    :style="{ backgroundColor: `${button.active ? '#00000026' : 'transparent'}` }"
                    class="overflow-hidden capitalize lt-sm:h-[28px] lt-sm:text-[14px] rounded-[4px] text-[16px] px-[12px] py-[2px] h-[28px] cursor-pointer text-white font-bold"
                    @click="changeButton(button.id)"
                >
                    {{ button.name }}
                </button>
            </div>
            <div class="tracking-tighter text-[100px] font-bold mt-5 text-center lt-sm:mt-4 lt-sm:text-[70px]">
                {{ overTime >= 10 ? overTime : `0${overTime}` }} : {{ overSecond }}
            </div>
            <div class="relative w-full text-center flex items-center justify-center">
                <button
                    :style="{ color: PomofocusStore.bgColor, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? '0.4' : '1' }"
                    :class="isStart ? 'stop' : 'starts'"
                    :disabled="disabled"
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
            :buttons="PomofocusStore.buttons"
            @delete="deleteTask"
            @clear-finished-tasks="clearFinishedTasks"
            @clear-all-tasks="clearAllTasks"
            @submit="onSubmit"
        />
        <div v-show="showAllTasks" class="fixed z-[9999] bottom-0 w-full left-0 box-border text-center py-5">
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

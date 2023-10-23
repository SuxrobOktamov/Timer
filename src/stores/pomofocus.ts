import { acceptHMRUpdate, defineStore } from "pinia";
import type { Button } from "@/models/button.types";
import type { Song } from "@/models/song.types";
import type { Color } from "@/models/color.types";

export const usePomofocusStore = defineStore("pomofocus", () => {
    const ColorArrs = ref<Color[]>([
        {
            id: 1,
            obj: [
                { id: 1, active: true, color: "#ba4949" },
                { id: 2, active: false, color: "#38858a" },
                { id: 3, active: false, color: "#397097" },
                { id: 4, active: false, color: "#a4893c" },
                { id: 5, active: false, color: "#7d53a2" },
                { id: 6, active: false, color: "#af4e91" },
                { id: 7, active: false, color: "#518a58" },
                { id: 8, active: false, color: "#545764" },
            ],
        },
        {
            id: 2,
            obj: [
                { id: 1, active: false, color: "#ba4949" },
                { id: 2, active: true, color: "#38858a" },
                { id: 3, active: false, color: "#397097" },
                { id: 4, active: false, color: "#a4893c" },
                { id: 5, active: false, color: "#7d53a2" },
                { id: 6, active: false, color: "#af4e91" },
                { id: 7, active: false, color: "#518a58" },
                { id: 8, active: false, color: "#545764" },
            ],
        },
        {
            id: 3,
            obj: [
                { id: 1, active: false, color: "#ba4949" },
                { id: 2, active: false, color: "#38858a" },
                { id: 3, active: true, color: "#397097" },
                { id: 4, active: false, color: "#a4893c" },
                { id: 5, active: false, color: "#7d53a2" },
                { id: 6, active: false, color: "#af4e91" },
                { id: 7, active: false, color: "#518a58" },
                { id: 8, active: false, color: "#545764" },
            ],
        },
    ]);

    const colorOne = computed<any>(() => {
        return ColorArrs.value[0].obj.find(item => item.active)?.color;
    });
    const colorTwo = computed<any>(() => {
        return ColorArrs.value[1].obj.find(item => item.active)?.color;
    });
    const colorThree = computed<any>(() => {
        return ColorArrs.value[2].obj.find(item => item.active)?.color;
    });

    const buttons = ref<Button[]>([
        { name: "Pomodoro", id: 1, active: true, time: 1, color: colorOne.value, spendTime: "Time to focus!" },
        { name: "Short Break", id: 2, active: false, time: 1, color: colorTwo.value, spendTime: "Time for a break!" },
        { name: "Long Break", id: 3, active: false, time: 15, color: colorThree.value, spendTime: "Time for a break!" },
    ]);
    const tickingSongArr = ref<Song[]>([
        { path: "", id: 0, name: "None" },
        { path: "/src/assets/audio/tickingSong/Ticking_fast.mp3", id: 1, name: "Ticking Fast" },
        { path: "/src/assets/audio/tickingSong/ticking_slow.mp3", id: 2, name: "Ticking Slow" },
        { path: "/src/assets/audio/tickingSong/white_noise.mp3", id: 3, name: "White Noise" },
        { path: "/src/assets/audio/tickingSong/brown_noise.mp3", id: 4, name: "Brown Noise" },
    ]);
    const alarmSongArr = ref<Song[]>([
        { path: "/src/assets/audio/alarmSong/bell.mp3", id: 0, name: "Bell" },
        { path: "/src/assets/audio/alarmSong/bird.mp3", id: 1, name: "Bird" },
        { path: "/src/assets/audio/alarmSong/digital.mp3", id: 2, name: "Digital" },
        { path: "/src/assets/audio/alarmSong/kitchen.mp3", id: 3, name: "Kitchen" },
        { path: "/src/assets/audio/alarmSong/wood.mp3", id: 4, name: "Wood" },
    ]);

    const startSound = document.createElement("audio");
    const timerSound = document.createElement("audio");
    const taskEndSound = document.createElement("audio");
    const bgColor = ref<string>(colorOne.value);
    const settingsShown = ref<boolean>(false);
    const timerSoundChange = ref<number>(3);
    const endSoundChange = ref<number>(2);
    const alarmSound = ref<number>(100);
    const tickingSound = ref<number>(100);
    const runDarking = ref<boolean>(false);
    const countColor = ref<number>(0);

    function loadSong(): void {
        startSound.src = "/src/assets/audio/start-13691.mp3";
        startSound.load();
        timerSound.src = tickingSongArr.value[timerSoundChange.value].path as string;
        timerSound.load();
        taskEndSound.src = alarmSongArr.value[endSoundChange.value].path as string;
        taskEndSound.load();
    }

    function changeColor(id: number): void {
        ColorArrs.value[countColor.value].obj.map((item) => {
            item.active = false;
            if (id === item.id) {
                item.active = true;
            }
            return item;
        });
    }

    watchEffect(() => {
        if (buttons.value[0].active) {
            bgColor.value = colorOne.value;
        } else if (buttons.value[1].active) {
            bgColor.value = colorTwo.value;
        } else {
            bgColor.value = colorThree.value;
        }
        buttons.value[0].color = colorOne.value;
        buttons.value[1].color = colorTwo.value;
        buttons.value[2].color = colorThree.value;
    });

    return {
        bgColor,
        settingsShown,
        timerSoundChange,
        endSoundChange,
        buttons,
        tickingSongArr,
        alarmSongArr,
        runDarking,
        ColorArrs,
        countColor,
        colorOne,
        colorTwo,
        colorThree,
        alarmSound,
        tickingSound,
        loadSong,
        timerSound,
        taskEndSound,
        startSound,
        changeColor,
    };
});

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(usePomofocusStore, import.meta.hot));

import { acceptHMRUpdate, defineStore } from "pinia";

export const usePomofocusStore = defineStore("pomofocus", () => {
    const bgColor = ref<string>("#ba4949");

    return {
        bgColor,
    };
});

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(usePomofocusStore, import.meta.hot));

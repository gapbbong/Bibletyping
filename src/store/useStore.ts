import { create } from 'zustand';
import { Verse, TypingState, UserSettings } from '@/types/verse';

interface AppState {
    currentVerse: Verse | null;
    typingState: TypingState;
    settings: UserSettings;
    repetitionLeft: number;

    // Actions
    setCurrentVerse: (verse: Verse) => void;
    updateTypingInput: (input: string) => void;
    resetTypingState: () => void;
    setSettings: (settings: Partial<UserSettings>) => void;
    decrementRepetition: () => void;
    finishTyping: () => void;
}

const initialTypingState: TypingState = {
    currentInput: '',
    isFinished: false,
    startTime: null,
    endTime: null,
    accuracy: 100,
    wpm: 0,
    errors: 0,
};

const initialSettings: UserSettings = {
    repetitionCount: 1,
    theme: 'light',
    bgmEnabled: true,
    sttEnabled: false,
    zenMode: false,
};

export const useStore = create<AppState>((set) => ({
    currentVerse: null,
    typingState: initialTypingState,
    settings: initialSettings,
    repetitionLeft: 1,

    setCurrentVerse: (verse) => set({
        currentVerse: verse,
        repetitionLeft: initialSettings.repetitionCount,
        typingState: initialTypingState
    }),

    updateTypingInput: (input) => set((state) => {
        const startTime = state.typingState.startTime || Date.now();
        return {
            typingState: {
                ...state.typingState,
                currentInput: input,
                startTime,
            }
        };
    }),

    resetTypingState: () => set({ typingState: initialTypingState }),

    setSettings: (newSettings) => set((state) => {
        const updatedSettings = { ...state.settings, ...newSettings };
        return {
            settings: updatedSettings,
            repetitionLeft: updatedSettings.repetitionCount,
        };
    }),

    decrementRepetition: () => set((state) => ({
        repetitionLeft: Math.max(0, state.repetitionLeft - 1)
    })),

    finishTyping: () => set((state) => ({
        typingState: {
            ...state.typingState,
            isFinished: true,
            endTime: Date.now(),
        }
    })),
}));

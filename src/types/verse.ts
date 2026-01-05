export interface Verse {
    id: string;
    book: string;
    chapter: number;
    verse: number;
    text: string;
    translation: string;
}

export interface TypingState {
    currentInput: string;
    isFinished: boolean;
    startTime: number | null;
    endTime: number | null;
    accuracy: number;
    wpm: number;
    errors: number;
}

export interface UserSettings {
    repetitionCount: number;
    theme: 'light' | 'dark' | 'sepia';
    bgmEnabled: boolean;
    sttEnabled: boolean;
    zenMode: boolean;
}

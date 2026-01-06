export interface Verse {
    id: string;
    book: string;
    chapter: number;
    verse: number;
    text: string;
    translation: string;
    nounIndices?: number[]; // 명사 위치 인덱스 (난이도 조절용)
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

import { useMemo } from 'react';
import { useStore } from '@/store/useStore';

export const useTyping = () => {
    const { currentVerse, typingState, updateTypingInput, finishTyping } = useStore();
    const targetText = currentVerse?.text || '';
    const userInput = typingState.currentInput;

    const charFeedbacks = useMemo(() => {
        return targetText.split('').map((char, index) => {
            const userChar = userInput[index];
            let status: 'pending' | 'correct' | 'wrong' | 'current' = 'pending';

            if (index === userInput.length) {
                status = 'current';
            } else if (userChar === undefined) {
                status = 'pending';
            } else if (userChar === char) {
                status = 'correct';
            } else {
                status = 'wrong';
            }

            return { char, status };
        });
    }, [targetText, userInput]);

    const onInputChange = (val: string) => {
        if (typingState.isFinished) return;

        updateTypingInput(val);

        if (val === targetText) {
            finishTyping();
        }
    };

    const progress = targetText.length > 0
        ? Math.min(100, (userInput.length / targetText.length) * 100)
        : 0;

    return {
        charFeedbacks,
        onInputChange,
        progress,
        isFinished: typingState.isFinished,
        targetText,
        userInput,
    };
};

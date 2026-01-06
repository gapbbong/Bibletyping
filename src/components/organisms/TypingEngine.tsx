'use client';

import React, { useRef, useEffect, useMemo } from 'react';
import { useTyping } from '@/hooks/useTyping';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { decomposeHangul } from '@/utils/hangulUtils';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const TypingEngine: React.FC = () => {
    const { charFeedbacks, onInputChange, progress, isFinished, targetText, userInput } = useTyping();
    const inputRef = useRef<HTMLInputElement>(null);

    // 자동 포커스
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleContainerClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    // 글자 클릭 시 해당 위치로 커서 이동
    const handleCharClick = (index: number) => {
        if (isFinished) return;

        // 클릭한 위치까지의 텍스트로 입력값 설정
        const newInput = targetText.substring(0, index);
        onInputChange(newInput);

        // 입력창에 포커스
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    // 현재 입력 중인 글자의 자모 분해
    const currentCharJamo = useMemo(() => {
        const currentIndex = charFeedbacks.findIndex(fb => fb.status === 'current');
        if (currentIndex === -1) return [];

        const currentChar = charFeedbacks[currentIndex].char;
        return decomposeHangul(currentChar);
    }, [charFeedbacks]);

    return (
        <div
            className="flex flex-col items-start w-full px-4 cursor-text"
            onClick={handleContainerClick}>
            {/* 진행바 */}
            <div className="w-full h-1 bg-gray-100 rounded-full mb-8 overflow-hidden shadow-sm">
                <motion.div
                    className="h-full bg-bible-accent"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            {/* 성경 구절 디스플레이 */}
            <div className="relative text-3xl md:text-4xl font-myeongjo font-bold leading-relaxed text-left tracking-wide min-h-[200px]">
                <div className="flex flex-wrap gap-x-1 gap-y-4">
                    {charFeedbacks.map((fb, idx) => (
                        <motion.span
                            key={idx}
                            initial={{ opacity: 0.3 }}
                            animate={{
                                opacity: fb.status === 'pending' ? 0.3 : 1,
                                color: fb.status === 'correct' ? '#2c2c2c' : fb.status === 'wrong' ? '#ef4444' : fb.status === 'current' ? '#8b4513' : '#a0a0a0',
                            }}
                            className={cn(
                                "relative inline-block transition-colors duration-200 cursor-pointer hover:opacity-80",
                                fb.status === 'current' && "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-bible-accent after:animate-pulse"
                            )}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleCharClick(idx);
                            }}>
                            {/* 현재 입력 중인 글자와 겹쳐서 자모 표시 */}
                            {fb.status === 'current' && currentCharJamo.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 flex items-center justify-center gap-0.5 text-2xl md:text-3xl text-bible-accent/70 font-sans pointer-events-none"
                                >
                                    {currentCharJamo.map((jamo, jamoIdx) => (
                                        <span key={jamoIdx}>{jamo}</span>
                                    ))}
                                </motion.div>
                            )}
                            {fb.char === ' ' ? '\u00A0' : fb.char}
                        </motion.span>
                    ))}
                </div>
            </div>

            {/* 실제 입력창 (숨김 처리) */}
            <input
                ref={inputRef}
                type="text"
                className="absolute opacity-0 pointer-events-none"
                value={userInput}
                onChange={(e) => onInputChange(e.target.value)}
                disabled={isFinished}
                autoFocus
            />

            {/* 안내 메시지 */}
            <AnimatePresence>
                {!userInput && (
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 0.5, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-8 text-sm font-sans tracking-widest uppercase text-bible-text-soft"
                    >
                        말씀을 따라 타이핑을 시작하세요
                    </motion.p>
                )}
            </AnimatePresence>

            {/* 완료 모달/메시지 (간소화 버전) */}
            {isFinished && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-12 p-8 border border-bible-accent/20 bg-white shadow-2xl rounded-2xl text-center"
                >
                    <h3 className="text-xl font-myeongjo mb-4 font-bold text-bible-accent">묵상 완료</h3>
                    <p className="text-gray-600 mb-6">생명의 말씀을 마음에 새겼습니다.</p>
                    <button
                        className="px-8 py-3 bg-bible-accent text-white rounded-full hover:bg-bible-accent/90 transition-all font-sans"
                        onClick={() => window.location.reload()} // 임시 새로고침
                    >
                        다음 구절로
                    </button>
                </motion.div>
            )}
        </div>
    );
};

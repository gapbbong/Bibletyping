'use client';

import React, { useRef, useEffect } from 'react';
import { useTyping } from '@/hooks/useTyping';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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

    return (
        <div
            className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-4 py-12 cursor-text"
            onClick={handleContainerClick}
        >
            {/* 진행바 */}
            <div className="w-full h-1 bg-gray-100 rounded-full mb-12 overflow-hidden shadow-sm">
                <motion.div
                    className="h-full bg-bible-accent"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            {/* 성경 구절 디스플레이 */}
            <div className="relative text-3xl md:text-4xl font-myeongjo leading-relaxed text-center tracking-wide min-h-[200px] flex items-center justify-center">
                <div className="flex flex-wrap justify-center gap-x-1 gap-y-4">
                    {charFeedbacks.map((fb, idx) => (
                        <motion.span
                            key={idx}
                            initial={{ opacity: 0.3 }}
                            animate={{
                                opacity: fb.status === 'pending' ? 0.3 : 1,
                                color: fb.status === 'correct' ? '#2c2c2c' : fb.status === 'wrong' ? '#ef4444' : fb.status === 'current' ? '#8b4513' : '#a0a0a0',
                            }}
                            className={cn(
                                "relative inline-block transition-colors duration-200",
                                fb.status === 'current' && "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-bible-accent after:animate-pulse"
                            )}
                        >
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

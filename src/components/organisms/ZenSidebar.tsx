'use client';

import React, { useState } from 'react';
import { useStore } from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Music, Mic, Repeat, Layers, ChevronRight, Share2, Info } from 'lucide-react';

export const ZenSidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { settings, setSettings } = useStore();

    return (
        <>
            {/* 트리거 버튼 (오른쪽 위) */}
            <motion.button
                className="fixed right-6 top-6 p-3 bg-white/80 backdrop-blur-md shadow-xl rounded-full z-50 hover:bg-bible-accent hover:text-white transition-colors border border-gray-100"
                onMouseEnter={() => setIsOpen(true)}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: isOpen ? 0 : 0.6, x: 0 }}
                whileHover={{ opacity: 1 }}
            >
                <Settings size={20} />
            </motion.button>

            {/* 사이드바 본체 */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        onMouseLeave={() => setIsOpen(false)}
                        className="fixed right-0 top-0 h-full w-[66.67vw] max-w-md bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.05)] z-50 p-8 border-l border-gray-100 flex flex-col"
                    >
                        <div className="flex items-center justify-between mb-10 text-bible-accent">
                            <div className="flex items-center gap-3">
                                <Layers size={24} />
                                <h2 className="text-xl font-myeongjo font-bold">환경 설정</h2>
                            </div>
                            <span className="text-xs text-gray-400 font-sans">v1.5</span>
                        </div>

                        <div className="space-y-8 flex-1">
                            {/* 반복 설정 */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Repeat size={16} />
                                    <span className="text-xs font-sans font-medium uppercase tracking-widest">반복 횟수</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    {[1, 3, 5, 7].map((num) => (
                                        <button
                                            key={num}
                                            onClick={() => setSettings({ repetitionCount: num })}
                                            className={`w-10 h-10 rounded-lg text-sm transition-all ${settings.repetitionCount === num
                                                ? 'bg-bible-accent text-white shadow-lg'
                                                : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                                                }`}
                                        >
                                            {num}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* 기능 토글 */}
                            <div className="space-y-6 pt-4 border-t border-gray-50">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Music size={18} className="text-gray-400" />
                                        <span className="text-sm font-sans text-gray-600">배경 음악 (BGM)</span>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={settings.bgmEnabled}
                                        onChange={(e) => setSettings({ bgmEnabled: e.target.checked })}
                                        className="accent-bible-accent"
                                    />
                                </div>

                                <div className="flex items-center justify-between opacity-50">
                                    <div className="flex items-center gap-3">
                                        <Mic size={18} className="text-gray-400" />
                                        <span className="text-sm font-sans text-gray-600">음성 인식 (STT)</span>
                                        <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded">준비중</span>
                                    </div>
                                    <input type="checkbox" disabled className="accent-bible-accent" />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Share2 size={18} className="text-gray-400" />
                                        <span className="text-sm font-sans text-gray-600">가족 공유</span>
                                    </div>
                                    <ChevronRight size={16} className="text-gray-300" />
                                </div>
                            </div>
                        </div>

                        {/* 하단 정보 */}
                        <div className="mt-auto space-y-4 pt-8 border-t border-gray-50">
                            <div className="flex items-center gap-3 text-gray-400 hover:text-bible-accent cursor-pointer transition-colors">
                                <Info size={16} />
                                <span className="text-xs font-sans">도움말 및 안내</span>
                            </div>
                            <p className="text-[10px] text-gray-300 font-sans">© 2026 BibleTyping</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

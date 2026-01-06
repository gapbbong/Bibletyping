'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';
import { SAMPLE_VERSES } from '@/constants/verses';
import { TypingEngine } from '@/components/organisms/TypingEngine';
import { ZenSidebar } from '@/components/organisms/ZenSidebar';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const { currentVerse, setCurrentVerse } = useStore();
  const [isLoaded, setIsLoaded] = useState(false);

  // 초기 구절 로드 (첫 번째 샘플 데이터)
  useEffect(() => {
    if (!currentVerse) {
      setCurrentVerse(SAMPLE_VERSES[0]);
    }

    // 부드러운 진입 효과를 위한 지연
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, [currentVerse, setCurrentVerse]);

  return (
    <main className="relative min-h-screen flex flex-col items-center overflow-hidden">
      {/* 배경 장식 (미니멀) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-bible-accent/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-bible-accent/5 blur-[120px] rounded-full" />
      </div>

      <AnimatePresence>
        {isLoaded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="z-10 w-full max-w-4xl px-4">
            {/* 상단 정보 (구절 정보) */}
            <div className="text-left mt-8 mb-4">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 0.8 }}
                className="text-xs font-sans tracking-[0.2em] font-medium">
                {currentVerse?.book} {currentVerse?.chapter}:{currentVerse?.verse}
              </motion.span>
            </div>

            {/* 메인 타이핑 엔진 */}
            <TypingEngine />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 설정 사이드바 */}
      <ZenSidebar />

      {/* 하단 푸터 (몰입을 위해 고정) */}
      <footer className="absolute bottom-8 left-0 w-full text-center z-10">
        <p className="text-[10px] text-gray-300 font-sans tracking-widest uppercase">
          Bible Meditation & Typing
        </p>
      </footer>
    </main>
  );
}

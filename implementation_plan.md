# BibleTyping 프로젝트 구현 계획

## 1. 프로젝트 개요
사용자가 성경 구절을 따라 쓰며 묵상하고 암송할 수 있도록 돕는 웹 기반 애플리케이션입니다.

## 2. 기술 스택
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: React Hooks (useState, useEffect)

## 3. 구현 단계

### 1단계: 프로젝트 설정 (Setup)
- Next.js 프로젝트 생성
- Tailwind CSS 설정
- 기본 폴더 구조 잡기

### 2단계: 핵심 컴포넌트 개발
1.  **TypingEngine (타이핑 엔진)**
    - 타겟 텍스트와 사용자 입력 실시간 비교
    - 한글 자모 단위 처리 (가능한 경우) 또는 단순 문자열 비교
    - 일치/불일치 색상 하이라이팅 (초록/빨강)
2.  **VerseSelector (구절 선택 및 설정)**
    - 성경 구절 데이터(JSON) 연동
    - 반복 횟수 설정 (Input/Slider)
3.  **CompletionModal (완료 모달)**
    - 목표 횟수 달성 시 팝업
    - "다음 구절" vs "메인으로" 버튼 제공

### 3단계: 페이지 구성
- **메인 페이지**: 환영 메시지 및 구절/옵션 선택
- **타이핑 페이지**: 집중 모드 UI, 상단 진행바, 중앙 텍스트
- **로그인 시뮬레이션**: 구글 로그인 버튼 (UI Only)

## 4. 데이터 구조 (예시)
```typescript
interface Verse {
  id: string;
  reference: string; // 예: "창세기 1:1"
  text: string;      // 예: "태초에 하나님이 천지를 창조하시니라"
}
```

## 5. UI 가이드라인
- **미니멀리즘**: 흰색/연회색 배경, 불필요한 장식 제거
- **가독성**: 명조체 계열(성경 느낌) 또는 깔끔한 고딕체
- **피드백**: 오타 발생 시 즉각적이지만 부드러운 시각적 피드백

import { Verse } from '@/types/verse';

export const SAMPLE_VERSES: Verse[] = [
    {
        id: '1',
        book: '창세기',
        chapter: 1,
        verse: 1,
        text: '태초에 하나님이 천지를 창조하시니라',
        translation: 'KRV',
        nounIndices: [0, 1, 2, 4, 5, 6, 8, 9], // "태초", "하나님", "천지"
    },
    {
        id: '2',
        book: '요한복음',
        chapter: 3,
        verse: 16,
        text: '하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니 이는 저를 믿는 자마다 멸망치 않고 영생을 얻게 하려 하심이니라',
        translation: 'KRV',
        nounIndices: [0, 1, 2, 4, 5, 12, 13, 14, 21, 22, 28, 29], // "하나님", "세상", "독생자", "자", "영생"
    },
    {
        id: '3',
        book: '시편',
        chapter: 23,
        verse: 1,
        text: '여호와는 나의 목자시니 내가 부족함이 없으리로다',
        translation: 'KRV',
        nounIndices: [0, 1, 2, 5, 6, 8, 9, 10], // "여호와", "목자", "부족함"
    },
    {
        id: '4',
        book: '빌립보서',
        chapter: 4,
        verse: 13,
        text: '내게 능력 주시는 자 안에서 내가 모든 것을 할 수 있느니라',
        translation: 'KRV',
        nounIndices: [2, 3, 6, 7, 11, 12, 13], // "능력", "자", "것"
    },
    {
        id: '5',
        book: '잠언',
        chapter: 3,
        verse: 5,
        text: '너는 마음을 다하여 여호와를 신뢰하고 네 명철을 의지하지 말라',
        translation: 'KRV',
        nounIndices: [2, 3, 7, 8, 9, 12, 13], // "마음", "여호와", "명철"
    },
    {
        id: '6',
        book: '로마서',
        chapter: 8,
        verse: 28,
        text: '우리가 알거니와 하나님을 사랑하는 자 곧 그의 뜻대로 부르심을 입은 자들에게는 모든 것이 합력하여 선을 이루느니라',
        translation: 'KRV',
        nounIndices: [6, 7, 8, 11, 12, 14, 15, 16, 19, 20, 21, 26, 27, 29], // "하나님", "자", "뜻", "부르심", "자들", "것", "선"
    },
];

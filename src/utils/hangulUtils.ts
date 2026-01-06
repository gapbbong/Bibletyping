/**
 * 한글 자모 분해 유틸리티
 * 한글 유니코드 범위: 0xAC00 ~ 0xD7A3
 * 초성 19개, 중성 21개, 종성 28개 (종성 없음 포함)
 */

const CHO = [
    'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ',
    'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
];

const JUNG = [
    'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ',
    'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'
];

const JONG = [
    '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ',
    'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ',
    'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
];

/**
 * 한글 글자를 초성, 중성, 종성으로 분해
 * @param char 분해할 한글 글자 (1글자)
 * @returns 분해된 자모 배열 [초성, 중성, 종성?]
 */
export function decomposeHangul(char: string): string[] {
    if (!char || char.length !== 1) {
        return [char];
    }

    const code = char.charCodeAt(0);

    // 한글이 아닌 경우
    if (code < 0xAC00 || code > 0xD7A3) {
        return [char];
    }

    const base = code - 0xAC00;
    const choIndex = Math.floor(base / 588);
    const jungIndex = Math.floor((base % 588) / 28);
    const jongIndex = base % 28;

    const result = [CHO[choIndex], JUNG[jungIndex]];

    // 종성이 있는 경우에만 추가
    if (jongIndex > 0) {
        result.push(JONG[jongIndex]);
    }

    return result;
}

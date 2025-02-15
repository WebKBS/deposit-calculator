/**
 * 1000단위 콤마 추가
 * @param value - 값
 * @returns
 */
export const parseInputNumber = (value: string): number => {
  return parseFloat(value?.replace(/,/g, '')) || 0;
};

// 콤마 제거
export const removeCommaAndConvert = (value: string) => {
  return +value?.replace(/,/g, '')!;
};

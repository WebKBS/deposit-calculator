const PERCENTAGE = 100; // 백분률

/**
 * 계약금 및 잔금 변환 함수
 * @param defaultDeposit - 기본 계약금
 * @param inputValue - Input 값
 * @returns
 */
export const convertDepositAndBalance = (
  defaultDeposit: number,
  inputValue: number
): number => {
  return defaultDeposit * (inputValue / PERCENTAGE);
};

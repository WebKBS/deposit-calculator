const PERCENTAGE = 100; // 백분률

/**
 * 백분률 변환 함수
 * @param value - Input 값
 * @returns
 */
export const percentageConversion = (value: number): number => {
  return value / PERCENTAGE;
};

/**
 * 보증금 전환 금액 및 계약금 전환 계산 함수
 * 기본 계약금 * Input 값
 * @param defaultDepositValue - 기본 계약금
 * @param inputValue - Input 값
 * @returns
 */
export const conversionAmount = (
  defaultDepositValue: number,
  inputValue: number
): number => {
  return defaultDepositValue * percentageConversion(inputValue);
};

/**
 * 최대 월 임대료 계산 함수
 * 최대 월 임대료 계산 = 기본 월 임대료 - ((최소 보증금 - 기본 보증금) * 전환 이율) / 12
 * @param defaultRentValue - 기본 월 임대료
 * @param minimumDepositValue - 최소 보증금
 * @param defaultDepositValue - 기본 보증금
 * @param inputValue - Input 값
 * @returns
 */
export const maximumMonthlyRentAmount = (
  defaultRentValue: number,
  minimumDepositValue: number,
  defaultDepositValue: number,
  inputValue: number
): number => {
  return (
    defaultRentValue -
    ((minimumDepositValue - defaultDepositValue) *
      percentageConversion(inputValue)) /
      12
  );
};

/**
 * 최소 월 임대료 계산 함수
 * 최소 월 임대료 계산 = 기본 월 임대료 * 최대전환 이율 / 100
 * @param defaultRentValue - 기본 월 임대료
 * @param inputValue - Input 값
 * @returns
 */
export const minimumMonthlyRentAmount = (
  defaultRentValue: number,
  inputValue: number
): number => {
  return defaultRentValue * percentageConversion(inputValue);
};

/**
 * 최대 보증금 전환 금액 계산 함수
 * 최대 보증금 계산 = ((기본 월 임대료 - 최소 월 임대료) / 전환 이율) * 12 + 최소 보증금
 * @param defaultRentValue - 기본 월 임대료
 * @param minimumRentValue - 최소 월 임대료
 * @param defaultDepositValue - 기본 보증금
 * @param inputValue - Input 값
 * @returns
 */
export const maxConversionRateAmount = (
  defaultRentValue: number,
  minimumRentValue: number,
  defaultDepositValue: number,
  inputValue: number
): number => {
  return (
    ((defaultRentValue - minimumRentValue) / percentageConversion(inputValue)) *
      12 +
    defaultDepositValue
  );
};

/**
 * 희망 보증금 계산 함수
 * 희망 보증금 = (기본 월 임대료 - ((희망 보증금 - 기본 보증금) * 전환 이율) / 12
 * @param defaultRentValue - 기본 월 임대료
 * @param defaultDepositValue - 기본 보증금
 * @param conversionRateValue - 전환 이율
 * @param inputValue - Input 값
 * @returns
 */
export const desiredDepositAmount = (
  defaultRentValue: number,
  defaultDepositValue: number,
  conversionRateValue: number,
  inputValue: number
): number => {
  return (
    defaultRentValue -
    ((inputValue - defaultDepositValue) *
      percentageConversion(conversionRateValue)) /
      12
  );
};

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 1000단위 콤마 추가
 * @param value - 값
 * @returns
 */
export const parseInputNumber = (value: string): number => {
  return parseFloat(value?.replace(/,/g, '')) || 0;
};

// 콤마 제거
<<<<<<< HEAD
export const removeCommaAndConvert = (value: string) => {
=======
export const removeCommaChangeNumber = (value: string) => {
>>>>>>> refs/remotes/origin/main
  return +value?.replace(/,/g, '')!;
};

/**
 * 인풋 입력값이 비어있는지 체크
 * @param input - 대상 Input 값
 * @param ref - 대상 Input Ref
 * @param message - Alert 메시지
 * @returns
 */
export const inputCheckAlert = (input: string, message: string) => {
  if (!input || input === '0') {
    alert(message);
    return true;
  }
  return false;
};

import { Input } from '@/components/ui/input';
import { removeCommaAndConvert } from '@/utils/numberUtils';
import { conversionAmount } from '@/utils/sh/calculator';
import { ChangeEvent } from 'react';
import useBalanceStore from '../../store/balanceStore';
import useCalcBalanceStore from '../../store/calcBalanceStore';
import useCalcDownPayment from '../../store/calcDownPayment';
import useDefaultDepositStore from '../../store/defaultDepositStore';
import useDownPaymentStore from '../../store/downPaymentStore';

const DownPaymentInput = () => {
  const downPayment = useDownPaymentStore((state) => state.downPayment);
  const setDownPayment = useDownPaymentStore((state) => state.setDownPayment);
  const setBalance = useBalanceStore((state) => state.setBalance);
  const setCalcDownPayment = useCalcDownPayment(
    (state) => state.setCalcDownPayment
  );
  const defaultDeposit = useDefaultDepositStore(
    (state) => state.defaultDeposit
  );
  const setCalcBalance = useCalcBalanceStore((state) => state.setCalcBalance);

  const handleDownPayment = (event: ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value > 100) {
      alert(`계약금 비율은 100%를 초과할 수 없습니다.`);
      return;
    }

    setDownPayment(event);

    const percentage = 100 - +event.target.value;
    const removeCommaDefaultDeposit = removeCommaAndConvert(defaultDeposit);
    const calcDownPayment = conversionAmount(
      removeCommaDefaultDeposit,
      +event.target.value
    );

    const calcBalance = conversionAmount(removeCommaDefaultDeposit, percentage);

    setBalance(percentage); // 잔금 추가
    setCalcDownPayment(calcDownPayment.toLocaleString()); // 계약금 추가
    setCalcBalance(calcBalance.toLocaleString()); // 잔금 추가
  };

  return (
    <>
      <div className="flex items-center gap-1">
        <Input
          // ref={downPaymentInput}
          id="downPayment"
          type="text"
          placeholder="계약금"
          pattern="[0-9]*"
          inputMode="numeric"
          className="flex-1 w-20 text-right border-red-500"
          maxLength={3}
          onChange={handleDownPayment}
          value={downPayment}
        />
        <span>%</span>
      </div>
    </>
  );
};
export default DownPaymentInput;

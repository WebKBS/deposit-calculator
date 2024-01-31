import { Input } from '@/components/ui/input';
import { ChangeEvent } from 'react';
import useBalanceStore from '../../store/balanceStore';
import useDownPaymentStore from '../../store/downPaymentStore';
import DownPaymentInput from '../Input/DownPaymentInput';

const DownPaymentCard = () => {
  const setDownPayment = useDownPaymentStore((state) => state.setDownPayment);
  const downPayment = useDownPaymentStore((state) => state.downPayment);
  const balance = useBalanceStore((state) => state.balance);
  const setBalance = useBalanceStore((state) => state.setBalance);

  const handleDownPayment = (event: ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value > 100) {
      alert(`계약금 비율은 100%를 초과할 수 없습니다.`);
      return;
    }

    setDownPayment(event);

    const percentage = 100 - +event.target.value;

    setBalance(percentage); // 잔금 추가
  };

  return (
    <div className="flex gap-4">
      <DownPaymentInput onChange={handleDownPayment} value={downPayment} />
      <Input
        readOnly
        className="text-right bg-gray-200 dark:bg-gray-900"
        placeholder="계약 금액"
        // value={calcValues.calcDownPayment}
      />
    </div>
  );
};

export default DownPaymentCard;

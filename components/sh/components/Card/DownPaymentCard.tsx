import { Input } from '@/components/ui/input';
import { ChangeEvent } from 'react';
import useDefaultDepositStore from '../../store/defaultDepositStore';
import useDownPaymentStore from '../../store/downPaymentStore';
import DownPaymentInput from '../Input/DownPaymentInput';

const DownPaymentCard = () => {
  const setDownPayment = useDownPaymentStore((state) => state.setDownPayment);
  const downPayment = useDownPaymentStore((state) => state.downPayment);
  const defaultDeposit = useDefaultDepositStore(
    (state) => state.defaultDeposit
  );

  const handleDownPayment = (event: ChangeEvent<HTMLInputElement>) => {
    if (!defaultDeposit) {
      alert('기본 보증금을 입력해주세요.');
      return;
    }

    setDownPayment(event);
  };

  console.log('계약금: ', downPayment);

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

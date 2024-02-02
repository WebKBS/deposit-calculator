'use client';
import { Input } from '@/components/ui/input';
import useCalcDownPayment from '../../store/shCalcResultStore';

const DownPaymentInputValue = () => {
  const calcDownPayment = useCalcDownPayment((state) => state.calcDownPayment);
  return (
    <Input
      readOnly
      className="text-right bg-gray-200 dark:bg-gray-900"
      placeholder="계약 금액"
      value={calcDownPayment}
    />
  );
};

export default DownPaymentInputValue;

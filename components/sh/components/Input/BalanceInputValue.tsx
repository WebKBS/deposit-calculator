'use client';
import { Input } from '@/components/ui/input';
import useShCalcResultStore from '../../store/shCalcResultStore';

const BalanceInputValue = () => {
  const calcBalance = useShCalcResultStore((state) => state.calcBalance);
  return (
    <Input
      readOnly
      className="text-right bg-gray-200 dark:bg-gray-900"
      placeholder="잔금"
      value={calcBalance}
    />
  );
};

export default BalanceInputValue;

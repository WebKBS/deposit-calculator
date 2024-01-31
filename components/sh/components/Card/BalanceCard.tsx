import { Input } from '@/components/ui/input';
import useBalanceStore from '../../store/balanceStore';
import useCalcBalanceStore from '../../store/calcBalanceStore';
import BalanceInput from '../Input/BalanceInput';

const BalanceCard = () => {
  const balance = useBalanceStore((state) => state.balance);
  const calcBalance = useCalcBalanceStore((state) => state.calcBalance);
  return (
    <div className="flex gap-4">
      <BalanceInput value={balance} />
      <Input
        readOnly
        className="text-right bg-gray-200 dark:bg-gray-900"
        placeholder="잔금"
        value={calcBalance}
      />
    </div>
  );
};

export default BalanceCard;

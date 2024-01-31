import { Input } from '@/components/ui/input';
import BalanceInput from '../Input/BalanceInput';

const BalanceCard = () => {
  return (
    <div className="flex gap-4">
      <BalanceInput value="" />
      <Input
        readOnly
        className="text-right bg-gray-200 dark:bg-gray-900"
        placeholder="잔금"
        // value={calcValues.calcBalance}
      />
    </div>
  );
};

export default BalanceCard;

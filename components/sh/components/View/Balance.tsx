import { Label } from '@/components/ui/label';
import BalanceCard from '../Card/BalanceCard';

const Balance = () => {
  return (
    <div className="mb-6">
      <div className="mb-2 ">
        <Label htmlFor="balance" className="mr-2">
          잔금
        </Label>
      </div>
      <BalanceCard />
    </div>
  );
};

export default Balance;

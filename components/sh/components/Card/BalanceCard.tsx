import BalanceInput from '../Input/BalanceInput';
import BalanceInputValue from '../Input/BalanceInputValue';

const BalanceCard = () => {
  return (
    <div className="flex gap-4">
      <BalanceInput />
      <BalanceInputValue />
    </div>
  );
};

export default BalanceCard;

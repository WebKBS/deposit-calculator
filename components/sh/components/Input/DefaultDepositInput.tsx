import { Input } from '@/components/ui/input';
import { parseInputNumber } from '@/utils/numberUtils';
import { conversionAmount } from '@/utils/sh/calculator';
import shCalcResultStore from '../../store/shCalcResultStore';
import useShStore from '../../store/shStore';

const DefaultDepositInput = () => {
  const defaultDeposit = useShStore((state) => state.defaultDeposit);

  const downPayment = useShStore((state) => state.downPayment);
  const balance = useShStore((state) => state.balance);

  const setCalcDownPayment = shCalcResultStore(
    (state) => state.setCalcDownPayment
  );
  const setCalcBalance = shCalcResultStore((state) => state.setCalcBalance);

  const setDefaultDeposit = useShStore((state) => state.setDefaultDeposit);

  const handleDefaultDeposit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const defaultDepositNumber = parseInputNumber(event.target.value);
    setDefaultDeposit(event);

    if (downPayment && balance) {
      const updatedCalcDownPayment = conversionAmount(
        defaultDepositNumber,
        +downPayment
      );

      const updatedCalcBalance = conversionAmount(
        defaultDepositNumber,
        +balance
      );

      setCalcDownPayment(updatedCalcDownPayment.toLocaleString());
      setCalcBalance(updatedCalcBalance.toLocaleString());
    }
  };

  console.log('기본 보증금: ', defaultDeposit);

  return (
    <Input
      id="defaultDeposit"
      type="text"
      placeholder="기본 보증금 입력"
      pattern="[0-9]*"
      inputMode="decimal"
      className="text-right border-red-500"
      onChange={handleDefaultDeposit}
      value={defaultDeposit}
    />
  );
};

export default DefaultDepositInput;

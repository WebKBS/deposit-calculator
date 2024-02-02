import { Input } from '@/components/ui/input';
import { removeCommaAndConvert } from '@/utils/numberUtils';
import { desiredDepositAmount } from '@/utils/sh/calculator';
import useShCalcResultStore from '../../store/shCalcResultStore';
import useShStore from '../../store/shStore';

const DesiredDepositInput = () => {
  const desiredDeposit = useShStore((state) => state.desiredDeposit);
  const setDesiredDeposit = useShStore((state) => state.setDesiredDeposit);
  const setCalcFinalRent = useShCalcResultStore(
    (state) => state.setCalcFinalRent
  );

  const handleDesiredDeposit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDesiredDeposit(event);

    const defaultDeposit = useShStore.getState().defaultDeposit;
    const defaultRent = useShStore.getState().defaultRent;
    const conversionRate = useShStore.getState().conversionRate;

    const removeCommaDefaultDeposit = removeCommaAndConvert(defaultDeposit);
    const removeCommaDefaultRent = removeCommaAndConvert(defaultRent);
    const removeCommaDesiredDeposit = removeCommaAndConvert(event.target.value);

    if (removeCommaDesiredDeposit === 0) {
      setCalcFinalRent('0');
      return;
    }

    const calcFinalRent = desiredDepositAmount(
      removeCommaDefaultRent,
      removeCommaDefaultDeposit,
      +conversionRate,
      removeCommaDesiredDeposit
    );

    setCalcFinalRent(calcFinalRent.toLocaleString());
  };

  return (
    <Input
      id="desiredDeposit"
      type="text"
      placeholder="희망 보증금 입력"
      className="text-right border-red-500 flex-1"
      onChange={handleDesiredDeposit}
      value={desiredDeposit}
    />
  );
};

export default DesiredDepositInput;

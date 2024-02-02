import { Input } from '@/components/ui/input';
import useDefaultDepositStore from '../../store/shStore';

const DefaultDepositInput = () => {
  const defaultDeposit = useDefaultDepositStore(
    (state) => state.defaultDeposit
  );

  const setDefaultDeposit = useDefaultDepositStore(
    (state) => state.setDefaultDeposit
  );

  const handleDefaultDeposit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDefaultDeposit(event);
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

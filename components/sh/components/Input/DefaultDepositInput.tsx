import { Input } from '@/components/ui/input';
import useDefaultDepositStore from '../../store/defaultDepositStore';

const DefaultDepositInput = () => {
  const handleDefaultDeposit = useDefaultDepositStore(
    (state) => state.handleDefaultDeposit
  );
  const defaultDeposit = useDefaultDepositStore(
    (state) => state.defaultDeposit
  );

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

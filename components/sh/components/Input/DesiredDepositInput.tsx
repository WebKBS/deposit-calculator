import { Input } from '@/components/ui/input';
import useDesiredDepositStore from '../../store/shStore';

const DesiredDepositInput = () => {
  const desiredDeposit = useDesiredDepositStore(
    (state) => state.desiredDeposit
  );
  const setDesiredDeposit = useDesiredDepositStore(
    (state) => state.setDesiredDeposit
  );

  const handleDesiredDeposit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDesiredDeposit(event);
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

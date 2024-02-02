import { Button } from '@/components/ui/button';
import { useDepositChangeStore } from '../../store/depositChangeStore';
import useShCalcResultStore from '../../store/shCalcResultStore';
import useShStore from '../../store/shStore';

export default function DepositChangeButton() {
  const isDepositChange = useDepositChangeStore(
    (state) => state.isDepositChange
  );
  const setToggleDepositChange = useDepositChangeStore(
    (state) => state.setToggleDepositChange
  );

  const resetValue = useShStore((state) => state.resetValue);
  const resetCalcValue = useShCalcResultStore((state) => state.resetCalcValue);

  const handleClick = () => {
    setToggleDepositChange();
    resetValue();
    resetCalcValue();
  };

  return (
    <Button className="px-4" onClick={handleClick}>
      {isDepositChange ? '월세로 변경' : '전세로 변경'}
    </Button>
  );
}

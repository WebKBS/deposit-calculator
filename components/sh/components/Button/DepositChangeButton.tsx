import { Button } from '@/components/ui/button';
import useShCalculatorStore from '../../store/store';

export default function DepositChangeButton() {
  const isDepositChange = useShCalculatorStore(
    (state) => state.isDepositChange
  );
  const toggleDepositChange = useShCalculatorStore(
    (state) => state.toggleDepositChange
  );

  return (
    <Button className="px-4" onClick={toggleDepositChange}>
      {isDepositChange ? '월세로 변경' : '전세로 변경'}
    </Button>
  );
}

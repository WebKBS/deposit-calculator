import { Button } from '@/components/ui/button';
import { useDepositChangeStore } from '../../store/depositChangeStore';

export default function DepositChangeButton() {
  const isDepositChange = useDepositChangeStore(
    (state) => state.isDepositChange
  );
  const setToggleDepositChange = useDepositChangeStore(
    (state) => state.setToggleDepositChange
  );

  return (
    <Button className="px-4" onClick={setToggleDepositChange}>
      {isDepositChange ? '월세로 변경' : '전세로 변경'}
    </Button>
  );
}

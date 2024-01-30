import { TipAlertDialog } from '@/components/Modal/TipAlertDialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import defaultImage from '@/public/default-deposit.png';
import useShCalculatorStore from '../store';

export default function DefaultDepositInput() {
  const handleDefaultDeposit = useShCalculatorStore(
    (state) => state.handleDefaultDeposit
  );
  const defaultDeposit = useShCalculatorStore(
    (state) => state.enteredInput.defaultDeposit
  );

  console.log('기본 보증금: ', defaultDeposit);

  return (
    <div className="mb-6">
      <Label htmlFor="defaultDeposit" className="mr-2">
        기본 보증금
      </Label>
      <TipAlertDialog
        title="기본 보증금이란?"
        body="기본 보증금은 공고문 기준 임대 조건의 '계'에 있는 금액을 입력하시면 됩니다. 단위는 천단위입니다. 예) 76,320 = 76,320,000원"
        image={defaultImage}
      />
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
    </div>
  );
}

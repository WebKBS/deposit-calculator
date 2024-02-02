import { TipAlertDialog } from '@/components/Modal/TipAlertDialog';
import { Label } from '@/components/ui/label';
import defaultImage from '@/public/default-deposit.png';
import DefaultDepositInput from '../Input/DefaultDepositInput';

const DefaultDeposit = () => {
  return (
    <div className="mb-6">
      <div className="mb-2">
        <Label htmlFor="defaultDeposit" className="mr-2">
          기본 보증금
        </Label>
        <TipAlertDialog
          title="기본 보증금이란?"
          body="기본 보증금은 공고문 기준 임대 조건의 '계'에 있는 금액을 입력하시면 됩니다. 단위는 천단위입니다. 예) 76,320 = 76,320,000원"
          image={defaultImage}
        />
      </div>
      <DefaultDepositInput />
    </div>
  );
};

export default DefaultDeposit;

import { TipAlertDialog } from '@/components/Modal/TipAlertDialog';
import { Label } from '@/components/ui/label';
import DownPaymentCard from '../Card/DownPaymentCard';

const DownPayment = () => {
  return (
    <div className="mb-6">
      <div className="mb-2">
        <Label htmlFor="downPayment" className="mr-2">
          계약금
        </Label>

        <TipAlertDialog
          title="계약금이란?"
          body="SH의 계약금은 보통 20% 이며, 계약금을 설정하시면 자동으로 금액이 입력됩니다. 단위는 %입니다. 예) 20 = 20%"
        />
        <p className="my-2 text-xs text-green-600 dark:text-yellow-300">
          *계약금 비율을 입력하면 자동 입력됩니다.
        </p>
      </div>
      <DownPaymentCard />
    </div>
  );
};

export default DownPayment;

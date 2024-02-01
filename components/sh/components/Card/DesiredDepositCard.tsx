import { Label } from '@/components/ui/label';
import EnteredError from '../Error/EnteredError';
import DesiredDepositInput from '../Input/DesiredDepositInput';

const DesiredDepositCard = () => {
  return (
    <>
      <EnteredError />
      <div className="flex items-center gap-4 mt-2">
        <Label htmlFor="desiredDeposit" className="text-xl break-keep">
          희망 보증금
        </Label>
        <DesiredDepositInput />
      </div>
      <p className="text-xs text-right mt-2">*보통 100만원 단위 전환 가능</p>
    </>
  );
};

export default DesiredDepositCard;

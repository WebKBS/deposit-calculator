import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface DesiredDepositProps {
  handleDesiredDeposit: (event: React.ChangeEvent<HTMLInputElement>) => void;
  desiredDeposit: string;
}

export default function DesiredDeposit({
  handleDesiredDeposit,
  desiredDeposit,
}: DesiredDepositProps) {
  return (
    <div className="flex items-center gap-4 mt-2">
      <Label htmlFor="desiredDeposit" className="text-xl break-keep">
        희망 보증금
      </Label>
      <Input
        id="desiredDeposit"
        type="text"
        placeholder="희망 보증금 입력"
        className="text-right border-red-500 flex-1"
        onChange={handleDesiredDeposit}
        value={desiredDeposit}
      />
    </div>
  );
}

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useShCalculatorStore from '../store';

export default function DefaultRentInput() {
  const handleDefaultRent = useShCalculatorStore(
    (state) => state.handleDefaultRent
  );
  const defaultRent = useShCalculatorStore(
    (state) => state.enteredInput.defaultRent
  );

  console.log('기본 월 임대료: ', defaultRent);

  return (
    <div className="mb-6">
      <div className="mb-2">
        <Label htmlFor="defaultRent" className="mr-2">
          기본 월 임대료
        </Label>
      </div>
      <Input
        id="defaultRent"
        type="text"
        placeholder="기본 월 임대료 입력"
        pattern="[0-9]*"
        inputMode="numeric"
        className="text-right border-red-500"
        onChange={handleDefaultRent}
        value={defaultRent}
      />
    </div>
  );
}

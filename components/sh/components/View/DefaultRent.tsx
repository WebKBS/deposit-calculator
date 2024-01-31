import { Label } from '@/components/ui/label';
import DefaultRentInput from '../Input/DefaultRentInput';

export default function DefaultRent() {
  return (
    <div className="mb-6">
      <div className="mb-2">
        <Label htmlFor="rent" className="mr-2">
          기본 월 임대료
        </Label>
      </div>
      <DefaultRentInput />
    </div>
  );
}

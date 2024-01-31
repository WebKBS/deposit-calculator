import { Input } from '@/components/ui/input';
import useDefaultRentStore from '../../store/defaultRentStore';

const DefaultRentInput = () => {
  const handleDefaultRent = useDefaultRentStore(
    (state) => state.setDefaultRent
  );
  const defaultRent = useDefaultRentStore((state) => state.defaultRent);

  console.log('기본 월 임대료: ', defaultRent);

  return (
    <Input
      id="rent"
      type="text"
      placeholder="기본 월 임대료 입력"
      pattern="[0-9]*"
      inputMode="numeric"
      className="text-right border-red-500"
      onChange={handleDefaultRent}
      value={defaultRent}
    />
  );
};

export default DefaultRentInput;

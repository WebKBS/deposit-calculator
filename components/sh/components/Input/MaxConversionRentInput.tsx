import { Input } from '@/components/ui/input';
import { ChangeEvent } from 'react';
import useMaxConversionRateStore from '../../store/maxConversionRateStore';

const MaxConversionRentInput = () => {
  const maxConversionRate = useMaxConversionRateStore(
    (state) => state.maxConversionRate
  );

  const setMaxConversionRate = useMaxConversionRateStore(
    (state) => state.setMaxConversionRate
  );

  const handleMaxConversionRate = (event: ChangeEvent<HTMLInputElement>) => {
    setMaxConversionRate(event);
  };

  return (
    <Input
      type="text"
      placeholder="%"
      maxLength={6}
      className="w-16 h-8 text-right border-red-500"
      onChange={handleMaxConversionRate}
      value={maxConversionRate}
    />
  );
};

export default MaxConversionRentInput;

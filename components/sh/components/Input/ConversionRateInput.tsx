import { Input } from '@/components/ui/input';
import { ChangeEvent } from 'react';
import useConversionRateStore from '../../store/conversionRateStore';

const ConversionRateInput = () => {
  const conversionRate = useConversionRateStore(
    (state) => state.conversionRate
  );

  const setConversionRate = useConversionRateStore(
    (state) => state.setConversionRate
  );

  const handleConversionRate = (event: ChangeEvent<HTMLInputElement>) => {
    setConversionRate(event);
  };

  return (
    <Input
      type="text"
      placeholder="%"
      maxLength={6}
      className="w-16 h-8 text-right border-red-500"
      onChange={handleConversionRate}
      value={conversionRate}
    />
  );
};

export default ConversionRateInput;

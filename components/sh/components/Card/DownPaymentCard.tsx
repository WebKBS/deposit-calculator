import { Input } from '@/components/ui/input';
import useDownPaymentStore from '../../store/downPaymentStore';
import DownPaymentInput from '../Input/DownPaymentInput';

const DownPaymentCard = () => {
  const handleDownPayment = useDownPaymentStore(
    (state) => state.handleDownPayment
  );

  const downPayment = useDownPaymentStore((state) => state.downPayment);

  console.log('계약금: ', downPayment);

  return (
    <div className="flex gap-4">
      <DownPaymentInput onChange={handleDownPayment} value={downPayment} />
      <Input
        readOnly
        className="text-right bg-gray-200 dark:bg-gray-900"
        placeholder="계약 금액"
        // value={calcValues.calcDownPayment}
      />
    </div>
  );
};

export default DownPaymentCard;

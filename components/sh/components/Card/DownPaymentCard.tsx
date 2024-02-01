import DownPaymentInput from '../Input/DownPaymentInput';
import DownPaymentInputValue from '../Input/DownPaymentInputValue';

const DownPaymentCard = () => {
  return (
    <div className="flex gap-4">
      <DownPaymentInput />
      <DownPaymentInputValue />
    </div>
  );
};

export default DownPaymentCard;

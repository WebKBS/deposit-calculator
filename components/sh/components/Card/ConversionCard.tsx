import { useDepositChangeStore } from '../../store/depositChangeStore';
import ConversionRateInput from '../Input/ConversionRateInput';
import MaxConversionRateInput from '../Input/MaxConversionRateInput';

const ConversionCard = () => {
  const isDepositChange = useDepositChangeStore(
    (state) => state.isDepositChange
  );

  return (
    <>
      <div className="flex items-center gap-2 mb-2 text-sm">
        {!isDepositChange ? '보증금의' : '월 임대료의'} {''}
        <MaxConversionRateInput /> % 까지 전환
      </div>
      <div className="flex items-center gap-2 mb-2 text-sm">
        전환 이율
        <ConversionRateInput /> %
      </div>
    </>
  );
};

export default ConversionCard;

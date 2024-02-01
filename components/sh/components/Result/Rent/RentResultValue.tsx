import { useDepositChangeStore } from '../../../store/depositChangeStore';

const RentResultValue = () => {
  const isDepositChange = useDepositChangeStore(
    (state) => state.isDepositChange
  );
  const textColor = isDepositChange ? 'text-blue-500' : 'text-red-500';

  const value = '';

  return (
    <span className={`mr-1 text-xl font-semibold break-all ${textColor}`}>
      {value || 0}
    </span>
  );
};

export default RentResultValue;

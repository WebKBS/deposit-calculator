'use client';
import { useDepositChangeStore } from '../../../store/depositChangeStore';

const DepsoitResultState = () => {
  const isDepositChange = useDepositChangeStore(
    (state) => state.isDepositChange
  );

  const textColor = !isDepositChange ? 'text-blue-500' : 'text-red-500';
  const text = !isDepositChange ? '최소' : '최대';

  return <span className={`text-lg font-semibold ${textColor}`}>{text} </span>;
};

export default DepsoitResultState;

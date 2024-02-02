import DepositResultState from './DepositResultState';
import DepositResultValue from './DepositResultValue';

const DepositResult = () => {
  return (
    <div className="flex justify-between gap-2">
      <p className="min-w-24">
        <DepositResultState />
        보증금:
      </p>
      <p>
        <DepositResultValue />원
      </p>
    </div>
  );
};

export default DepositResult;

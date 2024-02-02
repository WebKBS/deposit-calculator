import RentResultState from './RentResultState';
import RentResultValue from './RentResultValue';

const RentResult = () => {
  return (
    <div className="flex justify-between gap-2">
      <p className="min-w-24">
        <RentResultState />
        임대료:
      </p>
      <p>
        <RentResultValue />원
      </p>
    </div>
  );
};

export default RentResult;

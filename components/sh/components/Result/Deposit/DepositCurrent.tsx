import DepositCurrentValue from './DepositCurrentValue';

const DepositCurrent = () => {
  return (
    <div className="mb-2 text-right mt-2 text-sm ">
      현재 기본 보증금: <DepositCurrentValue /> 원
    </div>
  );
};

export default DepositCurrent;

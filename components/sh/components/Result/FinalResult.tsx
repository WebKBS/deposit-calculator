import useCalcFinalRentStore from '../../store/shCalcResultStore';

const FinalResult = () => {
  const calcDesiredDeposit = useCalcFinalRentStore(
    (state) => state.calcFinalRent
  );

  return (
    <strong className="mr-1 text-2xl font-semibold text-red-500 break-all">
      {calcDesiredDeposit || 0}
    </strong>
  );
};

export default FinalResult;

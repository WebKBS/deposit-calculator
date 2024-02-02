import useDefaultDepositStore from '@/components/sh/store/shStore';

const DepositCurrentValue = () => {
  const defaultDeposit = useDefaultDepositStore(
    (state) => state.defaultDeposit
  );

  return (
    <span className="text-green-500 dark:text-yellow-300">
      {defaultDeposit || 0}
    </span>
  );
};

export default DepositCurrentValue;

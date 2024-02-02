'use client';
import { useDepositChangeStore } from '../../store/depositChangeStore';
import useErrorStore from '../../store/enteredErrorStore';

const EnteredError = () => {
  const isDepositChange = useDepositChangeStore(
    (state) => state.isDepositChange
  );

  const enteredError = useErrorStore((state) => state.enteredError);

  return (
    <>
      {enteredError && (
        <div className="text-xs text-right mb-4 text-green-500 dark:text-yellow-300">
          * 희망보증금은{' '}
          {!isDepositChange ? (
            <>
              <span className="text-blue-500">최소</span>
              <span className="dark:text-white text-black">
                {' '}
                보증금
              </span> 보다 <span className="text-blue-500">낮을 수</span>
            </>
          ) : (
            <>
              <span className="text-red-500">최대</span>
              <span className="dark:text-white text-black">
                {' '}
                보증금
              </span> 보다 <span className="text-red-500">높을 수</span>
            </>
          )}{' '}
          없습니다.
        </div>
      )}
    </>
  );
};

export default EnteredError;

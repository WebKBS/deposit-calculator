'use client';
import { parseInputNumber, removeCommaAndConvert } from '@/utils/numberUtils';
import {
  conversionAmount,
  desiredDepositAmount,
  maxConversionRateAmount,
  maximumMonthlyRentAmount,
  minimumMonthlyRentAmount,
} from '@/utils/sh/calculator';
import { inputCheckAlert } from '@/utils/validate';
import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { toast } from 'sonner';
import CurrentBasicDeposit from './Form/CurrentBasicDeposit';
import DesiredDeposit from './Form/DesiredDeposit';
import Result from './Form/Result';
import { TipAlertDialog } from './Modal/TipAlertDialog';
import DepositChangeButton from './sh/components/Button/DepositChangeButton';
import Balance from './sh/components/View/Balance';
import DefaultDeposit from './sh/components/View/DefaultDeposit';
import DefaultRent from './sh/components/View/DefaultRent';
import DepositRentChange from './sh/components/View/DepositRentChange';
import DownPayment from './sh/components/View/DownPayment';
import useShCalculatorStore from './sh/store/store';
import { Input } from './ui/input';
import { Label } from './ui/label';

const LIMIT_PERCENT = 100;

export default function Calculator() {
  // 수정 라인
  const isDepositChange = useShCalculatorStore(); // 전 월세 변경 버튼
  // 수정 라인 끝

  const defaultInput = useRef<HTMLInputElement>(null);
  const defaultRentInput = useRef<HTMLInputElement>(null);
  const downPaymentInput = useRef<HTMLInputElement>(null);
  const maxConversionRateInput = useRef<HTMLInputElement>(null);
  const conversionRateInput = useRef<HTMLInputElement>(null);

  const [enteredInput, setEnteredInput] = useState({
    defaultDeposit: '', // 기본 보증금
    defaultRent: '', // 기본 월 임대료
    downPayment: '', // 계약금
    balance: '', // 잔금
    maxConversionRate: '', // 최대 상호전환 비율
    conversionRate: '', // 상호전환 비율
    desiredDeposit: '', // 희망 보증금
  });

  const [calcValues, setCalcValues] = useState({
    calcDownPayment: '', // 계산된 계약금
    calcBalance: '', // 계산된 잔금
    calcDeposit: '0', // 계산된 보증금
    calcRent: '0', // 계산된 임대료
    calcDesiredDeposit: '', // 계산된 희망 보증금
  });

  const [error, setError] = useState(false);

  // 초기화 함수
  const resetState = useCallback(() => {
    if (enteredInput.maxConversionRate !== '') {
      toast('상호전환 계산이 초기화 되었습니다.', {
        action: {
          label: '확인',
          onClick: () => console.log('toast closed'),
        },
      });
    }
  }, [enteredInput.maxConversionRate]);

  // 기본 보증금 계산
  const handleDefaultDeposit = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      const defaultDepositInputValue = parseInputNumber(target.value); // 입력값을 숫자로 변환

      resetState();

      setEnteredInput({
        ...enteredInput,
        defaultDeposit: defaultDepositInputValue.toLocaleString(),
        maxConversionRate: '', // 최대 상호전환 비율 초기화
        conversionRate: '', // 상호전환 비율 초기화
        desiredDeposit: '', // 희망 보증금 초기화
      });

      // 계약금 및 잔금 input값이 있을 때
      if (enteredInput.downPayment && enteredInput.balance) {
        // 계약금 자동 계산
        const updatedCalcDownPayment = conversionAmount(
          defaultDepositInputValue,
          +enteredInput.downPayment
        );

        // 잔금 자동 계산
        const updatedCalcBalance = conversionAmount(
          defaultDepositInputValue,
          +enteredInput.balance
        );

        setCalcValues({
          ...calcValues,
          calcDownPayment: updatedCalcDownPayment.toLocaleString(),
          calcBalance: updatedCalcBalance.toLocaleString(),
          calcDesiredDeposit: '', // 예상 월 임대료 초기화
          calcDeposit: '0',
          calcRent: '0',
        });
      }
    },
    [enteredInput, calcValues, resetState]
  );

  // 기본 월 임대료 계산
  const handleDefaultRent = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const defaultRentInputValue = parseInputNumber(target.value); // 입력값을 숫자로 변환

    resetState();

    setEnteredInput({
      ...enteredInput,
      defaultRent: defaultRentInputValue.toLocaleString(),
      maxConversionRate: '', // 최대 상호전환 비율 초기화
      conversionRate: '', // 상호전환 비율 초기화
      desiredDeposit: '', // 희망 보증금 초기화
    });

    setCalcValues({
      ...calcValues,
      calcDeposit: '0', // 계산된 보증금 초기화
      calcRent: '0', // 계산된 임대료 초기화
      calcDesiredDeposit: '', // 예상 월 임대료 초기화
    });
  };

  // 계약금 계산
  const handleDownPayment = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      const downPaymentInputValue = parseInputNumber(target.value);

      // 기본 보증금이 입력되지 않았을 경우
      if (!enteredInput.defaultDeposit) {
        defaultInput.current?.focus();
        alert('기본 보증금을 입력해주세요.');
        return;
      }

      const removeCommaDefaultDeposit = removeCommaAndConvert(
        enteredInput.defaultDeposit
      ); // 기본 보증금 콤마 제거

      // 계약금 비율이 100%를 초과할 경우
      if (+downPaymentInputValue > LIMIT_PERCENT) {
        alert(`계약금 비율은 ${LIMIT_PERCENT}%를 초과할 수 없습니다.`);
        return;
      }

      // 잔금 퍼센트 계산
      // 잔금 = 100% - 계약금 비율
      const calcBalancePercent = LIMIT_PERCENT - downPaymentInputValue;

      // 계약금 자동 계산
      const calcDownPaymentValue = conversionAmount(
        removeCommaDefaultDeposit,
        downPaymentInputValue
      );

      // 잔금 자동 계산
      const calcBalanceValue = conversionAmount(
        removeCommaDefaultDeposit,
        calcBalancePercent
      );

      setEnteredInput({
        ...enteredInput,
        balance: calcBalancePercent.toString(),
        downPayment: String(downPaymentInputValue),
      });

      setCalcValues({
        ...calcValues,
        calcDownPayment: calcDownPaymentValue.toLocaleString(),
        calcBalance: calcBalanceValue.toLocaleString(),
      });
    },

    [enteredInput, calcValues]
  );

  // 최대 상호전환 비율
  const handleMaxConversionRate = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      if (
        inputCheckAlert(
          enteredInput.defaultDeposit,
          '기본 보증금을 입력해주세요.'
        )
      ) {
        defaultInput.current?.focus();
        return;
      } else if (
        inputCheckAlert(
          enteredInput.defaultRent,
          '기본 월 임대료를 입력해주세요.'
        )
      ) {
        defaultRentInput.current?.focus();
        return;
      }

      const maxConversionRateInputValue = target.value;

      // 최대 상호전환 비율이 100%를 초과할 경우
      if (+maxConversionRateInputValue > LIMIT_PERCENT) {
        alert(`최대 상호전환 비율은 ${LIMIT_PERCENT}%를 초과할 수 없습니다.`);
        return;
      }

      setEnteredInput({
        ...enteredInput,
        maxConversionRate: String(maxConversionRateInputValue),
        desiredDeposit: '', // 희망 보증금 초기화
      });

      // 기본 보증금 콤마 제거
      const removeCommaDefaultDeposit = removeCommaAndConvert(
        enteredInput.defaultDeposit
      );

      // 기본 월 임대료 콤마 제거
      const removeCommaDefaultRent = removeCommaAndConvert(
        enteredInput.defaultRent
      );

      if (!isDepositChange) {
        // 월 임대료 상향일 경우

        const minimumDepositValue = conversionAmount(
          removeCommaDefaultDeposit,
          +maxConversionRateInputValue
        );

        setCalcValues({
          ...calcValues,
          calcDesiredDeposit: '', // 예상 월 임대료 초기화
          calcDeposit: minimumDepositValue.toLocaleString(),
        });

        // 전환 이율 입력값이 있을 경우
        if (enteredInput.conversionRate) {
          const maximumRentValue = maximumMonthlyRentAmount(
            removeCommaDefaultRent,
            minimumDepositValue,
            removeCommaDefaultDeposit,
            +enteredInput.conversionRate
          );

          setCalcValues({
            ...calcValues,
            calcDesiredDeposit: '', // 예상 월 임대료 초기화
            calcDeposit: minimumDepositValue.toLocaleString(),
            calcRent: maximumRentValue.toLocaleString(),
          });
        }
      } else {
        // 보증금 상향일 경우

        const minimumRentValue = minimumMonthlyRentAmount(
          removeCommaDefaultRent,
          +maxConversionRateInputValue
        );

        setCalcValues({
          ...calcValues,
          calcDesiredDeposit: '', // 예상 월 임대료 초기화
          calcRent: minimumRentValue.toLocaleString(),
        });

        // 전환 이율 입력값이 있을 경우
        if (enteredInput.conversionRate) {
          const maximumDepositValue = maxConversionRateAmount(
            removeCommaDefaultRent,
            minimumRentValue,
            removeCommaDefaultDeposit,
            +enteredInput.conversionRate
          );

          setCalcValues({
            ...calcValues,
            calcDesiredDeposit: '', // 예상 월 임대료 초기화
            calcDeposit: maximumDepositValue.toLocaleString(),
            calcRent: minimumRentValue.toLocaleString(),
          });
        }
      }
    },
    [enteredInput, calcValues, isDepositChange]
  );

  // 전환 이율
  const handleConversionRate = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      if (
        inputCheckAlert(
          enteredInput.defaultDeposit,
          '기본 보증금을 입력해주세요.'
        )
      ) {
        defaultInput.current?.focus();
        return;
      } else if (
        inputCheckAlert(
          enteredInput.defaultRent,
          '기본 월 임대료를 입력해주세요.'
        )
      ) {
        defaultRentInput.current?.focus();
        return;
      } else if (
        inputCheckAlert(
          enteredInput.maxConversionRate,
          '최대 상호전환 비율을 입력해주세요.'
        )
      ) {
        maxConversionRateInput.current?.focus();
        return;
      }

      const conversionRateInputValue = target.value;

      // 전환 비율이 100%를 초과할 경우
      if (+conversionRateInputValue > LIMIT_PERCENT) {
        alert(`전환 이율은 ${LIMIT_PERCENT}%를 초과할 수 없습니다.`);
        return;
      }

      setEnteredInput({
        ...enteredInput,
        conversionRate: String(conversionRateInputValue),
        desiredDeposit: '', // 희망 보증금 초기화
      });

      // 전환 이율 퍼센트
      const conversionRatePercent = +conversionRateInputValue / LIMIT_PERCENT;

      // 기본 보증금 콤마 제거
      const removeCommaDefaultDeposit = removeCommaAndConvert(
        enteredInput.defaultDeposit
      );

      // 기본 월 임대료 콤마 제거
      const removeCommaDefaultRent = removeCommaAndConvert(
        enteredInput.defaultRent
      );

      // 계산된 보증금 콤마 제거
      const removeCommaCalcDeposit = removeCommaAndConvert(
        calcValues.calcDeposit
      );

      if (!isDepositChange) {
        // 최소 보증금, 월 임대료 상향일 경우

        // 최대 월 임대료
        const maximumRentValue = maximumMonthlyRentAmount(
          removeCommaDefaultRent,
          removeCommaCalcDeposit,
          removeCommaDefaultDeposit,
          +conversionRateInputValue
        );

        setCalcValues({
          ...calcValues,
          calcDesiredDeposit: '', // 예상 월 임대료 초기화
          calcRent: maximumRentValue.toLocaleString(),
        });
      } else {
        // 최대 보증금, 월 임대료 하향일 경우

        // 최소 월 임대료
        const minimumRentValue = minimumMonthlyRentAmount(
          removeCommaDefaultRent,
          +enteredInput.maxConversionRate
        );

        setCalcValues({
          ...calcValues,
          calcDesiredDeposit: '', // 예상 월 임대료 초기화
          calcRent: minimumRentValue.toLocaleString(),
        });

        // 최대 보증금 계산
        const maximumDepositValue = maxConversionRateAmount(
          removeCommaDefaultRent,
          minimumRentValue,
          removeCommaDefaultDeposit,
          +conversionRateInputValue
        );

        setCalcValues({
          ...calcValues,
          calcDesiredDeposit: '', // 예상 월 임대료 초기화
          calcDeposit:
            maximumDepositValue === Infinity
              ? '0'
              : maximumDepositValue.toLocaleString(), // 만약 계산된 최대 보증금이 Infinity일 경우 0으로 표시
          calcRent: minimumRentValue.toLocaleString(),
        });
      }
    },
    [enteredInput, isDepositChange, calcValues]
  );

  // 희망 보증금 계산
  const handleDesiredDeposit = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      if (
        inputCheckAlert(
          enteredInput.defaultDeposit,
          '기본 보증금을 입력해주세요.'
        )
      ) {
        defaultInput.current?.focus();
        return;
      } else if (
        inputCheckAlert(
          enteredInput.defaultRent,
          '기본 월 임대료를 입력해주세요.'
        )
      ) {
        defaultRentInput.current?.focus();
        return;
      } else if (
        inputCheckAlert(enteredInput.downPayment, '계약금을 입력해주세요.')
      ) {
        downPaymentInput.current?.focus();
        return;
      } else if (
        inputCheckAlert(
          enteredInput.maxConversionRate,
          '최대 상호전환 비율을 입력해주세요.'
        )
      ) {
        maxConversionRateInput.current?.focus();
        return;
      } else if (
        inputCheckAlert(
          enteredInput.conversionRate,
          '전환 이율을 입력해주세요.'
        )
      ) {
        conversionRateInput.current?.focus();
        return;
      }

      const desiredDepositInputValue = parseInputNumber(target.value);

      setEnteredInput({
        ...enteredInput,
        desiredDeposit: desiredDepositInputValue.toLocaleString(),
      });

      // 기본 보증금 콤마 제거
      const removeCommaDefaultDeposit = removeCommaAndConvert(
        enteredInput.defaultDeposit
      );

      // 기본 월 임대료 콤마 제거
      const removeCommaDefaultRent = removeCommaAndConvert(
        enteredInput.defaultRent
      );

      // 희망 보증금이 0일 경우
      if (desiredDepositInputValue === 0) {
        setCalcValues({
          ...calcValues,
          calcDesiredDeposit: '0',
        });
        return;
      }

      if (!isDepositChange) {
        // 희망 보증금이 기본 보증금보다 높을 경우
        if (desiredDepositInputValue > removeCommaDefaultDeposit) {
          setError(true);
          setCalcValues({
            ...calcValues,
            calcDesiredDeposit: '0',
          });
          return;
        } else setError(false);
      } else {
        // 희망 보증금이 기본 보증금보다 낮을 경우
        if (desiredDepositInputValue < removeCommaDefaultDeposit) {
          setError(true);
          setCalcValues({
            ...calcValues,
            calcDesiredDeposit: '0',
          });
          return;
        } else setError(false);
      }

      // 희망 보증금 계산
      const calcDesiredDeposit = desiredDepositAmount(
        removeCommaDefaultRent,
        removeCommaDefaultDeposit,
        +enteredInput.conversionRate,
        desiredDepositInputValue
      );

      setCalcValues({
        ...calcValues,
        calcDesiredDeposit: calcDesiredDeposit.toLocaleString(),
      });
    },
    [enteredInput, calcValues, isDepositChange]
  );

  // 전월세 변경 버튼 클릭시 초기화
  const changeReset = () => {
    resetState();
    setEnteredInput({
      ...enteredInput,
      maxConversionRate: '', // 최대 상호전환 비율
      conversionRate: '', // 상호전환 비율
      desiredDeposit: '', // 희망 보증금
    });

    setCalcValues({
      ...calcValues,
      calcDeposit: '0', // 계산된 보증금
      calcRent: '0', // 계산된 임대료
      calcDesiredDeposit: '', // 계산된 희망 보증금
    });
  };

  return (
    <div>
      <DefaultDeposit />
      <DefaultRent />
      <DownPayment />
      <Balance />
      <DepositRentChange />

      <div className="mb-6">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-3">
            <div className="flex flex-wrap items-center gap-2 justify-center">
              <p className="flex items-center gap-1">
                <Label>보증금</Label>
                {!isDepositChange ? (
                  <FaArrowDown className="text-blue-600" />
                ) : (
                  <FaArrowUp className="text-red-600" />
                )}
              </p>
              <p className="flex items-center gap-1">
                월 임대료
                {!isDepositChange ? (
                  <FaArrowUp className="text-red-600" />
                ) : (
                  <FaArrowDown className="text-blue-600" />
                )}
              </p>
            </div>
            <TipAlertDialog
              title="보증금, 월 임대료 상호전환"
              body="SH 모집공고를 보시면 상호전환에 대한 내용이 적혀있습니다. 공고물 또는 제공하는 건물에 대해 모두 상호전환 비율이 다를 수 있으며, 입력하시는 비율에 따라 보증금과 임대료는 자동으로 입력됩니다. 보증금 및 월 임대료 변경으로 보증금 상향, 임대로 하향, 등 전환 계산 가능하며, 기본 보증금, 기본 월 임대료, 계약금 변경시 상호전환의 내용은 초기화 됩니다. 단위는 %이며 소수점까지 가능합니다. 예) 50.5 = 50.5%"
            />
          </div>
          <DepositChangeButton />
        </div>
        <div className="flex items-center gap-2 mb-2 text-sm">
          {!isDepositChange ? '보증금의' : '월 임대료의'} {''}
          <Input
            ref={maxConversionRateInput}
            type="text"
            placeholder="%"
            maxLength={6}
            className="w-16 h-8 text-right border-red-500"
            onChange={handleMaxConversionRate}
            value={enteredInput.maxConversionRate}
          />
          % 까지 전환
        </div>
        <div className="flex items-center gap-2 mb-2 text-sm">
          전환 이율
          <Input
            ref={conversionRateInput}
            type="text"
            placeholder="%"
            maxLength={6}
            className="w-16 h-8 text-right border-red-500"
            onChange={handleConversionRate}
            value={enteredInput.conversionRate}
          />
          %
        </div>
        <div>
          <div className="flex justify-between gap-2">
            <p className="min-w-24">
              {!isDepositChange ? (
                <span className="text-lg font-semibold text-blue-500">
                  최소
                </span>
              ) : (
                <span className="text-lg font-semibold text-red-500">최대</span>
              )}{' '}
              보증금:
            </p>

            {!isDepositChange ? (
              <p>
                <span className="mr-1 text-xl font-semibold text-blue-500 break-all">
                  {calcValues.calcDeposit}
                </span>
                원
              </p>
            ) : (
              <p>
                <span className="mr-1 text-xl font-semibold text-red-500 break-all">
                  {calcValues.calcDeposit}
                </span>
                원
              </p>
            )}
          </div>
          <div className="flex justify-between gap-2">
            <p className="min-w-24">
              {!isDepositChange ? (
                <span className="text-lg font-semibold text-red-500">최대</span>
              ) : (
                <span className="text-lg font-semibold text-blue-500">
                  최소
                </span>
              )}{' '}
              임대료:
            </p>
            {!isDepositChange ? (
              <p>
                <span className="mr-1 text-xl font-semibold text-red-500 break-all ">
                  {calcValues.calcRent}
                </span>
                원
              </p>
            ) : (
              <p>
                <span className="mr-1 text-xl font-semibold text-blue-500 break-all">
                  {calcValues.calcRent}
                </span>
                원
              </p>
            )}
          </div>
        </div>
      </div>
      <div>
        <div className="py-2 mx-auto mb-2">
          <CurrentBasicDeposit defaultDeposit={enteredInput.defaultDeposit} />
          {error && (
            <div className="text-xs text-right mb-4 text-green-500 dark:text-yellow-300">
              * 희망보증금은{' '}
              <span className="dark:text-white text-black">기본 보증금</span>{' '}
              보다{' '}
              {!isDepositChange ? (
                <span className="text-red-500">높을 수</span>
              ) : (
                <span className="text-blue-500">낮을 수</span>
              )}{' '}
              없습니다.
            </div>
          )}
          <DesiredDeposit
            handleDesiredDeposit={handleDesiredDeposit}
            desiredDeposit={enteredInput.desiredDeposit}
          />
          <p className="text-xs text-right mt-2">
            *보통 100만원 단위 전환 가능
          </p>
        </div>
        <Result calcDesiredDeposit={calcValues.calcDesiredDeposit} />
      </div>
    </div>
  );
}

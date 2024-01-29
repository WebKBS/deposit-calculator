'use client';
import defaultImage from '@/public/default-deposit.png';
import { useDepositChange } from '@/store/store';
import { parseInputNumber, removeCommaAndConvert } from '@/utils/numberUtils';
import {
  conversionAmount,
  maxConversionRateAmount,
  maximumMonthlyRentAmount,
  minimumMonthlyRentAmount,
} from '@/utils/sh/calculator';
import { inputCheckAlert } from '@/utils/validate';
import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { toast } from 'sonner';
import { TipAlertDialog } from './Modal/TipAlertDialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

const LIMIT_PERCENT = 100;

export default function Calculator() {
  const defaultInput = useRef<HTMLInputElement>(null);
  const defaultRentInput = useRef<HTMLInputElement>(null);
  const downPaymentInput = useRef<HTMLInputElement>(null);
  const maxConversionRateInput = useRef<HTMLInputElement>(null);
  const conversionRateInput = useRef<HTMLInputElement>(null);

  const { isDepositChange, setToggleDepositChange } = useDepositChange();

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

  const [error, setError] = useState(false); // 에러 메세지

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
    [enteredInput, isDepositChange, calcValues]
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
      if (!enteredInput.defaultDeposit) {
        defaultInput.current?.focus();
        alert('기본 보증금을 입력해주세요.');
        return;
      } else if (!enteredInput.defaultRent) {
        defaultRentInput.current?.focus();
        alert('기본 월 임대료를 입력해주세요.');
        return;
      } else if (!enteredInput.downPayment) {
        downPaymentInput.current?.focus();
        alert('계약금을 입력해주세요.');
        return;
      } else if (!enteredInput.maxConversionRate) {
        maxConversionRateInput.current?.focus();
        alert('최대 상호전환 비율을 입력해주세요.');
        return;
      } else if (!enteredInput.conversionRate) {
        conversionRateInput.current?.focus();
        alert('전환 이율을 입력해주세요.');
        return;
      }

      const desiredDepositInputValue = parseInputNumber(target.value); // 입력값을 숫자로 변환

      setEnteredInput({
        ...enteredInput,
        desiredDeposit: desiredDepositInputValue.toLocaleString(),
      });

      const conversionRatePercent =
        +enteredInput.conversionRate / LIMIT_PERCENT; // 전환 이율 퍼센트
      const removeCommaDefaultDeposit = removeCommaAndConvert(
        enteredInput.defaultDeposit
      ); // 기본 보증금 콤마 제거
      const removeCommaDefaultRent = removeCommaAndConvert(
        enteredInput.defaultRent
      ); // 기본 월 임대료 콤마 제거

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
      // 희망 보증금 = (기본 월 임대료 - ((희망 보증금 - 기본 보증금) * 전환 이율 퍼센트) / 12
      const calcDesiredDeposit =
        removeCommaDefaultRent -
        ((desiredDepositInputValue - removeCommaDefaultDeposit) *
          conversionRatePercent) /
          12;

      setCalcValues({
        ...calcValues,
        calcDesiredDeposit: calcDesiredDeposit.toLocaleString(),
      });
    },
    [enteredInput, calcValues, isDepositChange]
  );

  // 전세, 월세 변경 버튼 클릭시
  const toggleDepositChangeHandler = () => {
    setToggleDepositChange();
    changeReset();
  };

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
      <div className="mb-6">
        <div className="mb-2">
          <Label htmlFor="defaultDeposit" className="mr-2">
            기본 보증금
          </Label>
          <TipAlertDialog
            title="기본 보증금이란?"
            body="기본 보증금은 공고문 기준 임대 조건의 '계'에 있는 금액을 입력하시면 됩니다. 단위는 천단위입니다. 예) 76,320 = 76,320,000원"
            image={defaultImage}
          />
        </div>
        <Input
          id="defaultDeposit"
          type="text"
          placeholder="기본 보증금 입력"
          pattern="[0-9]*"
          inputMode="decimal"
          className="text-right border-red-500"
          ref={defaultInput}
          onChange={handleDefaultDeposit}
          value={enteredInput.defaultDeposit}
        />
      </div>
      <div className="mb-6">
        <div className="mb-2">
          <Label htmlFor="rent" className="mr-2">
            기본 월 임대료
          </Label>
        </div>
        <Input
          ref={defaultRentInput}
          id="rent"
          type="text"
          placeholder="기본 월 임대료 입력"
          pattern="[0-9]*"
          inputMode="numeric"
          className="text-right border-red-500"
          onChange={handleDefaultRent}
          value={enteredInput.defaultRent}
        />
      </div>
      <div className="mb-6">
        <div className="mb-2">
          <Label htmlFor="downPayment" className="mr-2">
            계약금
          </Label>

          <TipAlertDialog
            title="계약금이란?"
            body="SH의 계약금은 보통 20% 이며, 계약금을 설정하시면 자동으로 금액이 입력됩니다. 단위는 %입니다. 예) 20 = 20%"
          />
          <p className="my-2 text-xs text-green-600 dark:text-yellow-300">
            *계약금 비율을 입력하면 자동 입력됩니다.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <Input
              ref={downPaymentInput}
              id="downPayment"
              type="text"
              placeholder="계약금"
              pattern="[0-9]*"
              inputMode="numeric"
              className="flex-1 w-20 text-right border-red-500"
              maxLength={3}
              onChange={handleDownPayment}
              value={enteredInput.downPayment}
            />
            <span>%</span>
          </div>
          <Input
            readOnly
            className="text-right bg-gray-200 dark:bg-gray-900"
            placeholder="계약 금액"
            value={calcValues.calcDownPayment}
          />
        </div>
      </div>
      <div className="mb-6">
        <div className="mb-2 ">
          <Label htmlFor="balance" className="mr-2">
            잔금
          </Label>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <Input
              id="balance"
              type="text"
              placeholder="잔금"
              className="flex-1 w-20 text-right bg-gray-200 dark:bg-gray-900"
              readOnly
              value={enteredInput.balance}
            />
            <span>%</span>
          </div>
          <Input
            readOnly
            className="text-right bg-gray-200 dark:bg-gray-900"
            placeholder="잔금"
            value={calcValues.calcBalance}
          />
        </div>
      </div>
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
          <Button className="px-4" onClick={toggleDepositChangeHandler}>
            {isDepositChange ? '월세로 변경' : '전세로 변경'}
          </Button>
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
          <div className="mb-2 text-right mt-2 text-sm ">
            현재 기본 보증금:{' '}
            <span className="text-green-500 dark:text-yellow-300">
              {enteredInput.defaultDeposit || 0}
            </span>{' '}
            원
          </div>
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
          <div className="flex items-center gap-4 mt-2">
            <Label htmlFor="desiredDeposit" className="text-xl break-keep">
              희망 보증금
            </Label>
            <Input
              id="desiredDeposit"
              type="text"
              placeholder="희망 보증금 입력"
              className="text-right border-red-500 flex-1"
              onChange={handleDesiredDeposit}
              value={enteredInput.desiredDeposit}
            />
          </div>
          <p className="text-xs text-right mt-2">
            *보통 100만원 단위 전환 가능
          </p>
        </div>

        <div className="max-w-80 mx-auto pb-12">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">예상 월 임대료:</h3>
            <p className="flex items-center">
              <strong className="mr-1 text-2xl font-semibold text-red-500 break-all">
                {calcValues.calcDesiredDeposit || 0}
              </strong>
              원
            </p>
          </div>
          <p className="text-xs text-right mt-2">
            * 참고용이며, 소수점 절삭 및 실제 금액과 다소 다를 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}

'use client';
import { useDepositChange } from '@/lib/store';
import { parseInputNumber, removeCommaAndConvert } from '@/lib/utils';
import defaultImage from '@/public/default-deposit.png';
import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { TipAlertDialog } from './TipAlertDialog';
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

  // 기본 보증금 계산
  const handleDefaultDeposit = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      const defaultDeposit = parseInputNumber(target.value); // 입력값을 숫자로 변환
      setEnteredInput({
        ...enteredInput,
        defaultDeposit: defaultDeposit.toLocaleString(),
        maxConversionRate: '', // 최대 상호전환 비율 초기화
        conversionRate: '', // 상호전환 비율 초기화
        desiredDeposit: '', // 희망 보증금 초기화
      });

      if (
        enteredInput.downPayment &&
        enteredInput.balance &&
        calcValues.calcDownPayment &&
        calcValues.calcBalance
      ) {
        const updatedCalcDownPayment =
          defaultDeposit * (+enteredInput.downPayment / LIMIT_PERCENT);

        const updatedCalcBalance =
          defaultDeposit * (+enteredInput.balance / LIMIT_PERCENT);

        setCalcValues({
          ...calcValues,
          calcDownPayment: updatedCalcDownPayment.toLocaleString(),
          calcBalance: updatedCalcBalance.toLocaleString(),
          calcDesiredDeposit: '', // 예상 월 임대료 초기화
        });
      }
    },
    [enteredInput, calcValues]
  );

  // 기본 월 임대료 계산
  const handleDefaultRent = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const defaultRent = parseInputNumber(target.value); // 입력값을 숫자로 변환
    setEnteredInput({
      ...enteredInput,
      defaultRent: defaultRent.toLocaleString(),
      maxConversionRate: '', // 최대 상호전환 비율 초기화
      conversionRate: '', // 상호전환 비율 초기화
      desiredDeposit: '', // 희망 보증금 초기화
    });

    setCalcValues({
      ...calcValues,
      calcDesiredDeposit: '', // 예상 월 임대료 초기화
    });
  };

  // 계약금 계산
  const handleDownPayment = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      const downPayment = parseInputNumber(target.value); // 현재 문자열 값

      // 기본 보증금이 입력되지 않았을 경우
      if (!enteredInput.defaultDeposit) {
        defaultInput.current?.focus();
        alert('기본 보증금을 입력해주세요.');
        return;
      }

      const downPaymentPercent = +downPayment / 100; // 계약금 비율
      const removeCommaDefaultDeposit = removeCommaAndConvert(
        enteredInput.defaultDeposit
      ); // 기본 보증금 콤마 제거

      // 계약금 비율이 100%를 초과할 경우
      if (+downPayment > LIMIT_PERCENT) {
        alert(`계약금 비율은 ${LIMIT_PERCENT}%를 초과할 수 없습니다.`);
        return;
      }

      setEnteredInput({
        ...enteredInput,
        balance: (LIMIT_PERCENT - +downPayment).toString(),
        downPayment: String(downPayment),
      });

      // 계약금 계산 및 잔금 계산
      // 계약금 = 기본 보증금 * 계약금 비율
      // 잔금 = 기본 보증금 * (1 - 계약금 비율)
      setCalcValues({
        ...calcValues,
        calcDownPayment: (
          removeCommaDefaultDeposit * downPaymentPercent
        ).toLocaleString(),
        calcBalance: (
          removeCommaDefaultDeposit *
          (1 - downPaymentPercent)
        ).toLocaleString(),
      });
    },

    [enteredInput, calcValues]
  );

  // 최대 상호전환 비율
  const handleMaxConversionRate = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      if (!enteredInput.defaultDeposit) {
        defaultInput.current?.focus();
        alert('기본 보증금을 입력해주세요.');
        return;
      } else if (!enteredInput.defaultRent) {
        defaultRentInput.current?.focus();
        alert('기본 월 임대료를 입력해주세요.');
        return;
      }

      const maxConversionRate = target.value; // 현재 문자열 값

      // 최대 상호전환 비율이 100%를 초과할 경우
      if (+maxConversionRate > LIMIT_PERCENT) {
        alert(`최대 상호전환 비율은 ${LIMIT_PERCENT}%를 초과할 수 없습니다.`);
        return;
      }

      setEnteredInput({
        ...enteredInput,
        maxConversionRate: String(maxConversionRate),
        desiredDeposit: '', // 희망 보증금 초기화
      });

      const maxConversionRatePercent = +maxConversionRate / LIMIT_PERCENT; // 최대 상호전환 비율
      const conversionRatePercent =
        +enteredInput.conversionRate / LIMIT_PERCENT; // 전환 이율 퍼센트
      const removeCommaDefaultDeposit = removeCommaAndConvert(
        enteredInput.defaultDeposit
      ); // 기본 보증금 콤마 제거
      const removeCommaDefaultRent = removeCommaAndConvert(
        enteredInput.defaultRent
      ); // 기본 월 임대료 콤마 제거

      if (!isDepositChange) {
        // 월 임대료 상향일 경우

        // 기본 보증금 * 최대 상호전환 비율 = 최소 보증금 계산
        const minimumDepositValue =
          removeCommaDefaultDeposit * maxConversionRatePercent;

        setCalcValues({
          ...calcValues,
          calcDesiredDeposit: '', // 예상 월 임대료 초기화
          calcDeposit: minimumDepositValue.toLocaleString(),
        });

        // 전환 이율 입력값이 있을 경우
        if (enteredInput.conversionRate) {
          // 최대 월 임대료 계산 = (기본 월 임대료 - ((최소 보증금 - 기본 보증금) * 전환 이율 퍼센트) / 12
          const maximumRentValue = Math.floor(
            removeCommaDefaultRent -
              ((minimumDepositValue - removeCommaDefaultDeposit) *
                conversionRatePercent) /
                12
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

        // 최소 월 임대료 계산 = 기본 월 임대료 * 최대전환 이율 퍼센트 / 100
        const minimumRentValue = Math.floor(
          (removeCommaDefaultRent * +maxConversionRate) / 100
        );

        setCalcValues({
          ...calcValues,
          calcDesiredDeposit: '', // 예상 월 임대료 초기화
          calcRent: minimumRentValue.toLocaleString(),
        });

        // 전환 이율 입력값이 있을 경우
        if (enteredInput.conversionRate) {
          // 최대 보증금 계산 = ((기본 월 임대료 - 최소 임대료) / 전환 이율 퍼센트) * 12 + 최소 보증금
          const maximumDepositValue =
            ((removeCommaDefaultRent - minimumRentValue) /
              conversionRatePercent) *
              12 +
            removeCommaDefaultDeposit;

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
      if (!enteredInput.defaultDeposit) {
        defaultInput.current?.focus();
        alert('기본 보증금을 입력해주세요.');
        return;
      } else if (!enteredInput.defaultRent) {
        defaultRentInput.current?.focus();
        alert('기본 월 임대료를 입력해주세요.');
        return;
      } else if (!enteredInput.maxConversionRate) {
        maxConversionRateInput.current?.focus();
        alert('최대 상호전환 비율을 입력해주세요.');
        return;
      }

      const conversionRate = target.value; // 현재 문자열 값

      // 전환 비율이 100%를 초과할 경우
      if (+conversionRate > LIMIT_PERCENT) {
        alert(`전환 이율은 ${LIMIT_PERCENT}%를 초과할 수 없습니다.`);
        return;
      }

      setEnteredInput({
        ...enteredInput,
        conversionRate: String(conversionRate),
        desiredDeposit: '', // 희망 보증금 초기화
      });

      const conversionRatePercent = +conversionRate / LIMIT_PERCENT; // 전환 이율 퍼센트
      const maxConversionRatePercent =
        +enteredInput.maxConversionRate / LIMIT_PERCENT; // 최대 상호전환 비율
      const removeCommaDefaultDeposit = removeCommaAndConvert(
        enteredInput.defaultDeposit
      ); // 기본 보증금 콤마 제거
      const removeCommaDefaultRent = removeCommaAndConvert(
        enteredInput.defaultRent
      ); // 기본 월 임대료 콤마 제거
      const removeCommaCalcDeposit = removeCommaAndConvert(
        calcValues.calcDeposit
      );

      if (!isDepositChange) {
        // 최소 보증금, 월 임대료 상향일 경우

        // 최소 임대료
        const maximumRentValue =
          removeCommaDefaultRent -
          ((removeCommaCalcDeposit - removeCommaDefaultDeposit) *
            conversionRatePercent) /
            12;

        setCalcValues({
          ...calcValues,
          calcDesiredDeposit: '', // 예상 월 임대료 초기화
          calcRent: maximumRentValue.toLocaleString(),
        });
      } else {
        // 최대 보증금, 월 임대료 하향일 경우

        // 최소 월 임대료
        const minimumRentValue = Math.floor(
          removeCommaDefaultRent * maxConversionRatePercent
        );

        setCalcValues({
          ...calcValues,
          calcDesiredDeposit: '', // 예상 월 임대료 초기화
          calcRent: minimumRentValue.toLocaleString(),
        });

        // 최대 보증금 계산 = ((기본 월 임대료 - 최소 임대료) / 전환 이율 퍼센트) * 12 + 최소 보증금
        const maximumDepositValue =
          ((removeCommaDefaultRent - minimumRentValue) /
            conversionRatePercent) *
            12 +
          removeCommaDefaultDeposit;

        console.log(maximumDepositValue);

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

      const desiredDeposit = parseInputNumber(target.value); // 입력값을 숫자로 변환

      setEnteredInput({
        ...enteredInput,
        desiredDeposit: desiredDeposit.toLocaleString(),
      });

      const conversionRatePercent =
        +enteredInput.conversionRate / LIMIT_PERCENT; // 전환 이율 퍼센트
      const removeCommaDefaultDeposit = removeCommaAndConvert(
        enteredInput.defaultDeposit
      ); // 기본 보증금 콤마 제거
      const removeCommaDefaultRent = removeCommaAndConvert(
        enteredInput.defaultRent
      ); // 기본 월 임대료 콤마 제거

      if (desiredDeposit === 0) {
        setCalcValues({
          ...calcValues,
          calcDesiredDeposit: '0',
        });
        return;
      }

      if (!isDepositChange) {
        // 희망 보증금이 기본 보증금보다 높을 경우
        if (desiredDeposit > removeCommaDefaultDeposit) {
          setError(true);
          setCalcValues({
            ...calcValues,
            calcDesiredDeposit: '0',
          });
          return;
        } else setError(false);
      } else {
        // 희망 보증금이 기본 보증금보다 낮을 경우
        if (desiredDeposit < removeCommaDefaultDeposit) {
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
        ((desiredDeposit - removeCommaDefaultDeposit) * conversionRatePercent) /
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
          pattern="\d*"
          inputMode="numeric"
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

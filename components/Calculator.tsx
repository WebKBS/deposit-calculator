'use client';
import { depositChange } from '@/lib/store';
import { parseInputValue, removeComma } from '@/lib/utils';
import defaultImage from '@/public/default-deposit.png';
import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { TipAlertDialog } from './TipAlertDialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export default function Calculator() {
  const input = useRef<HTMLInputElement>(null);
  const { isDepositChange, toggleDepositChange } = depositChange();
  const [defaultDeposit, setDefaultDeposit] = useState<string | null>(); // 기본 보증금
  const [defaultRent, setDefaultRent] = useState<string | null>(); // 기본 월 임대료
  const [downPayment, setDownPayment] = useState<string | null>(); // 계약금
  const [calcDownPayment, setCalcDownPayment] = useState<string | null>(); // 계산된 계약금
  const [balance, setBalance] = useState<string | null>(); // 잔금
  const [calcBalance, setCalcBalance] = useState<string | null>(); // 계산된 잔금
  const [maxConversion, setMaxConversion] = useState<string>('0'); // 최대 전환금
  const [conversion, setConversion] = useState<string | null>(); // 전환 이율
  const [minimumDeposit, setMinimumDeposit] = useState<string | null>(); // 최소 보증금
  const [maximumRent, setMaximumRent] = useState<string>('0'); // 최대 임대료
  const [desiredDeposit, setDesiredDeposit] = useState<string | null>(); // 희망 보증금
  const [desiredDepositResult, setDesiredDepositResult] = useState<string>('0'); // 희망 보증금 결과
  const [error, setError] = useState(false); // 에러 메시지

  const LIMIT_NUMBER = 100;

  const resetValue = useCallback(() => {
    if (conversion || minimumDeposit) {
      setConversion(null);
      setMinimumDeposit(null);
      setMaxConversion('0');
      setMaximumRent('0');
      setDesiredDeposit(null);
      setDesiredDepositResult('0');
      setError(false);
    }
  }, [conversion, minimumDeposit]);

  // 기본 보증금
  const defaultHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const inputNumber = parseInputValue(event.target.value);
      setDefaultDeposit(inputNumber.toLocaleString());

      if (calcDownPayment && calcBalance && downPayment && balance) {
        setCalcDownPayment(() => {
          // 계약금
          const resultRent =
            inputNumber * +(+downPayment / LIMIT_NUMBER).toFixed(2);
          return resultRent.toLocaleString();
        });

        setCalcBalance(() => {
          // 잔금
          const resultRent =
            inputNumber * +(+balance / LIMIT_NUMBER).toFixed(2);
          return resultRent.toLocaleString();
        });
      }

      resetValue();
    },
    [calcDownPayment, calcBalance, downPayment, balance, resetValue]
  );

  // 기본 월 임대료
  const defaultRentHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      resetValue();

      const inputNumber = parseInputValue(event.target.value);
      setDefaultRent(inputNumber.toLocaleString());
    },
    [resetValue]
  );

  // 계약금
  const downPaymentHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!defaultDeposit) {
        input.current?.focus();
        alert('기본 보증금을 입력해주세요.');
        return;
      }
      resetValue();

      const inputNumber = event.target.value;
      const percentNumber = +inputNumber / LIMIT_NUMBER; // 계약금 퍼센트
      const removeCommaDefault = +removeComma(defaultDeposit!); // 기본 보증금 콤마 제거

      if (+inputNumber > LIMIT_NUMBER)
        return alert(`계약금은 ${LIMIT_NUMBER}%를 초과할 수 없습니다.`);

      setDownPayment(inputNumber);

      // 잔금 퍼센트
      setBalance((LIMIT_NUMBER - +inputNumber!).toString());

      // 총 계약금
      setCalcDownPayment(
        (removeCommaDefault! * +percentNumber).toLocaleString()
      );

      // 총 잔금
      setCalcBalance(
        (removeCommaDefault! * (1 - +percentNumber)).toLocaleString()
      );
    },
    [defaultDeposit, resetValue]
  );

  // //최대 전환금
  const maxConversionHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!defaultDeposit) {
        input.current?.focus();
        alert('기본 보증금을 입력해주세요.');
        return;
      }

      const inputNumber = event.target.value;
      if (+inputNumber > LIMIT_NUMBER)
        return alert(`전환금은 ${LIMIT_NUMBER}%를 초과할 수 없습니다.`);

      if (desiredDeposit && desiredDepositResult) {
        setDesiredDeposit(null);
        setDesiredDepositResult('0');
        setError(false);
      }

      setMinimumDeposit(inputNumber);

      if (!conversion) return console.log('conversion is null'); // 전환 이율이 없으면 종료

      const percentNumber = +conversion / LIMIT_NUMBER; // 전환 이율 퍼센트
      const removeCommaDefault = +removeComma(defaultDeposit!); // 기본 보증금 콤마 제거
      const removeCommaRent = +removeComma(defaultRent!); // 기본 월 임대료 콤마 제거

      if (!isDepositChange) {
        const conversionValue =
          (+removeCommaDefault * +inputNumber) / LIMIT_NUMBER; // 최소 보증금

        setMaxConversion(conversionValue.toLocaleString());

        const resultRent = Math.floor(
          removeCommaRent -
            ((conversionValue - removeCommaDefault) * percentNumber) / 12
        );

        setMaximumRent(resultRent.toLocaleString());
      } else {
        if (!percentNumber) return;

        const resultRent = Math.floor((removeCommaRent * +inputNumber) / 100);

        setMaximumRent(resultRent.toLocaleString());
        const conversionValue =
          ((removeCommaRent - resultRent) / percentNumber) * 12 +
          removeCommaDefault;

        setMaxConversion(conversionValue.toLocaleString());
      }
    },
    [
      conversion,
      isDepositChange,
      defaultDeposit,
      defaultRent,
      desiredDeposit,
      desiredDepositResult,
    ]
  );

  // // 전환 이율
  const conversionHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!defaultDeposit) {
        input.current?.focus();
        alert('기본 보증금을 입력해주세요.');
        return;
      } else if (!minimumDeposit) {
        alert('최대 전환금을 입력해주세요.');
        return;
      }
      if (desiredDeposit && desiredDepositResult) {
        setDesiredDeposit(null);
        setDesiredDepositResult('0');
        setError(false);
      }

      const inputNumber = event.target.value;
      if (+inputNumber > LIMIT_NUMBER)
        return alert(`전환 이율은 ${LIMIT_NUMBER}%를 초과할 수 없습니다.`);

      setConversion(inputNumber);

      const percentNumber = +inputNumber / LIMIT_NUMBER; // 전환 이율 퍼센트
      const removeCommaDefault = +removeComma(defaultDeposit!); // 기본 보증금 콤마 제거
      const removeCommaRent = +removeComma(defaultRent!); // 기본 월 임대료 콤마 제거

      if (!isDepositChange) {
        const conversionValue =
          (+removeCommaDefault * +minimumDeposit!) / LIMIT_NUMBER; // 최대 보증금

        setMaxConversion(conversionValue.toLocaleString());

        const resultRent = Math.floor(
          removeCommaRent -
            ((conversionValue - removeCommaDefault) * percentNumber) / 12 // 최대 임대료
        );

        setMaximumRent(resultRent.toLocaleString());
      } else {
        if (!percentNumber) return;
        const resultRent = Math.floor(
          (removeCommaRent * +minimumDeposit!) / 100
        ); // 최소 임대료

        setMaximumRent(resultRent.toLocaleString());
        const conversionValue =
          ((removeCommaRent - resultRent) / percentNumber) * 12 +
          removeCommaDefault;

        setMaxConversion(conversionValue.toLocaleString());
      }
    },
    [
      defaultDeposit,
      minimumDeposit,
      defaultRent,
      isDepositChange,
      desiredDeposit,
      desiredDepositResult,
    ]
  );

  // 희망 보증금 계산
  const desiredDepositHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (
        !defaultDeposit ||
        !defaultRent ||
        !downPayment ||
        !conversion ||
        !minimumDeposit
      ) {
        alert('모든 필드를 입력해주세요.');
        return;
      }

      const inputNumber = parseInputValue(event.target.value);
      const percentConversion = +conversion! / LIMIT_NUMBER; // 전환 이율 퍼센트
      const removeCommaDefault = +removeComma(defaultDeposit!); // 기본 보증금 콤마 제거
      const removeCommaRent = +removeComma(defaultRent!); // 기본 월 임대료 콤마 제거

      setDesiredDeposit(inputNumber.toLocaleString());

      if (!isDepositChange) {
        if (inputNumber > removeCommaDefault) {
          setError(true);
          return;
        } else setError(false);
      } else {
        if (inputNumber < removeCommaDefault) {
          setError(true);
          return;
        } else setError(false);
      }

      const result =
        removeCommaRent -
        ((inputNumber - removeCommaDefault) * percentConversion) / 12;

      setDesiredDepositResult(result.toLocaleString());
    },
    [
      defaultDeposit,
      defaultRent,
      downPayment,
      conversion,
      isDepositChange,
      minimumDeposit,
    ]
  );

  const changeHandler = useCallback(() => {
    toggleDepositChange();

    resetValue();
  }, [toggleDepositChange, resetValue]);

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
          onChange={defaultHandler}
          value={defaultDeposit || ''}
          pattern="[0-9]*"
          inputMode="numeric"
          className="text-right border-red-500"
          ref={input}
        />
      </div>
      <div className="mb-6">
        <div className="mb-2">
          <Label htmlFor="rent" className="mr-2">
            기본 월 임대료
          </Label>
        </div>
        <Input
          id="rent"
          type="text"
          placeholder="기본 월 임대료 입력"
          onChange={defaultRentHandler}
          value={defaultRent || ''}
          pattern="[0-9]*"
          inputMode="numeric"
          className="text-right border-red-500"
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
              id="downPayment"
              type="text"
              placeholder="계약금"
              onChange={downPaymentHandler}
              value={downPayment || ''}
              pattern="[0-9]*"
              inputMode="numeric"
              className="flex-1 w-20 text-right border-red-500"
              maxLength={3}
            />
            <span>%</span>
          </div>
          <Input
            readOnly
            className="text-right bg-gray-200 dark:bg-gray-900"
            placeholder="계약 금액"
            value={calcDownPayment || ''}
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
              value={balance || ''}
              className="flex-1 w-20 text-right bg-gray-200 dark:bg-gray-900"
              readOnly
            />
            <span>%</span>
          </div>
          <Input
            readOnly
            className="text-right bg-gray-200 dark:bg-gray-900"
            placeholder="잔금"
            value={calcBalance || ''}
          />
        </div>
      </div>
      <div className="mb-6">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-3">
            <p className="flex items-center gap-1">
              <Label>보증금</Label>
              {!isDepositChange ? (
                <FaArrowDown className="text-blue-600" />
              ) : (
                <FaArrowUp className="text-red-600" />
              )}
            </p>
            <p className="flex items-center gap-1">
              월세
              {!isDepositChange ? (
                <FaArrowUp className="text-red-600" />
              ) : (
                <FaArrowDown className="text-blue-600" />
              )}
            </p>
            <TipAlertDialog
              title="보증금, 임대료(월세) 상호전환"
              body="SH 모집공고를 보시면 상호전환에 대한 내용이 적혀있습니다. 공고물 또는 제공하는 건물에 대해 모두 상호전환 비율이 다를 수 있으며, 입력하시는 비율에 따라 보증금과 임대료는 자동으로 입력됩니다. 전월세 변경으로 보증금 상향, 임대로 하향, 등 전환 계산 가능하며, 기본 보증금, 기본 월 임대료, 계약금 변경시 상호전환의 내용은 초기화 됩니다. 단위는 %이며 소수점까지 가능합니다. 예) 50.5 = 50.5%"
            />
          </div>
          <Button className="px-4" onClick={changeHandler}>
            전월세 변경
          </Button>
        </div>
        <div className="flex items-center gap-2 mb-2 text-sm">
          {!isDepositChange ? '보증금의' : '임대료의'}
          <Input
            type="text"
            placeholder="%"
            maxLength={6}
            className="w-16 h-8 text-right border-red-500"
            onChange={maxConversionHandler}
            value={minimumDeposit || ''}
          />
          % 까지 전환
        </div>
        <div className="flex items-center gap-2 mb-2 text-sm">
          전환 이율
          <Input
            type="text"
            placeholder="%"
            maxLength={6}
            className="w-16 h-8 text-right border-red-500"
            onChange={conversionHandler}
            value={conversion || ''}
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
                  {maxConversion}
                </span>
                원
              </p>
            ) : (
              <p>
                <span className="mr-1 text-xl font-semibold text-red-500 break-all">
                  {maxConversion}
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
                  {maximumRent}
                </span>
                원
              </p>
            ) : (
              <p>
                <span className="mr-1 text-xl font-semibold text-blue-500 break-all">
                  {maximumRent}
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
              {defaultDeposit || 0}
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
              onChange={desiredDepositHandler}
              value={desiredDeposit || ''}
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
                {desiredDepositResult}
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

'use client';
import { parseInputValue, removeComma } from '@/lib/utils';
import { ChangeEvent, useState } from 'react';
import { TipAlertDialog } from './TipAlertDialog';
import { Input } from './ui/input';
import { Label } from './ui/label';

export default function Calculator() {
  const [defaultDeposit, setDefaultDeposit] = useState<string | null>(); // 기본 보증금
  const [defaultRent, setDefaultRent] = useState<string | null>(); // 기본 월 임대료
  const [downPayment, setDownPayment] = useState<string | null>(); // 계약금
  const [calcDownPayment, setCalcDownPayment] = useState<string | null>(); // 계산된 계약금
  const [balance, setBalance] = useState<string | null>(); // 잔금
  const [calcBalance, setCalcBalance] = useState<string | null>(); // 계산된 잔금

  // 기본 보증금
  const defaultHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const inputNumber = parseInputValue(event.target.value);
    setDefaultDeposit(inputNumber.toLocaleString());
    setDownPayment('');
    setCalcDownPayment('');
    // console.log(inputNumber);
  };

  const defaultRentHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const inputNumber = parseInputValue(event.target.value);
    setDefaultRent(inputNumber.toLocaleString());
  };

  // 계약금
  const downPaymentHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!defaultDeposit) return alert('기본 보증금을 입력해주세요.');

    const inputNumber = event.target.value;
    const percentNumber = +inputNumber / 100; // 계약금 퍼센트
    const removeCommaDefault = +removeComma(defaultDeposit!); // 기본 보증금 콤마 제거

    if (+inputNumber > 100) return alert('계약금은 100%를 초과할 수 없습니다.');
    setDownPayment(inputNumber);

    // 잔금 퍼센트
    setBalance((100 - +inputNumber!).toString());

    // 총 계약금
    setCalcDownPayment((removeCommaDefault! * +percentNumber).toLocaleString());

    // 총 잔금
    setCalcBalance(
      (removeCommaDefault! * (1 - +percentNumber)).toLocaleString()
    );
  };

  return (
    <div>
      <div className="mb-4">
        <div className="mb-2">
          <Label htmlFor="defaultDeposit" className="mr-2">
            기본 보증금
          </Label>
          <TipAlertDialog title="기본 보증금이란?" body="" />
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
        />
      </div>
      <div className="mb-4">
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
      <div className="mb-4">
        <div className="mb-2">
          <Label htmlFor="downPayment" className="mr-2">
            계약금
          </Label>

          <TipAlertDialog title="계약금이란?" body="" />
          <p className="my-2 text-xs text-green-600 dark:text-yellow-300">
            *계약금을 입력하면 자동 입력됩니다.
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
      <div className="mb-4">
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
      <div>
        <Input type="number" placeholder="Enter a number" />
      </div>
      <div>
        <Input type="number" placeholder="Enter a number" />
      </div>
    </div>
  );
}

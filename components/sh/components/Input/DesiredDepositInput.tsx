'use client';
import { Input } from '@/components/ui/input';
import { removeCommaAndConvert } from '@/utils/numberUtils';
import { desiredDepositAmount } from '@/utils/sh/calculator';
import { useDepositChangeStore } from '../../store/depositChangeStore';
import useEnteredErrorStore from '../../store/enteredErrorStore';
import useShCalcResultStore from '../../store/shCalcResultStore';
import useShStore from '../../store/shStore';

const DesiredDepositInput = () => {
  const desiredDeposit = useShStore((state) => state.desiredDeposit);
  const setDesiredDeposit = useShStore((state) => state.setDesiredDeposit);
  const setCalcFinalRent = useShCalcResultStore(
    (state) => state.setCalcFinalRent
  );

  // ref 상태
  const setRefState = useShStore((state) => state.setRefState);

  const handleDesiredDeposit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const defaultDeposit = useShStore.getState().defaultDeposit;
    const defaultRent = useShStore.getState().defaultRent;
    const maxConversionRate = useShStore.getState().maxConversionRate;
    const conversionRate = useShStore.getState().conversionRate;

    if (!defaultDeposit) {
      alert('기본 보증금을 입력해주세요.');
      setRefState(true);
      return;
    } else if (!defaultRent) {
      alert('기본 월 임대료를 입력해주세요.');
      setRefState(true);
      return;
    } else if (!maxConversionRate) {
      alert('최대 전환율을 입력해주세요.');
      setRefState(true);
      return;
    } else if (!conversionRate) {
      alert('전환율을 입력해주세요.');
      setRefState(true);
      return;
    }

    setDesiredDeposit(event);

    const isDepositChange = useDepositChangeStore.getState().isDepositChange;

    const removeCommaDefaultDeposit = removeCommaAndConvert(defaultDeposit);
    const removeCommaDefaultRent = removeCommaAndConvert(defaultRent);
    const removeCommaDesiredDeposit = removeCommaAndConvert(event.target.value);

    const calcDeposit = useShCalcResultStore.getState().calcDeposit;
    const removeCommaCalcDeposit = removeCommaAndConvert(calcDeposit);

    if (removeCommaDesiredDeposit === 0) {
      setCalcFinalRent('0');
      return;
    }

    if (!isDepositChange) {
      // 최소 보증금, 월 임대료 상향일 경우

      if (removeCommaDesiredDeposit < removeCommaCalcDeposit) {
        // 희망 보증금이 최소 보증금 보다 낮을 경우
        useEnteredErrorStore.setState({ enteredError: true });
        setCalcFinalRent('0');
        return;
      } else {
        useEnteredErrorStore.setState({ enteredError: false });
      }
    } else {
      // 최소 보증금, 월 임대료 하향일 경우

      if (removeCommaDesiredDeposit > removeCommaCalcDeposit) {
        // 희망 보증금이 최대 보증금 보다 높을 경우
        useEnteredErrorStore.setState({ enteredError: true });
        setCalcFinalRent('0');
        return;
      } else {
        useEnteredErrorStore.setState({ enteredError: false });
      }
    }

    const calcFinalRent = desiredDepositAmount(
      removeCommaDefaultRent,
      removeCommaDefaultDeposit,
      +conversionRate,
      removeCommaDesiredDeposit
    );

    setCalcFinalRent(calcFinalRent.toLocaleString());
  };

  return (
    <Input
      id="desiredDeposit"
      type="text"
      pattern="[0-9]*"
      inputMode="numeric"
      placeholder="희망 보증금 입력"
      className="text-right border-red-500 flex-1"
      onChange={handleDesiredDeposit}
      value={desiredDeposit}
    />
  );
};

export default DesiredDepositInput;

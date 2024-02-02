import { TipAlertDialog } from '@/components/Modal/TipAlertDialog';

import DepositChangeButton from '../Button/DepositChangeButton';
import TitleState from '../ChangeState/TitleState';
import ConversionCard from './ConversionCard';

const ChangeStateCard = () => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-3">
          <div className="flex flex-wrap items-center gap-2 justify-center">
            <TitleState />
          </div>
          <TipAlertDialog
            title="보증금, 월 임대료 상호전환"
            body="SH 모집공고를 보시면 상호전환에 대한 내용이 적혀있습니다. 공고물 또는 제공하는 건물에 대해 모두 상호전환 비율이 다를 수 있으며, 입력하시는 비율에 따라 보증금과 임대료는 자동으로 입력됩니다. 보증금 및 월 임대료 변경으로 보증금 상향, 임대로 하향, 등 전환 계산 가능하며, 기본 보증금, 기본 월 임대료, 계약금 변경시 상호전환의 내용은 초기화 됩니다. 단위는 %이며 소수점까지 가능합니다. 예) 50.5 = 50.5%"
          />
        </div>
        <DepositChangeButton />
      </div>
      <ConversionCard />
    </div>
  );
};

export default ChangeStateCard;

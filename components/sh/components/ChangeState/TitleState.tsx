import { Label } from '@/components/ui/label';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { useDepositChangeStore } from '../../store/depositChangeStore';

const TitleState = () => {
  const isDepositChange = useDepositChangeStore(
    (state) => state.isDepositChange
  );

  return (
    <div>
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
    </div>
  );
};

export default TitleState;

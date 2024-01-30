import DefaultDepositInput from '../DefaultDepositInput';
import DefaultRentInput from '../DefaultRentInput';

export default function DefaultAmountCard() {
  console.log('DefaultAmountCard 렌더링');
  return (
    <div>
      <DefaultDepositInput />
      <DefaultRentInput />
    </div>
  );
}

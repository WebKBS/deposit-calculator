import CalcResultCard from './sh/components/Card/CalcResultCard';
import DefaultCurrentCard from './sh/components/Card/DefaultCurrentCard';
import DesiredDepositCard from './sh/components/Card/DesiredDepositCard';
import FinalResultCard from './sh/components/Card/FinalResultCard';
import Balance from './sh/components/View/Balance';
import DefaultDeposit from './sh/components/View/DefaultDeposit';
import DefaultRent from './sh/components/View/DefaultRent';
import DepositRentChange from './sh/components/View/DepositRentChange';
import DownPayment from './sh/components/View/DownPayment';

export default function Calculator() {
  return (
    <div>
      <DefaultDeposit />
      <DefaultRent />
      <DownPayment />
      <Balance />
      <DepositRentChange />
      <CalcResultCard />
      <DefaultCurrentCard />
      <DesiredDepositCard />
      <FinalResultCard />
    </div>
  );
}

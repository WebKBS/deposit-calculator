import { Input } from '@/components/ui/input';

const BalanceInput = ({ value }: { value: string }) => {
  return (
    <div className="flex items-center gap-1">
      <Input
        id="balance"
        type="text"
        placeholder="잔금"
        className="flex-1 w-20 text-right bg-gray-200 dark:bg-gray-900"
        readOnly
        value={value}
      />
      <span>%</span>
    </div>
  );
};

export default BalanceInput;

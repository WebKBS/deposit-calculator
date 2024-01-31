import { Input } from '@/components/ui/input';

interface DownPaymentInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const DownPaymentInput = ({ onChange, value }: DownPaymentInputProps) => {
  return (
    <>
      <div className="flex items-center gap-1">
        <Input
          // ref={downPaymentInput}
          id="downPayment"
          type="text"
          placeholder="계약금"
          pattern="[0-9]*"
          inputMode="numeric"
          className="flex-1 w-20 text-right border-red-500"
          maxLength={3}
          onChange={onChange}
          value={value}
        />
        <span>%</span>
      </div>
    </>
  );
};
export default DownPaymentInput;

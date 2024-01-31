import { TipAlertDialog } from '@/components/Modal/TipAlertDialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { StaticImageData } from 'next/image';
import React from 'react';

interface DefaultInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  isDialog: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  dialogImage?: StaticImageData;
  dialogTitle?: string;
  dialogBody?: string;
}

const DefaultInput = React.forwardRef<HTMLInputElement, DefaultInputProps>(
  function DefaultInput(
    {
      label,
      id,
      isDialog,
      dialogImage,
      onChange,
      value,
      dialogTitle,
      dialogBody,
      ...inputProps
    },
    ref
  ) {
    return (
      <div className="mb-6">
        <div className="mb-2">
          <Label htmlFor={id} className="mr-2">
            {label}
          </Label>
          {isDialog && (
            <TipAlertDialog
              title={dialogTitle || ''}
              body={dialogBody || ''}
              image={dialogImage}
            />
          )}
        </div>
        <Input
          id={id}
          className="text-right border-red-500"
          onChange={onChange}
          value={value}
          ref={ref}
          {...inputProps}
        />
      </div>
    );
  }
);

export default DefaultInput;

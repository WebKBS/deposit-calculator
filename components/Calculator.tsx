'use client';
import { ChangeEvent, useState } from 'react';
import { TipAlertDialog } from './TipAlertDialog';
import { Input } from './ui/input';
import { Label } from './ui/label';

export default function Calculator() {
  const [defaultValue, setDefault] = useState<number | null>();
  const defaultHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setDefault(Number(event.target.value));
    console.log(defaultValue);
  };
  return (
    <div>
      <div className="mb-4">
        <div className="mb-2">
          <Label htmlFor="defaultValue" className="mr-2">
            기본 보증금
          </Label>
          <TipAlertDialog title="기본 보증금이란?" body="" />
        </div>
        <Input
          id="defaultValue"
          type="number"
          placeholder="Enter a number"
          onChange={defaultHandler}
          value={defaultValue || ''}
        />
      </div>
      <div>
        <Input type="number" placeholder="Enter a number" />
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

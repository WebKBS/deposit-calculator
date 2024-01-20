'use client';
import { useMenu } from '@/lib/store';
import { IoMenu } from 'react-icons/io5';
import { Button } from '../ui/button';

export default function Menu() {
  const toggle = useMenu((state) => state.toggle);
  const isOpen = useMenu((state) => state.isOpen);
  console.log(isOpen);

  return (
    <>
      <Button size="icon" variant="outline" onClick={toggle}>
        <IoMenu size={24} />
      </Button>
    </>
  );
}

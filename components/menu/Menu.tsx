'use client';
import { useMenu } from '@/lib/store';
import { IoMdClose } from 'react-icons/io';
import { IoMenu } from 'react-icons/io5';
import { Button } from '../ui/button';

export default function Menu() {
  const toggle = useMenu((state) => state.toggle);
  const isOpen = useMenu((state) => state.isOpen);

  return (
    <>
      <Button size="icon" variant="outline" onClick={toggle}>
        {isOpen ? <IoMdClose size={24} /> : <IoMenu size={24} />}
      </Button>
    </>
  );
}

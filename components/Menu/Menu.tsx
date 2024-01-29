'use client';
import { useMenu } from '@/store/store';
import { IoMdClose } from 'react-icons/io';
import { IoMenu } from 'react-icons/io5';
import { Button } from '../ui/button';
import MenuList from './MenuList';

export default function Menu() {
  const toggle = useMenu((state) => state.toggle);
  const isOpen = useMenu((state) => state.isOpen);

  return (
    <>
      <Button
        size="icon"
        variant="outline"
        onClick={toggle}
        aria-label="메뉴 열기"
        title="메뉴 열기"
      >
        {isOpen ? <IoMdClose size={24} /> : <IoMenu size={24} />}
      </Button>
      {isOpen && (
        <div className="bg-white dark:bg-gray-900 absolute border rounded-md w-full max-w-64 z-10 right-5 top-[72px] animate-[open_0.3s_forwards]">
          <MenuList />
        </div>
      )}
    </>
  );
}

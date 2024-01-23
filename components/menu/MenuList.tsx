import { useMenu } from '@/lib/store';
import Link from 'next/link';

const menuList = [
  {
    name: 'SH 보증금 임대료 계산기',
    href: '/',
  },
  {
    name: '문의하기',
    href: '/contact',
  },
];

export default function MenuList() {
  const toggle = useMenu((state) => state.toggle);

  return (
    <aside className="p-4">
      <nav>
        <ul className="flex flex-col gap-2">
          {menuList.map((menu, index) => (
            <li key={index}>
              <Link
                href={menu.href}
                className="text-sm block p-2 dark:hover:bg-gray-800 rounded-md hover:bg-gray-200"
                onClick={toggle}
              >
                {menu.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

import { menuList } from '@/config/navigationData';
import { useMenu } from '@/store/store';
import Link from 'next/link';

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

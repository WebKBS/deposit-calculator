import Link from 'next/link';

const menuList = [
  {
    name: 'SH 보증금 임대료 계산기',
    href: '/',
  },
];

export default function MenuList() {
  return (
    <aside className="p-4">
      <nav>
        <ul className="flex flex-col gap-4">
          {menuList.map((menu, index) => (
            <li key={index}>
              <Link href={menu.href} className="text-sm">
                {menu.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

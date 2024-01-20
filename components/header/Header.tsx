import Link from 'next/link';
import Menu from '../menu/Menu';
import ThemeToggle from '../theme/ThemeToggle';
import LogoChange from './LogoChange';

export default function Header() {
  return (
    <header className="sticky top-0 p-4 z-50 max-w-5xl mx-auto w-full">
      <div className="flex justify-between items-center">
        <h1>
          <Link href="/">
            <LogoChange />
          </Link>
        </h1>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Menu />
        </div>
      </div>
    </header>
  );
}

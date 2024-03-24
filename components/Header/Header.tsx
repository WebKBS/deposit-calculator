import Link from 'next/link';
import Menu from '../Menu/Menu';
import ThemeToggle from '../Theme/ThemeToggle';
import LogoChange from './LogoChange';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full max-w-5xl px-5 py-4 mx-auto backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <Link href="/">
          <LogoChange />
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Menu />
        </div>
      </div>
    </header>
  );
}

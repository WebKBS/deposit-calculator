import Link from 'next/link';
import Menu from '../Menu/Menu';
import ThemeToggle from '../Theme/ThemeToggle';
import LogoChange from './LogoChange';
import ShareButton from './ShareButton';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full max-w-5xl px-5 py-4 mx-auto backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <h1>
          <Link href="/">
            <LogoChange />
          </Link>
        </h1>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ShareButton />
          <Menu />
        </div>
      </div>
    </header>
  );
}

import Menu from '../menu/Menu';
import ThemeToggle from '../theme/ThemeToggle';

export default function Header() {
  return (
    <header className="sticky top-0 p-4 z-50">
      <div className="flex justify-between items-center">
        <h1>보증금 전월세 전환 계산기</h1>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Menu />
        </div>
      </div>
    </header>
  );
}

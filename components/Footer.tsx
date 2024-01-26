import { HiOutlineMail } from 'react-icons/hi';

export default function Footer() {
  return (
    <footer className="p-4 mt-auto border-t">
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl w-full mx-auto mb-2">
        <div className="text-xs text-center">
          불편한점 또는 개선사항이 있으시면 이메일로 연락주세요.
        </div>
        <div className="text-xs text-center">
          <a
            href="mailto:kbs21c1987@gmail.com"
            className="flex items-center gap-1 justify-center"
          >
            <HiOutlineMail size={16} />
            dev21c2020@gmail.com
          </a>
        </div>
      </div>
      <div className="text-xs text-center">
        Copyright &copy; [Dev Kang]. All rights reserved.
      </div>
    </footer>
  );
}

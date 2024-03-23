import Image from 'next/image';

const InstallPage = () => {
  return (
    <main className="flex-1">
      <div className="max-w-screen-md px-6 py-12 m-auto">
        <h2 className="mb-2 text-2xl font-bold">앱 설치방법</h2>
        <p className="text-sm relative pl-3">
          <span className="absolute left-0 top-0">*</span>본 페이지는 홈페이지
          초기 접속시 하단의 앱 설치하기 버튼이 없을 때, 또는 사파리 브라우저 등
          지원하지 않는 브라우저를 사용시 앱을 설치하는 방법입니다.
        </p>
        <h3 className="mt-6 mb-4 text-xl font-bold">
          아이폰 사파리 브라우저 예시입니다.
        </h3>
        <Image
          src="/install.png"
          width={300}
          height={300}
          alt="아이폰 예시 이미지"
          className="mb-2 w-[300px] h-auto"
          priority
        />
        <p className="text-sm relative pl-3 mb-4">
          <span className="absolute left-0 top-0">*</span> 이미지 처럼 공유하기
          버튼을 클릭해주세요.
        </p>
        <Image
          src="/home.png"
          width={300}
          height={300}
          alt="아이폰 예시 이미지"
          className="mb-2 w-[300px] h-auto"
          priority
        />
        <p className="text-sm relative pl-3 mb-4">
          <span className="absolute left-0 top-0">*</span>홈 화면에 추가 버튼을
          클릭해주세요.
        </p>
        <p>
          앱이 홈 화면에 추가되었습니다. 이제 홈 화면에서 앱을 실행할 수
          있습니다.
        </p>
        <p>
          크롬 및 네이버, 삼성브라우저 등 다른 브라우저를 사용하시는 경우에도
          비슷한 방법으로 앱을 설치할 수 있습니다.
        </p>
      </div>
    </main>
  );
};

export default InstallPage;

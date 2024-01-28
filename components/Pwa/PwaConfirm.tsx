'use client';

import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

export default function PwaConfirm() {
  const [modal, setModal] = useState(false);
  const [prompt, setPrompt] = useState<any>(null);

  useEffect(() => {
    if (navigator.userAgent.match(/iPad|iPhone|iPod/i)) {
      // iOS device detected
      console.log('This is iOS.');
      if (!navigator.userAgent.match(/Chrome/i)) {
        // Safari browser on iOS detected
        console.log('크롬이 아닙니다.');
        // Your logic for Safari on iOS goes here
      }
    }

    const handlePrompt = (event: any) => {
      event.preventDefault();
      setPrompt(event);

      if (!window.matchMedia('(display-mode: standalone)').matches) {
        setModal(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handlePrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handlePrompt);
    };
  }, []);

  const handleInstall = () => {
    if (prompt) {
      prompt.prompt();
      prompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          setModal(false);
          console.log('사용자가 설치를 수락했습니다.');
        } else {
          console.log('사용자가 설치 프롬프트를 닫았습니다.');
        }

        setPrompt(null);
        setModal(false);
      });
    }
  };

  return (
    <>
      {modal && (
        <div className="fixed flex flex-col justify-center bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm h-40 rounded-t-xl border-2 backdrop-blur-xl p-6 animate-pwa-open">
          <h3 className="mb-6 text-center text-xl">
            간편하게 앱을 설치해 보세요!
          </h3>
          <div className="flex gap-6">
            <Button
              type="button"
              className="flex-1 border rounded-md p-2"
              onClick={handleInstall}
            >
              설치하기
            </Button>
            <Button
              variant="outline"
              type="button"
              className="flex-1 border rounded-md p-2"
              onClick={() => setModal(false)}
            >
              닫기
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

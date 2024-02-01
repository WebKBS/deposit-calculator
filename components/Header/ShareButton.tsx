'use client';
import { PiShareNetwork } from 'react-icons/pi';
import { Button } from '../ui/button';

const ShareButton = () => {
  const isShareSupported = 'share' in navigator;

  const handleClick = () => {
    if (isShareSupported) {
      navigator
        .share({
          title: 'SH 보증금 임대료 계산기',
          text: 'SH 보증금 임대료 상호전환 계산기입니다.',
          url: window.location.href,
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    }
  };

  return (
    isShareSupported && (
      <Button
        size="icon"
        type="button"
        variant="secondary"
        aria-label="공유하기"
        title="공유하기"
        onClick={handleClick}
      >
        <PiShareNetwork size={20} />
      </Button>
    )
  );
};

export default ShareButton;

import { useRef, useState, useCallback } from 'react';

interface SwipeState {
  translateX: number;
  isSwiping: boolean;
  direction: 'left' | 'right' | null;
}

export const useSwipe = (
  onSwipeLeft?: () => void,
  onSwipeRight?: () => void,
  threshold: number = 80
) => {
  const [state, setState] = useState<SwipeState>({
    translateX: 0,
    isSwiping: false,
    direction: null
  });

  const startX = useRef(0);
  const currentX = useRef(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    setState(prev => ({ ...prev, isSwiping: true }));
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    currentX.current = e.touches[0].clientX;
    const diff = currentX.current - startX.current;

    setState(prev => ({
      ...prev,
      translateX: Math.max(-150, Math.min(150, diff)),
      direction: diff > threshold ? 'right' : diff < -threshold ? 'left' : null
    }));
  }, [threshold]);

  const handleTouchEnd = useCallback(() => {
    const diff = currentX.current - startX.current;

    if (diff > threshold && onSwipeRight) {
      onSwipeRight();
    } else if (diff < -threshold && onSwipeLeft) {
      onSwipeLeft();
    }

    setState({
      translateX: 0,
      isSwiping: false,
      direction: null
    });
  }, [threshold, onSwipeLeft, onSwipeRight]);

  return {
    ...state,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd
    }
  };
};
import { useEffect } from 'react';

export function useOutsideClick(
  ref: React.RefObject<HTMLElement>,
  handler: () => void,
  enabled: boolean = true,
) {
  useEffect(() => {
    if (!enabled) return;
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, handler, enabled]);
}

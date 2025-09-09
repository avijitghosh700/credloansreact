import { useEffect } from 'react';

/**
 * A custom hook that handles clicks outside of a specified element
 * 
 * @param ref - React ref object that references the HTML element to monitor
 * @param handler - Callback function to execute when a click occurs outside the referenced element
 * @param enabled - Optional boolean flag to enable/disable the click detection (defaults to true)
 * 
 * @example
 * ```tsx
 * const elementRef = useRef(null);
 * useOutsideClick(elementRef, () => {
 *   // Handle outside click
 * });
 * ```
 * 
 * @remarks
 * This hook attaches a mousedown event listener to the document that checks if clicks occur
 * outside the referenced element. When detected, it calls the provided handler function.
 * The hook automatically cleans up the event listener when the component unmounts.
 */
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

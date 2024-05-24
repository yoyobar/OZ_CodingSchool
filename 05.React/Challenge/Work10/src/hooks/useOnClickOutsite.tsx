import { useEffect } from 'react';

export default function useOnClickOutside(ref: React.RefObject<HTMLElement>, handler: () => void) {
    useEffect(() => {
        const listener = (e: MouseEvent) => {
            if (!ref.current || ref.current.contains(e.target as Node)) return;

            handler();
        };

        document.addEventListener('mousedown', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
        };
    }, []);
}

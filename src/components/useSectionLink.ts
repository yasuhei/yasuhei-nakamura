import { useEffect, useRef, type MouseEvent } from 'react';
import { useLenis } from 'lenis/react';

export function useSectionLink() {
    const lenis = useLenis();
    const frame = useRef(0);

    useEffect(() => () => cancelAnimationFrame(frame.current), []);

    return (event: MouseEvent<HTMLAnchorElement>, id: string, beforeScroll?: () => void) => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const target = document.getElementById(id);
        if (!target) return;

        event.preventDefault();
        beforeScroll?.();
        cancelAnimationFrame(frame.current);
        frame.current = requestAnimationFrame(() => {
            target.tabIndex = -1;
            target.focus({ preventScroll: true });
            if (lenis) {
                lenis.scrollTo(target);
            } else {
                target.scrollIntoView();
            }
        });
    };
}

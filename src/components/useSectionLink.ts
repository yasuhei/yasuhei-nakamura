import type { MouseEvent } from 'react';
import { flushSync } from 'react-dom';
import { useLenis } from 'lenis/react';

export function useSectionLink() {
    const lenis = useLenis();
    return (event: MouseEvent<HTMLAnchorElement>, id: string, beforeScroll?: () => void) => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const target = document.getElementById(id);
        if (!target) return;

        event.preventDefault();
        // Close the mobile menu and release its scroll lock before Lenis measures the target.
        if (beforeScroll) flushSync(beforeScroll);
        target.tabIndex = -1;
        target.focus({ preventScroll: true });
        if (lenis) {
            lenis.scrollTo(target);
        } else {
            target.scrollIntoView();
        }
    };
}

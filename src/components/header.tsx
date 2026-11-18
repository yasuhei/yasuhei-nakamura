import { useState, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/navegadorContext";
import { idiomaBr, idiomaEn } from "../Utils/translate";
import { MenuIcon, XIcon } from "lucide-react";
import menuSound from "../assets/menu-select.mp3";
import { useSectionLink } from "./useSectionLink";

export function Header() {
    const [activeLink, setActiveLink] = useState('home');
    const [modalOpen, setModalOpen] = useState(false);
    const followSectionLink = useSectionLink();
    const menuAudioRef = useRef<HTMLAudioElement | null>(null);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const language = useLanguage();
    const languageArray = language === 'pt-BR' ? idiomaBr : idiomaEn;
    const sectionIds = useMemo(
        () => language === 'pt-BR'
            ? ['sobre', 'skills', 'projetos', 'experiência', 'contato']
            : ['about', 'skills', 'projects', 'experience', 'contact'],
        [language]
    );
    const navItems = languageArray.map((label, index) => ({
        label,
        id: sectionIds[index]
    }));

    useEffect(() => {
        return () => {
            menuAudioRef.current?.pause();
            menuAudioRef.current = null;
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', ...sectionIds];
            let current = 'home';
            let nearest = -Infinity;
            sections.forEach(section => {
                const element = document.getElementById(section);
                if (!element) return;
                const top = element.getBoundingClientRect().top;
                if (top <= 100 && top > nearest) {
                    nearest = top;
                    current = section;
                }
            });
            if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
                current = sectionIds[sectionIds.length - 1];
            }
            setActiveLink(current);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sectionIds]);

    useLayoutEffect(() => {
        if (!modalOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setModalOpen(false);
                menuButtonRef.current?.focus();
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handleEscape);
        };
    }, [modalOpen]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setModalOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const playMenuSound = () => {
        if (!menuAudioRef.current) {
            menuAudioRef.current = new Audio(menuSound);
            menuAudioRef.current.volume = 0.25;
        }

        const audio = menuAudioRef.current;
        audio.pause();
        audio.currentTime = 0;
        void audio.play().catch((error: unknown) => {
            // Autoplay may be blocked; rapid hovers can interrupt pending playback.
            if (!(error instanceof DOMException &&
                (error.name === 'NotAllowedError' || error.name === 'AbortError'))) {
                console.error('Não foi possível reproduzir o som de navegação.', error);
            }
        });
    };

    const openModal = (value: boolean) => {
        setModalOpen(value);
    };


    return (
        <header className="terminal-navigation fixed inset-x-0 top-0 w-full z-50 bg-slate-950/70 backdrop-blur-md shadow-lg shadow-black/30 transition-all duration-300 border-b border-white/10">
            <div className="terminal-navigation-inner">
                <div className="terminal-navigation-row">
                    <motion.a
                        href="#home"
                        whileHover={{ y: -1 }}
                        className="terminal-brand"
                        onClick={(event) => followSectionLink(event, 'home', () => setModalOpen(false))}
                    >
                        <span className="terminal-brand-mark" aria-hidden="true">YN</span>
                        <span className="terminal-brand-copy">
                            <span className="terminal-brand-name">Yasuhei Nakamura</span>
                            <span className="terminal-brand-path">portfolio://dev</span>
                        </span>
                    </motion.a>

                    <nav className="hidden lg:block" aria-label="Navegação principal">
                    <ul className="terminal-nav-list">
                        {navItems.map((item) => (
                            <li key={item.id}>
                                <motion.a
                                    href={`#${item.id}`}
                                    onClick={(event) => followSectionLink(event, item.id)}
                                    aria-current={activeLink.toLowerCase() === item.id.toLowerCase() ? 'location' : undefined}
                                    className={`terminal-nav-link ${
                                        activeLink.toLowerCase() === item.id.toLowerCase() ? 'is-active' : ''
                                    }`}
                                    whileHover={{ y: -1 }}
                                    onHoverStart={playMenuSound}
                                    onFocus={playMenuSound}
                                >
                                    {item.label}
                                </motion.a>
                            </li>
                        ))}
                    </ul>
                    </nav>

                    <div className="terminal-menu-toggle lg:hidden">
                        <button
                            ref={menuButtonRef}
                            type="button"
                            onClick={() => openModal(!modalOpen)}
                            className="terminal-menu-button"
                            aria-label={modalOpen ? "Fechar menu" : "Abrir menu"}
                            aria-expanded={modalOpen}
                            aria-controls="mobile-menu"
                        >
                            {modalOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
                        </button>
                    </div>
                </div>

                {modalOpen && (
                        <>
                            <div
                                className="terminal-menu-overlay absolute inset-x-0 top-full h-[100dvh] bg-black/50 lg:hidden z-40"
                                onClick={() => openModal(false)}
                                aria-hidden="true"
                            />
                            <nav
                                id="mobile-menu"
                                data-lenis-prevent
                                aria-label="Navegação principal"
                                className="terminal-mobile-menu absolute lg:hidden bg-slate-950/95 backdrop-blur-md shadow-lg shadow-black/40 border-l border-white/10 z-50 overflow-y-auto overscroll-contain"
                            >
                                <ul>
                                {navItems.map((item, index) => (
                                    <li key={item.id}>
                                        <motion.a
                                            href={`#${item.id}`}
                                            onClick={(event) => followSectionLink(event, item.id, () => setModalOpen(false))}
                                            aria-current={activeLink.toLowerCase() === item.id.toLowerCase() ? 'location' : undefined}
                                            className={`terminal-mobile-link ${
                                                activeLink.toLowerCase() === item.id.toLowerCase() ? 'is-active' : ''
                                            }`}
                                            whileHover={{ x: 5 }}
                                            onHoverStart={playMenuSound}
                                            onFocus={playMenuSound}
                                        >
                                            <span className="terminal-mobile-index">{String(index + 1).padStart(2, '0')}</span>
                                            {item.label}
                                        </motion.a>
                                    </li>
                                ))}
                                </ul>
                            </nav>
                        </>
                )}
            </div>
        </header>
    );
}
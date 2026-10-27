import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/navegadorContext";
import { idiomaBr, idiomaEn } from "../Utils/translate";
import { MenuIcon, XIcon } from "lucide-react";

export function Header() {
    const [activeLink, setActiveLink] = useState('home');
    const [modalOpen, setModalOpen] = useState(false);
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
        const handleScroll = () => {
            const sections = ['home', ...sectionIds];
            let current = '';
            sections.forEach(section => {
                const element = document.getElementById(section);
                if (element && element.getBoundingClientRect().top <= 100) {
                    current = section;
                }
            });
            setActiveLink(current);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sectionIds]);

    useEffect(() => {
        if (!modalOpen) {
            document.body.style.overflow = '';
            return;
        }

        document.body.style.overflow = 'hidden';

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setModalOpen(false);
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => {
            document.body.style.overflow = '';
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

    const handleClick = (link: string) => {
        setActiveLink(link);
        setModalOpen(false);
        const element = document.getElementById(link);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const openModal = (value: boolean) => {
        setModalOpen(value);
    };


    const modalVariants = {
        hidden: { x: '100%' }, 
        visible: { x: 0 },
        exit: { x: '100%' }
    };

    return (
        <header className="terminal-navigation fixed top-0 w-full z-50 bg-slate-950/70 backdrop-blur-md shadow-lg shadow-black/30 transition-all duration-300 border-b border-white/10">
            <div className="terminal-navigation-inner">
                <div className="terminal-navigation-row">
                    <motion.a
                        href="#home"
                        whileHover={{ y: -1 }}
                        className="terminal-brand"
                        onClick={() => handleClick('home')}
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
                                    onClick={(e) => { e.preventDefault(); handleClick(item.id); }}
                                    aria-current={activeLink.toLowerCase() === item.id.toLowerCase() ? 'location' : undefined}
                                    className={`terminal-nav-link ${
                                        activeLink.toLowerCase() === item.id.toLowerCase() ? 'is-active' : ''
                                    }`}
                                    whileHover={{ y: -1 }}
                                >
                                    {item.label}
                                </motion.a>
                            </li>
                        ))}
                    </ul>
                    </nav>

                    <div className="terminal-menu-toggle lg:hidden">
                        <button
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

                <AnimatePresence>
                    {modalOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="terminal-menu-overlay fixed inset-0 bg-black/50 lg:hidden z-40"
                                onClick={() => openModal(false)} 
                            />
                            <motion.nav
                                id="mobile-menu"
                                aria-label="Navegação principal"
                                variants={modalVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={{ duration: 0.3 }}
                                className="terminal-mobile-menu fixed top-16 right-0 lg:hidden bg-slate-950/95 backdrop-blur-md shadow-lg shadow-black/40 border-l border-white/10 z-50 overflow-y-auto"
                            >
                                <ul>
                                {navItems.map((item, index) => (
                                    <li key={item.id}>
                                        <motion.a
                                            href={`#${item.id}`}
                                            onClick={(e) => { e.preventDefault(); handleClick(item.id); }}
                                            aria-current={activeLink.toLowerCase() === item.id.toLowerCase() ? 'location' : undefined}
                                            className={`terminal-mobile-link ${
                                                activeLink.toLowerCase() === item.id.toLowerCase() ? 'is-active' : ''
                                            }`}
                                            whileHover={{ x: 5 }}
                                        >
                                            <span className="terminal-mobile-index">{String(index + 1).padStart(2, '0')}</span>
                                            {item.label}
                                        </motion.a>
                                    </li>
                                ))}
                                </ul>
                            </motion.nav>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}
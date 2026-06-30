import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; 
import { useLanguage } from "../context/navegadorContext";
import { idiomaBr, idiomaEn } from "../Utils/translate";
import { MenuIcon, XIcon } from "lucide-react";

export function Header() {
    const [activeLink, setActiveLink] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const language = useLanguage();
    const languageArray = language === 'pt-BR' ? idiomaBr : idiomaEn;
    const sectionIds = language === 'pt-BR'
        ? ['sobre', 'skills', 'projetos', 'experiência', 'contato']
        : ['about', 'skills', 'projects', 'experience', 'contact'];
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
        <header className="fixed top-0 w-full z-50 bg-slate-950/70 backdrop-blur-md shadow-lg shadow-black/30 transition-all duration-300 border-b border-white/10">
            <div className="w-full py-4 px-[3%] lg:px-0"> 
                <div className="lg:w-full flex justify-around items-center">
                    <motion.a
                        href="#home"
                        whileHover={{ scale: 1.05 }} 
                        className="text-amber-300 font-sans text-base lg:text-2xl font-bold"
                        onClick={() => handleClick('home')} 
                    >
                        {"</"} <span className="text-slate-100 font-serif"> Yasuhei Nakamura </span> {"/>"} 
                    </motion.a>

                    {/* Navegação desktop */}
                    <ul className="hidden lg:flex justify-around items-center gap-6">
                        {navItems.map((item) => (
                            <li key={item.id}>
                                <motion.a
                                    href={`#${item.id}`}
                                    onClick={(e) => { e.preventDefault(); handleClick(item.id); }}
                                    className={`text-slate-100 font-medium hover:text-amber-300 transition-colors duration-200 ${
                                        activeLink.toLowerCase() === item.id.toLowerCase() ? 'text-amber-300' : ''
                                    }`}
                                    whileHover={{ y: -2 }} 
                                >
                                    {item.label}
                                </motion.a>
                            </li>
                        ))}
                    </ul>

                    {/* Botão hambúrguer para mobile */}
                    <div className="lg:hidden flex items-center gap-4">
                        <button
                            onClick={() => openModal(!modalOpen)}
                            className="text-amber-300 focus:outline-none hover:scale-110 transition-transform"
                            aria-label={modalOpen ? "Fechar menu" : "Abrir menu"} 
                            aria-expanded={modalOpen}
                            aria-controls="mobile-menu"
                        >
                            {modalOpen ? <XIcon size={24} /> : <MenuIcon size={24} />} 
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
                                className="fixed inset-0 bg-black/50 lg:hidden z-40"
                                onClick={() => openModal(false)} 
                            />
                            <motion.ul
                                id="mobile-menu"
                                variants={modalVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={{ duration: 0.3 }}
                                className="fixed top-16 right-0 lg:hidden flex flex-col gap-2 px-5 py-4 bg-slate-950/95 backdrop-blur-md w-64 h-[calc(100dvh-4rem)] shadow-lg shadow-black/40 border-l border-white/10 z-50 overflow-y-auto"
                            >
                                {navItems.map((item) => (
                                    <li key={item.id}>
                                        <motion.a
                                            href={`#${item.id}`}
                                            onClick={(e) => { e.preventDefault(); handleClick(item.id); }}
                                            className={`text-slate-100 font-medium py-4 px-2 hover:text-amber-300 transition-colors block ${
                                                activeLink.toLowerCase() === item.id.toLowerCase() ? 'text-amber-300' : ''
                                            }`}
                                            whileHover={{ x: 5 }}
                                        >
                                            {item.label}
                                        </motion.a>
                                    </li>
                                ))}
                            </motion.ul>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}
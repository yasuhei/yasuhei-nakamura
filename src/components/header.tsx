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


    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
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
        <motion.header
            initial={{ y: -100 }} 
            animate={{ y: 0 }}
            className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg transition-all duration-300" 
        >
            <div className="w-full py-4 px-[3%] lg:px-0"> 
                <div className="lg:w-full flex justify-around items-center">
                    <motion.a
                        href="#home"
                        whileHover={{ scale: 1.05 }} 
                        className="text-indigo-500 dark:text-indigo-400 font-sans text-base lg:text-2xl font-bold"
                        onClick={() => handleClick('home')} 
                    >
                        {"</"} <span className="text-slate-900 dark:text-slate-100 font-serif"> Yasuhei Nakamura </span> {"/>"} 
                    </motion.a>

                    {/* Navegação desktop */}
                    <ul className="hidden lg:flex justify-around items-center gap-6">
                        {languageArray.map((item, index) => (
                            <li key={index}>
                                <motion.a
                                    href={`#${item.toLowerCase()}`}
                                    onClick={(e) => { e.preventDefault(); handleClick(item.toLowerCase()); }}
                                    className={`text-slate-900 dark:text-slate-100 font-medium hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-200 ${
                                        activeLink.toLowerCase() === item.toLowerCase() ? 'text-indigo-500 dark:text-indigo-400' : ''
                                    }`}
                                    whileHover={{ y: -2 }} 
                                >
                                    {item}
                                </motion.a>
                            </li>
                        ))}
                    </ul>

                    {/* Botão hambúrguer para mobile */}
                    <div className="lg:hidden flex items-center gap-4">
                        <button
                            onClick={() => openModal(!modalOpen)}
                            className="text-indigo-500 dark:text-indigo-400 focus:outline-none hover:scale-110 transition-transform"
                            aria-label={modalOpen ? "Fechar menu" : "Abrir menu"} 
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
                                variants={modalVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={{ duration: 0.3 }}
                                className="fixed top-0 right-0 lg:hidden flex flex-col mt-20 space-y-4 p-4 bg-white dark:bg-gray-900 w-64 h-full shadow-lg z-50" 
                            >
                                {languageArray.map((item, index) => (
                                    <li key={index}>
                                        <motion.a
                                            href={`#${item.toLowerCase()}`}
                                            onClick={(e) => { e.preventDefault(); handleClick(item.toLowerCase()); }}
                                            className={`text-slate-900 dark:text-slate-100 font-medium py-4 px-2 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors block ${
                                                activeLink.toLowerCase() === item.toLowerCase() ? 'text-indigo-500 dark:text-indigo-400' : ''
                                            }`}
                                            whileHover={{ x: 5 }}
                                        >
                                            {item}
                                        </motion.a>
                                    </li>
                                ))}
                            </motion.ul>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </motion.header>
    );
}
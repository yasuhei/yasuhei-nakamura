import { motion } from "framer-motion"; 
import { Mail, Github, Linkedin, ArrowUp } from 'lucide-react';
import { Title } from "../components/title";
import { footerBr, footerEn } from '../Utils/translate';
import { useLanguage } from "../context/navegadorContext";
import { useEffect, useState } from "react";

export function Footer() {
    const language = useLanguage();
    const footerText = language === 'pt-BR' ? footerBr : footerEn;
    const id = language === 'pt-BR' ? "contato" : "contact";

    // Texto multilíngue para subtítulo
    const contactSubtitle = language === 'pt-BR' ? "Entre em Contato" : "Get in Touch";

    // Estado para Back-to-Top
    const [showTopBtn, setShowTopBtn] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowTopBtn(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Animações
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.5, ease: 'easeOut' }
        }
    };

    return (
        <footer id={id} className="w-full relative py-20 lg:py-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 via-blue-900/80 to-purple-900/90 dark:from-indigo-900/95 dark:via-blue-900/85 dark:to-purple-900/95" />
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(135deg,_transparent_30%,_rgba(99,102,241,0.1)_30%,_rgba(99,102,241,0.1)_40%,_transparent_40%),linear-gradient(-135deg,_transparent_30%,_rgba(99,102,241,0.1)_30%,_rgba(99,102,241,0.1)_40%,_transparent_40%)] bg-[length:60px_60px]" />
            </div>
            {/* Overlay Light Mode */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 to-gray-800/90 dark:hidden" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <motion.div variants={itemVariants} className="mb-8">
                        <Title title={id} className="text-3xl lg:text-4xl font-black text-white tracking-tight mb-4" />
                        <motion.p 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-lg text-gray-300 dark:text-gray-300 font-medium"
                        >
                            {contactSubtitle}
                        </motion.p>
                    </motion.div>

                    <motion.ul 
                        variants={containerVariants}
                        className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 py-8 w-full max-w-sm md:max-w-lg mx-auto" 
                        role="navigation"
                        aria-label="Links de contato"
                    >
                        {[
                            { 
                                icon: Mail, 
                                href: "mailto:yasuhei.nakamura@hotmail.com", 
                                label: 'Email',
                                text: 'Email', 
                                fullText: 'yasuhei.nakamura@hotmail.com' 
                            },
                            { 
                                icon: Github, 
                                href: "https://github.com/yasuhei", 
                                label: 'GitHub',
                                text: 'GitHub',
                                fullText: '' 
                            },
                            { 
                                icon: Linkedin, 
                                href: "https://www.linkedin.com/in/yasuhei-nakamura-9aa80a93/", 
                                label: 'LinkedIn',
                                text: 'LinkedIn',
                                fullText: '' 
                            }
                        ].map((social, index) => (
                            <motion.li 
                                key={index} 
                                variants={itemVariants}
                                className="w-40 lg:w-auto" 
                            >
                                <a 
                                    href={social.href} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="group flex justify-center md:justify-start items-center gap-3 px-4 py-3 bg-white/10 dark:bg-white/20 backdrop-blur-md rounded-xl border border-indigo-500/30 dark:border-indigo-400/30 text-white hover:bg-white/20 dark:hover:bg-white/30 font-medium transition-all duration-300 shadow-lg hover:shadow-indigo-500/25 transform hover:scale-105 hover:-translate-y-1 w-full max-w-xs md:max-w-sm text-center md:text-left" // justify-center mobile (centraliza ícone); py-3 (mais compacto); text-center mobile
                                    aria-label={social.label}
                                >
                                    <social.icon 
                                        size={20} 
                                        className="text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300 flex-shrink-0" 
                                    />
                                    <span 
                                        className="hidden md:inline whitespace-nowrap truncate max-w-[120px] md:max-w-[150px]" 
                                        title={social.fullText || social.text}
                                    >
                                        {social.text}
                                    </span> 
                                </a>
                            </motion.li>
                        ))}
                    </motion.ul>
                </motion.div>

                {/* Footer Principal: Copyright + Back-to-Top */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col lg:flex-row justify-between items-center gap-8 py-8 w-full border-t border-white/10"
                >
                    <motion.p 
                        className="font-bold text-sm lg:text-lg text-gray-300 dark:text-gray-300 text-center lg:text-left"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        {footerText} 
                    </motion.p>

                    <motion.button
                        onClick={scrollToTop}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: showTopBtn ? 1 : 0, scale: showTopBtn ? 1 : 0.8 }}
                        transition={{ duration: 0.3 }}
                        className="p-3 bg-indigo-500/80 rounded-full shadow-lg hover:shadow-indigo-500/50 hover:bg-indigo-400 transition-all duration-300 text-white hidden lg:flex items-center justify-center"
                        aria-label={language === 'pt-BR' ? "Voltar ao topo" : "Back to top"}
                    >
                        <ArrowUp size={20} />
                    </motion.button>
                </motion.div>
            </div>
        </footer>
    );
}
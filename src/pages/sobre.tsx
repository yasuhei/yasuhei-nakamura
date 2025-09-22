import {  useState, useEffect, useRef } from 'react'; 
import { useLanguage } from '../context/navegadorContext';
import Selfie from '../assets/eu.jpeg';
import { Mail, Github, Linkedin, Code2, Award, Users } from 'lucide-react'; 
import { sobreBr, sobreEn } from '../Utils/translate';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';

export function Sobre() {
    const language = useLanguage();
    const languageArray = language === 'pt-BR' ? sobreBr : sobreEn;

    const { titulo, paragrafo } = languageArray[0];
    const id = language === 'pt-BR' ? "sobre" : "about";

    const journeySlides = language === 'pt-BR' 
        ? [
            { title: "Início da Jornada", desc: "Comecei como dev frontend em 2017, focando em React e UX.", icon: Code2 },
            { title: "Especialização Full-Stack", desc: "Evoluí para full-stack com NestJS e Angular, liderando projetos em equipes.", icon: Award },
            { title: "Impacto e Colaboração", desc: "Atuo construindo soluções inovadoras, sempre em colaboração com minha equipe.", icon: Users }
          ]
        : [
            { title: "Journey Start", desc: "Started as frontend dev in 2017, focusing on React and UX.", icon: Code2 },
            { title: "Full-Stack Expertise", desc: "Evolved to full-stack with NestJS and Angular, leading team projects.", icon: Award },
            { title: "Impact & Collaboration", desc: "Building innovative solutions in close collaboration with my team.", icon: Users }
          ];

    const containerVariants: Variants  = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 }
        }
    };

    const itemVariants: Variants  = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
    };

    const { scrollYProgress } = useScroll();
    const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -20]);

    const [currentSlide, setCurrentSlide] = useState(0);
    const slideInterval = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        slideInterval.current = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % journeySlides.length);
        }, 4000); 
        return () => {
            if (slideInterval.current) clearInterval(slideInterval.current);
        };
    }, [journeySlides.length]);

    const handleDotClick = (index: number) => {
        setCurrentSlide(index);
    };

    return (
        <section id={id} className="w-full relative py-20 lg:py-32 overflow-hidden">
            <motion.div 
                style={{ y: backgroundY }}
                className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-blue-900/70 to-purple-900/80 dark:from-indigo-900/90 dark:via-blue-900/80 dark:to-purple-900/90"
            />
            <div className="absolute inset-0 opacity-10 dark:opacity-20"> 
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(135deg,_transparent_30%,_rgba(99,102,241,0.2)_30%,_rgba(99,102,241,0.2)_40%,_transparent_40%),linear-gradient(-135deg,_transparent_30%,_rgba(99,102,241,0.2)_30%,_rgba(99,102,241,0.2)_40%,_transparent_40%)] bg-[length:60px_60px]" />
            </div>

            <div className="absolute inset-0 bg-gradient-to-br from-slate-50/90 to-white/90 dark:hidden" /> 

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <motion.div 
                    variants={itemVariants}
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid lg:grid-cols-2 gap-12 items-center mb-16 bg-gray-900/80 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl p-8 lg:p-12 border border-indigo-500/30 dark:border-indigo-400/30 shadow-2xl" // Fundo opaco (/80-90), border glow para pro
                >
                    <motion.div
                        variants={itemVariants}
                        className="relative flex justify-center lg:justify-start"
                        animate={{ y: [0, -10, 0] }} // Float sutil
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <div className="relative group">
                            <img 
                                src={Selfie} 
                                alt="Foto profissional de Yasuhei Nakamura" 
                                className="w-48 h-48 lg:w-64 lg:h-64 rounded-full object-cover border-4 border-indigo-500/70 dark:border-indigo-400/70 shadow-2xl drop-shadow-lg" // Border mais opaco (/70) para destaque
                                loading="lazy"
                            />
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                className="absolute inset-0 rounded-full bg-indigo-600/80 dark:bg-indigo-500/80 flex items-center justify-center backdrop-blur-md" // Fundo mais opaco (/80)
                            >
                                <span className="text-white font-bold text-lg">Yasuhei Nakamura</span>
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="text-center lg:text-left space-y-6"
                    >
                        <h2 className="text-2xl lg:text-3xl font-black uppercase text-white dark:text-white tracking-tight"> 
                            {titulo}
                        </h2>
                        <p className="text-lg text-gray-100 dark:text-gray-100 leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium"> 
                            {paragrafo}
                        </p>
                        <ul className="flex justify-center lg:justify-start gap-8 pt-6">
                            {[
                                { icon: Mail, href: "mailto:yasuhei.nakamura@hotmail.com", label: "Email" },
                                { icon: Github, href: "https://github.com/yasuhei", label: "GitHub" },
                                { icon: Linkedin, href: "https://www.linkedin.com/in/yasuhei-nakamura-9aa80a93/", label: "LinkedIn" }
                            ].map((social, index) => (
                                <motion.li
                                    key={index}
                                    whileHover={{ scale: 1.2, y: -4 }}
                                    className="relative"
                                >
                                    <a 
                                        href={social.href} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-indigo-300 dark:text-indigo-300 hover:text-indigo-200 dark:hover:text-indigo-200 transition-all duration-300 p-3 bg-white/20 dark:bg-white/30 rounded-full backdrop-blur-sm shadow-lg hover:shadow-indigo-500/50" // Ícones mais claros (300), hover 200; bg mais opaco (/20-30)
                                        aria-label={social.label}
                                    >
                                        <social.icon size={24} />
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="w-full"
                    role="region"
                    aria-label="Carrossel da jornada profissional"
                >
                    <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-8 uppercase tracking-wide"> 
                        {language === 'pt-BR' ? "Minha Jornada" : "My Journey"}
                    </h3>
                    <div className="relative overflow-hidden rounded-2xl bg-gray-900/80 dark:bg-gray-900/90 backdrop-blur-md border border-indigo-500/30 dark:border-indigo-400/30 shadow-2xl">
                        {/* Slides */}
                        <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                            {journeySlides.map((slide, index) => (
                                <motion.div
                                    key={index}
                                    className="min-w-full p-8 text-center flex flex-col items-center justify-center h-64 lg:h-80"
                                    initial={{ opacity: 0.7, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.05, rotate: 1 }}
                                        className="mb-4 p-4 bg-indigo-500/30 dark:bg-indigo-400/40 rounded-full" 
                                    >
                                        <slide.icon size={48} className="text-indigo-200 dark:text-indigo-200" /> 
                                    </motion.div>
                                    <h4 className="text-xl font-bold text-white dark:text-white mb-4"> 
                                        {slide.title}
                                    </h4>
                                    <p className="text-gray-100 dark:text-gray-100 max-w-md"> 
                                        {slide.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex justify-center gap-2 mt-6 pb-4">
                            {journeySlides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleDotClick(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                        currentSlide === index 
                                            ? 'bg-indigo-400 scale-125 shadow-lg' 
                                            : 'bg-gray-300 dark:bg-gray-600 hover:bg-indigo-300 dark:hover:bg-indigo-500'
                                    }`} 
                                    aria-label={`Ir para slide ${index + 1}`}
                                />
                            ))}
                        </div>

                        <motion.div
                            className="absolute inset-0"
                            onHoverStart={() => slideInterval.current && clearInterval(slideInterval.current)}
                            onHoverEnd={() => {
                                if (slideInterval.current) clearInterval(slideInterval.current);
                                slideInterval.current = setInterval(() => setCurrentSlide((prev) => (prev + 1) % journeySlides.length), 4000);
                            }}
                        />
                    </div>
                </motion.div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-20 lg:h-32 bg-gradient-to-t from-indigo-900/90 to-transparent dark:from-indigo-900/95 flex items-end justify-center"> 
                <div className="w-full h-1 bg-gradient-to-r from-indigo-400 to-blue-400 opacity-80 dark:opacity-90" /> 
            </div>
        </section>
    );
}
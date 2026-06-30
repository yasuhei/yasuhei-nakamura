import {  useState, useEffect, useRef } from 'react'; 
import { useLanguage } from '../context/navegadorContext';
import Selfie from '../assets/me.jpeg';
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
            { title: "Início da Jornada", desc: "Comecei como dev frontend em 2019, focando em React e UX.", icon: Code2 },
            { title: "Especialização Full-Stack", desc: "Evoluí para full-stack com NestJS e Angular, liderando projetos em equipes.", icon: Award },
            { title: "Impacto e Colaboração", desc: "Atuo construindo soluções inovadoras, sempre em colaboração com minha equipe.", icon: Users }
          ]
        : [
            { title: "Journey Start", desc: "Started as frontend dev in 2019, focusing on React and UX.", icon: Code2 },
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
    const slideInterval = useRef<ReturnType<typeof setInterval> | null>(null);

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
                className="absolute inset-0 bg-gradient-to-br from-[#05070c] via-[#0b111b] to-[#161f2d]"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_24%,rgba(244,167,105,0.18),transparent_34%),radial-gradient(circle_at_14%_80%,rgba(107,171,232,0.14),transparent_42%)]" />
            <div className="absolute inset-0 opacity-10"> 
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(135deg,_transparent_30%,_rgba(251,191,36,0.14)_30%,_rgba(251,191,36,0.14)_40%,_transparent_40%),linear-gradient(-135deg,_transparent_32%,_rgba(125,211,252,0.12)_32%,_rgba(125,211,252,0.12)_42%,_transparent_42%)] bg-[length:60px_60px]" />
            </div>

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
                    className="grid lg:grid-cols-2 gap-12 items-center mb-16 bg-slate-950/60 backdrop-blur-md rounded-2xl p-8 lg:p-12 border border-amber-200/20 shadow-2xl"
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
                                className="w-48 h-48 lg:w-64 lg:h-64 rounded-full object-cover border-4 border-amber-200/50 shadow-2xl drop-shadow-lg"
                                loading="lazy"
                            />
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                className="absolute inset-0 rounded-full bg-slate-950/70 flex items-center justify-center backdrop-blur-md"
                            >
                                <span className="text-white font-bold text-lg">Yasuhei Nakamura</span>
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="text-center lg:text-left space-y-6"
                    >
                        <h2 className="text-2xl lg:text-3xl font-black uppercase text-white tracking-tight"> 
                            {titulo}
                        </h2>
                        <p className="text-lg text-slate-200 leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium"> 
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
                                        className="text-amber-200 hover:text-amber-100 transition-all duration-300 p-3 bg-slate-900/70 rounded-full backdrop-blur-sm shadow-lg hover:shadow-amber-500/20 border border-amber-200/20"
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
                    <h3 className="text-xl font-bold text-center text-slate-100 mb-8 uppercase tracking-wide"> 
                        {language === 'pt-BR' ? "Minha Jornada" : "My Journey"}
                    </h3>
                    <div className="relative overflow-hidden rounded-2xl bg-slate-950/60 backdrop-blur-md border border-amber-200/20 shadow-2xl">
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
                                        className="mb-4 p-4 bg-amber-300/20 rounded-full" 
                                    >
                                        <slide.icon size={48} className="text-amber-100" /> 
                                    </motion.div>
                                    <h4 className="text-xl font-bold text-white mb-4"> 
                                        {slide.title}
                                    </h4>
                                    <p className="text-slate-200 max-w-md"> 
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
                                            ? 'bg-amber-300 scale-125 shadow-lg' 
                                            : 'bg-slate-500 hover:bg-amber-200'
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

            <div className="absolute bottom-0 left-0 w-full h-20 lg:h-32 bg-gradient-to-t from-[#101827] to-transparent flex items-end justify-center"> 
                <div className="w-full h-1 bg-gradient-to-r from-amber-300 via-amber-100 to-sky-300 opacity-80" /> 
            </div>
        </section>
    );
}
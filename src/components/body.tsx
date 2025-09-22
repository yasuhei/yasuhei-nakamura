import { motion, useScroll, useTransform, Variants } from 'framer-motion'; 
import { bodyBr, bodyEn } from '../Utils/translate';
import pdf from '../assets/pdf/Yasuhei_Nakamura.pdf';
import pdfEn from '../assets/pdf/Yasuhei_Nakamura_-_FEng.pdf';
import { useLanguage } from '../context/navegadorContext';
import { DownloadIcon, CodeIcon, CalendarIcon } from 'lucide-react'; 
import ProfilePhoto from '../assets/SVG PROGRAMADOR 04.svg';

export function Body() {
    const language = useLanguage();
    const languageArray = language === 'pt-BR' ? bodyBr : bodyEn;
    const curric = language === 'pt-BR' ? pdf : pdfEn;

    const { titulo, paragrafo, paragrafo2, curriculo } = languageArray[0];


    const badges = language === 'pt-BR' 
        ? ["Desenvolvedor Full-Stack", "4+ Anos de Experiência", "Especialista em React/Angular"] 
        : ["Full-Stack Developer", "4+ Years Experience", "React/Angular Specialist"];

    const containerVariants: Variants  = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 }
        }
    };

    const itemVariants:Variants  = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } 
        }
    };

    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]); 

    const particles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2
    }));

    return (
        <main className="w-full min-h-screen flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 dark:from-indigo-900 dark:via-blue-900 dark:to-purple-900 opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-tl from-indigo-500/20 via-transparent to-blue-500/20" /> 
            
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,_transparent_30%,_rgba(255,255,255,0.1)_30%,_rgba(255,255,255,0.1)_40%,_transparent_40%),linear-gradient(-45deg,_transparent_30%,_rgba(255,255,255,0.1)_30%,_rgba(255,255,255,0.1)_40%,_transparent_40%)] bg-[length:40px_40px]" />
            </div>

            <div className="absolute inset-0 pointer-events-none">
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        className="absolute w-1 h-1 bg-indigo-300 dark:bg-indigo-400 rounded-full"
                        style={{
                            left: `${particle.x}vw`,
                            top: `${particle.y}vh`,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.5, 1, 0.5],
                            scale: [1, 1.2, 1]
                        }}
                        transition={{
                            duration: 4 + particle.delay,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-6 py-20 lg:py-32 w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex-1 text-center lg:text-left max-w-3xl order-2 lg:order-1"
                >
                    <motion.span
                        variants={itemVariants}
                        className="inline-block px-4 py-2 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-sm font-bold uppercase tracking-wider rounded-full mb-6" 
                    >
                        {titulo}
                    </motion.span>

                    <motion.h1
                        variants={itemVariants}
                        className="text-4xl lg:text-6xl xl:text-7xl font-black mb-4 text-white leading-none tracking-tight" 
                    >
                        Yasuhei Nakamura
                    </motion.h1>

                    <motion.div
                        variants={itemVariants}
                        className="flex flex-wrap gap-3 mb-8 justify-center lg:justify-start"
                    >
                        {badges.map((badge, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05, y: -2 }}
                                className="flex items-center px-4 py-2 bg-white/10 dark:bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/20"
                            >
                                {index === 1 ? <CalendarIcon className="mr-2 h-4 w-4" /> : <CodeIcon className="mr-2 h-4 w-4" />}
                                {badge}
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.p
                        variants={itemVariants}
                        className="text-lg lg:text-xl text-gray-200 dark:text-gray-300 mb-10 leading-relaxed font-medium max-w-lg mx-auto lg:mx-0" 
                    >
                        {paragrafo}
                        <br />
                        {paragrafo2}
                    </motion.p>

                    <motion.a
                        variants={itemVariants}
                        href={curric}
                        download={language === 'pt-BR' ? "Yasuhei_Nakamura.pdf" : "Yasuhei_Nakamura_FEng.pdf"}
                        className="group inline-flex items-center px-8 py-4 bg-white/10 dark:bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/20 font-bold rounded-xl transition-all duration-500 ease-out shadow-2xl hover:shadow-indigo-500/25 transform hover:scale-105 hover:-translate-y-2 relative overflow-hidden" // Ripple + glow no hover para advanced
                        aria-label={`Baixar currículo em ${language === 'pt-BR' ? 'português' : 'inglês'}`}
                    >
                        <DownloadIcon className="mr-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        {curriculo}
                        {/* Ripple effect sutil */}
                        <motion.div
                            className="absolute inset-0 bg-white/20 rounded-xl -z-10"
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                        />
                    </motion.a>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    style={{ y }} 
                    initial={{ opacity: 0, rotate: -5, scale: 0.9 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    transition={{ duration: 1, delay: 0.4, ease: 'backOut' }} 
                    className="flex-1 flex justify-center lg:justify-end order-1 lg:order-2 mb-8 lg:mb-0"
                >
                    <motion.div
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        className="relative"
                    >
                        <img 
                            src={ProfilePhoto} 
                            alt="Avatar profissional de Yasuhei Nakamura" 
                            className="w-72 h-72 lg:w-96 lg:h-96 rounded-2xl object-contain filter brightness-110 saturate-120 drop-shadow-2xl border-2 border-white/20 backdrop-blur-sm" 
                        />
                        <motion.div
                            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/30 to-blue-500/30 blur-xl -z-10"
                            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        />
                    </motion.div>
                </motion.div>
            </div>
        </main>
    );
}
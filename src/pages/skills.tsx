import { useMemo, useState } from "react";
import { motion, Variants, useReducedMotion } from "framer-motion"; 
import { Title } from "../components/title";
import { useLanguage } from "../context/navegadorContext"; 
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import { Autoplay, Pagination, Navigation, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { icons } from "../Utils/img"; 
import { Code2, Sparkles } from "lucide-react";

export function Skills() {
    const language = useLanguage();
    const sectionTwo = language === 'pt-BR' ? "Habilidades" : "Skills"; 
    const subtitle = language === 'pt-BR' ? "Tecnologias que domino" : "Technologies I master";
    const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
    const prefersReducedMotion = useReducedMotion();
    const particleCount = prefersReducedMotion ? 10 : 24;

    const particles = useMemo(
        () =>
            Array.from({ length: particleCount }, () => ({
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 2,
            })),
        [particleCount]
    );
    
    const containerVariants: Variants  = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.2 } 
        }
    };

    const slideVariants: Variants  = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
        }
    };

    return (
        <section id="skills" className="w-full relative py-20 lg:py-32 overflow-hidden"> 
            <div className="absolute inset-0 bg-gradient-to-br from-[#05070c] via-[#0b111b] to-[#161f2d]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_20%,rgba(244,167,105,0.18),transparent_35%),radial-gradient(circle_at_18%_82%,rgba(107,171,232,0.14),transparent_44%)]" />
            
            {/* Animated particles */}
            <div className="absolute inset-0 opacity-20">
                {particles.map((particle, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-amber-200 rounded-full"
                        style={{
                            left: particle.left,
                            top: particle.top,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.3, 1, 0.3],
                            scale: [1, 1.5, 1]
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: particle.delay
                        }}
                    />
                ))}
            </div>

            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,_transparent_30%,_rgba(251,191,36,0.12)_30%,_rgba(251,191,36,0.12)_40%,_transparent_40%),linear-gradient(-45deg,_transparent_30%,_rgba(125,211,252,0.12)_30%,_rgba(125,211,252,0.12)_40%,_transparent_40%)] bg-[length:40px_40px]" />
            </div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <motion.div
                    variants={slideVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Code2 className="w-8 h-8 text-amber-300" />
                        <Title title={sectionTwo} />
                        <Sparkles className="w-8 h-8 text-sky-300" />
                    </div>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-slate-200 text-lg font-medium"
                    >
                        {subtitle}
                    </motion.p>
                </motion.div>

                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-300 to-transparent my-8 relative overflow-hidden"
                >
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="w-full mb-12"
                >
                    <div className="flex justify-center mb-4">
                        <button
                            type="button"
                            onClick={() => setIsAutoplayPaused((prev) => !prev)}
                            className="px-4 py-2 text-sm font-semibold rounded-full border border-amber-200/30 bg-slate-900/60 text-amber-100 hover:bg-slate-900/80 hover:border-amber-200/50 transition-all duration-300"
                            aria-label={isAutoplayPaused ? "Retomar rotação automática" : "Pausar rotação automática"}
                            aria-pressed={isAutoplayPaused}
                        >
                            {isAutoplayPaused
                                ? language === 'pt-BR' ? 'Retomar rotação' : 'Resume rotation'
                                : language === 'pt-BR' ? 'Pausar rotação' : 'Pause rotation'}
                        </button>
                    </div>

                    <Swiper
                        centeredSlides={true}
                        slidesPerView={2} 
                        spaceBetween={15} 
                        breakpoints={{
                            480: { slidesPerView: 3, spaceBetween: 20 }, 
                            768: { slidesPerView: 4, spaceBetween: 25 },
                            1024: { slidesPerView: 6, spaceBetween: 30 }, 
                            1440: { slidesPerView: 8, spaceBetween: 35 } 
                        }}
                        loop={true}
                        autoplay={prefersReducedMotion || isAutoplayPaused ? false : {
                            delay: 2000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true
                        }}
                        pagination={{ 
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        navigation={{
                            nextEl: '.custom-next',
                            prevEl: '.custom-prev',
                        }}
                        keyboard={{ enabled: true, onlyInViewport: true }}
                        modules={[Autoplay, Pagination, Navigation, Keyboard]}
                        className="skills-swiper w-full relative py-8" 
                    >
                        {icons.map((icon, index) => (
                            <SwiperSlide key={index}>
                                <motion.div
                                    variants={slideVariants}
                                    className="skill-slide flex flex-col justify-center items-center gap-3 h-32 lg:h-36" 
                                    whileHover={{ 
                                        scale: 1.15, 
                                        y: -10,
                                    }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                                >
                                    <div className="relative group">
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-br from-amber-300/20 to-sky-300/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            animate={{
                                                scale: [1, 1.2, 1],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: 'easeInOut'
                                            }}
                                        />
                                        <div className="skill-card relative bg-slate-900/70 backdrop-blur-md rounded-2xl p-4 lg:p-5 border border-amber-200/20 shadow-lg group-hover:shadow-amber-500/20 group-hover:border-amber-200/40 transition-all duration-300">
                                            <img 
                                                src={icon.src} 
                                                alt={icon.alt || `Ícone de ${icon.title}`} 
                                                title={icon.title} 
                                                className="w-12 lg:w-16 h-12 lg:h-16 object-contain transition-transform duration-300 group-hover:scale-110"
                                                loading="lazy"
                                                role="img"
                                                aria-label={icon.title} 
                                            />
                                        </div>
                                    </div>
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        className="skill-label text-xs lg:text-sm font-semibold text-slate-300 text-center transition-colors duration-300"
                                    >
                                        {icon.title}
                                    </motion.span>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom Navigation Buttons - Hidden on mobile */}
                    <div className="hidden md:flex justify-center items-center gap-4 mt-8">
                        <motion.button
                            whileHover={{ scale: 1.1, x: -5 }}
                            whileTap={{ scale: 0.95 }}
                            className="custom-prev w-12 h-12 flex items-center justify-center bg-amber-300/80 hover:bg-amber-300 text-slate-900 rounded-full shadow-lg hover:shadow-amber-500/30 transition-all duration-300 cursor-pointer"
                            aria-label="Previous slide"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </motion.button>

                        <div className="custom-pagination flex gap-2" />

                        <motion.button
                            whileHover={{ scale: 1.1, x: 5 }}
                            whileTap={{ scale: 0.95 }}
                            className="custom-next w-12 h-12 flex items-center justify-center bg-amber-300/80 hover:bg-amber-300 text-slate-900 rounded-full shadow-lg hover:shadow-amber-500/30 transition-all duration-300 cursor-pointer"
                            aria-label="Next slide"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </motion.button>
                    </div>
                    
                </motion.div>

                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                    className="h-[2px] w-full bg-gradient-to-l from-transparent via-sky-300 to-transparent my-8 relative overflow-hidden"
                >
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-l from-transparent via-white/50 to-transparent"
                        animate={{ x: ['100%', '-100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                </motion.div>
            </div>

            <style>{`
                .skills-swiper .swiper-pagination {
                    position: relative;
                    margin-top: 18px;
                }
                .skills-swiper .swiper-pagination-bullet {
                    width: 10px;
                    height: 10px;
                    background: rgba(251, 191, 36, 0.45);
                    opacity: 1;
                    transition: all 0.3s ease;
                }
                .skills-swiper .swiper-pagination-bullet-active {
                    background: rgb(251, 191, 36);
                    width: 24px;
                    border-radius: 5px;
                }
                .skills-swiper .swiper-slide-active .skill-card {
                    border-color: rgba(251, 191, 36, 0.55);
                    box-shadow: 0 0 0 1px rgba(251, 191, 36, 0.25), 0 10px 35px rgba(251, 191, 36, 0.18);
                    transform: translateY(-4px);
                }
                .skills-swiper .swiper-slide-active .skill-label {
                    color: rgb(254, 243, 199);
                }
                @media (max-width: 767px) {
                    .skills-swiper .swiper-slide-active .skill-card {
                        transform: translateY(-2px);
                    }
                }
            `}</style>

        </section>
    );
}
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, Variants, useReducedMotion } from "framer-motion"; 
import { Title } from "../components/title";
import { useLanguage } from "../context/navegadorContext"; 
import "swiper/css";
import "swiper/css/pagination";
import { A11y, Autoplay, Pagination, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import { icons } from "../Utils/img"; 
import { Code2, Sparkles } from "lucide-react";

export function Skills() {
    const language = useLanguage();
    const isPortuguese = language === 'pt-BR';
    const sectionTwo = language === 'pt-BR' ? "Habilidades" : "Skills"; 
    const subtitle = language === 'pt-BR' ? "Tecnologias que domino" : "Technologies I master";
    const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const swiperRef = useRef<SwiperInstance | null>(null);
    const prefersReducedMotion = useReducedMotion();
    const particleCount = prefersReducedMotion ? 10 : 24;

    useEffect(() => {
        const swiper = swiperRef.current;
        if (!swiper || swiper.destroyed) return;
        if (isAutoplayPaused || prefersReducedMotion) swiper.autoplay.stop();
        else if (!swiper.autoplay.running) swiper.autoplay.start();
    }, [isAutoplayPaused, prefersReducedMotion]);

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
                        animate={prefersReducedMotion ? undefined : {
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
                        animate={prefersReducedMotion ? undefined : { x: ['-100%', '100%'] }}
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
                    {!prefersReducedMotion && <div className="flex justify-center mb-4">
                        <button
                            type="button"
                            onClick={() => setIsAutoplayPaused((prev) => !prev)}
                            className="px-4 py-2 text-sm font-semibold rounded-full border border-amber-200/30 bg-slate-900/60 text-amber-100 hover:bg-slate-900/80 hover:border-amber-200/50 transition-all duration-300"
                        >
                            {isAutoplayPaused
                                ? language === 'pt-BR' ? 'Retomar rotação' : 'Resume rotation'
                                : language === 'pt-BR' ? 'Pausar rotação' : 'Pause rotation'}
                        </button>
                    </div>}

                    <Swiper
                        onSwiper={(swiper) => { swiperRef.current = swiper; }}
                        onRealIndexChange={(swiper) => setActiveIndex(swiper.realIndex)}
                        role="region"
                        aria-roledescription={isPortuguese ? 'carrossel' : 'carousel'}
                        aria-label={sectionTwo}
                        centeredSlides={true}
                        slidesPerView={1.85}
                        spaceBetween={14}
                        breakpoints={{
                            480: { slidesPerView: 2.8, spaceBetween: 18 },
                            768: { slidesPerView: 3.8, spaceBetween: 22 },
                            1024: { slidesPerView: 5, spaceBetween: 26 },
                        }}
                        loop={true}
                        speed={prefersReducedMotion ? 0 : 480}
                        autoplay={prefersReducedMotion ? false : {
                            delay: 3500,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true
                        }}
                        pagination={{ 
                            clickable: true,
                        }}
                        a11y={{
                            paginationBulletMessage: isPortuguese ? 'Ir para a tecnologia {{index}}' : 'Go to technology {{index}}',
                        }}
                        keyboard={{ enabled: true, onlyInViewport: true }}
                        modules={[A11y, Autoplay, Pagination, Keyboard]}
                        className="skills-swiper"
                    >
                        {icons.map((icon, index) => (
                            <SwiperSlide key={icon.title}>
                                {({ isActive, isPrev, isNext }) => (
                                    <motion.div
                                        className="skill-card"
                                        initial={false}
                                        animate={{
                                            y: prefersReducedMotion || isActive ? 0 : isPrev || isNext ? 8 : 13,
                                            scale: prefersReducedMotion || isActive ? 1 : isPrev || isNext ? 0.84 : 0.73,
                                            rotateY: prefersReducedMotion ? 0 : isPrev ? 24 : isNext ? -24 : 0,
                                        }}
                                        transition={{ type: 'spring', stiffness: 270, damping: 26 }}
                                    >
                                        <span className="skill-card-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                                        <img src={icon.src} alt="" draggable={false} loading="lazy" />
                                        {icon.title}
                                    </motion.div>
                                )}
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className="flex justify-center items-center gap-4 mt-4">
                        <motion.button
                            type="button"
                            onClick={() => swiperRef.current?.slidePrev()}
                            whileHover={prefersReducedMotion ? undefined : { scale: 1.1, x: -5 }}
                            whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                            className="w-12 h-12 flex items-center justify-center bg-amber-300/80 hover:bg-amber-300 text-slate-900 rounded-full shadow-lg hover:shadow-amber-500/30 transition-colors duration-300 cursor-pointer"
                            aria-label={isPortuguese ? 'Tecnologia anterior' : 'Previous technology'}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </motion.button>

                        <span className="skills-carousel-counter" aria-hidden="true">
                            {String(activeIndex + 1).padStart(2, '0')} / {String(icons.length).padStart(2, '0')}
                        </span>

                        <motion.button
                            type="button"
                            onClick={() => swiperRef.current?.slideNext()}
                            whileHover={prefersReducedMotion ? undefined : { scale: 1.1, x: 5 }}
                            whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                            className="w-12 h-12 flex items-center justify-center bg-amber-300/80 hover:bg-amber-300 text-slate-900 rounded-full shadow-lg hover:shadow-amber-500/30 transition-colors duration-300 cursor-pointer"
                            aria-label={isPortuguese ? 'Próxima tecnologia' : 'Next technology'}
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
                        animate={prefersReducedMotion ? undefined : { x: ['100%', '-100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                </motion.div>
            </div>

            <style>{`
                .skills-swiper {
                    padding: 1.65rem 0 1.5rem;
                    cursor: grab;
                }
                .skills-swiper:active { cursor: grabbing; }
                .skills-swiper .swiper-slide {
                    perspective: 700px;
                }
                .skills-swiper .skill-card {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: .75rem;
                    min-height: clamp(9.5rem, 17vw, 13rem);
                    padding: 1.3rem .5rem;
                    border: 1px solid rgba(255, 111, 155, .27);
                    border-radius: 1.1rem;
                    background: linear-gradient(155deg, #26172e, var(--city-panel));
                    color: var(--city-cream);
                    font-size: .95rem;
                    font-weight: 700;
                    transition: border-color .3s ease, box-shadow .3s ease;
                }
                .skills-swiper .skill-card img {
                    width: clamp(2.75rem, 7vw, 4.5rem);
                    height: clamp(2.75rem, 7vw, 4.5rem);
                    object-fit: contain;
                    user-select: none;
                }
                .skill-card-index,
                .skills-carousel-counter {
                    color: var(--city-cyan);
                    font: .72rem/1.3 ui-monospace, monospace;
                    letter-spacing: .13em;
                }
                .skill-card-index {
                    position: absolute;
                    top: .65rem;
                    left: .7rem;
                }
                .skills-swiper .swiper-pagination {
                    bottom: .1rem;
                    cursor: default;
                }
                .skills-swiper .swiper-pagination-bullet {
                    width: 10px;
                    height: 10px;
                    background: rgba(255, 111, 155, .55);
                    opacity: 1;
                }
                .skills-swiper .swiper-pagination-bullet-active {
                    background: var(--city-cyan);
                }
                .skills-swiper .swiper-pagination-bullet:focus-visible {
                    outline: 2px solid var(--city-cyan);
                    outline-offset: 3px;
                }
                .skills-swiper .swiper-slide-active .skill-card {
                    border-color: var(--city-pink);
                    box-shadow: inset 0 0 1.9rem rgba(255, 111, 155, .13), 0 0 1.55rem rgba(255, 111, 155, .23);
                }
            `}</style>

        </section>
    );
}
import { motion, Variants } from "framer-motion"; 
import { Title } from "../components/title";
import { useLanguage } from "../context/navegadorContext"; 
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import { Autoplay, Pagination, Navigation, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { icons } from "../Utils/img"; 
import { Code2, Sparkles } from "lucide-react";

export function Skills() {
    const language = useLanguage();
    const sectionTwo = language === 'pt-BR' ? "Habilidades" : "Skills"; 
    const subtitle = language === 'pt-BR' ? "Tecnologias que domino" : "Technologies I master";
    
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
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-blue-900/70 to-purple-900/80 dark:from-indigo-900/90 dark:via-blue-900/80 dark:to-purple-900/90" />
            
            {/* Animated particles */}
            <div className="absolute inset-0 opacity-20">
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-indigo-300 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.3, 1, 0.3],
                            scale: [1, 1.5, 1]
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: Math.random() * 2
                        }}
                    />
                ))}
            </div>

            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,_transparent_30%,_rgba(99,102,241,0.1)_30%,_rgba(99,102,241,0.1)_40%,_transparent_40%),linear-gradient(-45deg,_transparent_30%,_rgba(99,102,241,0.1)_30%,_rgba(99,102,241,0.1)_40%,_transparent_40%)] bg-[length:40px_40px]" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50/90 to-white/90 dark:hidden" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <motion.div
                    variants={slideVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Code2 className="w-8 h-8 text-indigo-400" />
                        <Title title={sectionTwo} />
                        <Sparkles className="w-8 h-8 text-indigo-400" />
                    </div>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-300 dark:text-gray-300 text-lg font-medium"
                    >
                        {subtitle}
                    </motion.p>
                </motion.div>

                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-[2px] w-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent my-8 relative overflow-hidden"
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
                        autoplay={{
                            delay: 2000, 
                            disableOnInteraction: false, 
                            pauseOnMouseEnter: true 
                        }}
                        pagination={{ 
                            clickable: true,
                            dynamicBullets: true,
                            el: '.custom-pagination',
                        }}
                        navigation={{
                            nextEl: '.custom-next',
                            prevEl: '.custom-prev',
                        }}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="w-full relative py-8" 
                    >
                        {icons.map((icon, index) => (
                            <SwiperSlide key={index}>
                                <motion.div
                                    variants={slideVariants}
                                    className="flex flex-col justify-center items-center gap-3 h-32 lg:h-36" 
                                    whileHover={{ 
                                        scale: 1.15, 
                                        y: -10,
                                    }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                                >
                                    <div className="relative group">
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            animate={{
                                                scale: [1, 1.2, 1],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: 'easeInOut'
                                            }}
                                        />
                                        <div className="relative bg-white/10 dark:bg-white/20 backdrop-blur-md rounded-2xl p-4 lg:p-5 border border-indigo-500/30 dark:border-indigo-400/30 shadow-lg group-hover:shadow-indigo-500/50 group-hover:border-indigo-400/60 transition-all duration-300">
                                            <img 
                                                src={icon.src} 
                                                alt={icon.alt || `Ícone de ${icon.title}`} 
                                                title={icon.title} 
                                                className="w-12 lg:w-16 h-12 lg:h-16 object-contain filter brightness-0 dark:invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"
                                                loading="lazy"
                                                role="img"
                                                aria-label={icon.title} 
                                            />
                                        </div>
                                    </div>
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        className="text-xs lg:text-sm font-semibold text-gray-200 dark:text-gray-300 text-center"
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
                            className="custom-prev w-12 h-12 flex items-center justify-center bg-indigo-500/80 hover:bg-indigo-500 text-white rounded-full shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 cursor-pointer"
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
                            className="custom-next w-12 h-12 flex items-center justify-center bg-indigo-500/80 hover:bg-indigo-500 text-white rounded-full shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 cursor-pointer"
                            aria-label="Next slide"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </motion.button>
                    </div>
                    
                    {/* Pagination only for mobile */}
                    <div className="md:hidden flex justify-center mt-6">
                        <div className="custom-pagination flex gap-2" />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                    className="h-[2px] w-full bg-gradient-to-l from-transparent via-purple-500 to-transparent my-8 relative overflow-hidden"
                >
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-l from-transparent via-white/50 to-transparent"
                        animate={{ x: ['100%', '-100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                </motion.div>
            </div>

            <style>{`
                .custom-pagination .swiper-pagination-bullet {
                    width: 10px;
                    height: 10px;
                    background: rgba(99, 102, 241, 0.5);
                    opacity: 1;
                    transition: all 0.3s ease;
                }
                .custom-pagination .swiper-pagination-bullet-active {
                    background: rgb(99, 102, 241);
                    width: 24px;
                    border-radius: 5px;
                }
            `}</style>

        </section>
    );
}
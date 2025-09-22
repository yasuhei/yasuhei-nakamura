import { motion, Variants } from "framer-motion"; 
import { Title } from "../components/title";
import { useLanguage } from "../context/navegadorContext"; 
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { icons } from "../Utils/img"; 

export function Skills() {
    const language = useLanguage();
    const sectionTwo = language === 'pt-BR' ? "Habilidades" : "Skills"; 
    const containerVariants: Variants  = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0.3 } 
        }
    };

    const slideVariants: Variants  = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { 
            opacity: 1, 
            scale: 1, 
            transition: { duration: 0.4, ease: 'easeOut' }
        }
    };

    return (
        <section id="skills" className="w-full relative py-20 lg:py-32 overflow-hidden"> 
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-blue-900/70 to-purple-900/80 dark:from-indigo-900/90 dark:via-blue-900/80 dark:to-purple-900/90" />
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
                    className="text-center mb-8"
                >
                    <Title title={sectionTwo}  />
                </motion.div>

                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-[1px] w-full bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 my-6 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="w-full mb-8"
                >
                    <Swiper
                        centeredSlides={true}
                        slidesPerView={2} 
                        spaceBetween={20} 
                        breakpoints={{
                            480: { slidesPerView: 3, spaceBetween: 15 }, 
                            762: { slidesPerView: 5, spaceBetween: 20 },
                            1024: { slidesPerView: 7, spaceBetween: 25 }, 
                            1440: { slidesPerView: 9, spaceBetween: 30 } 
                        }}
                        loop={true}
                        autoplay={{
                            delay: 2500, 
                            disableOnInteraction: false, 
                            pauseOnMouseEnter: true 
                        }}
                        pagination={{ 
                            clickable: true,
                            dynamicBullets: true,
                            renderBullet: (className) => `<span class="${className} bg-indigo-500/50 w-2 h-2 rounded-full"></span>`
                        }}
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="w-[90%] lg:w-[80%] relative" 
                        onSlideChange={() => {}} 
                    >
                        {icons.map((icon, index) => (
                            <SwiperSlide key={index}>
                                <motion.div
                                    variants={slideVariants}
                                    className="flex justify-center items-center h-20 lg:h-24" 
                                    whileHover={{ 
                                        scale: 1.2, 
                                        rotate: 5, 
                                        filter: 'drop-shadow(0 10px 20px rgba(99, 102, 241, 0.5))' 
                                    }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    <img 
                                        src={icon.src} 
                                        alt={icon.alt || `Ícone de ${icon.title}`} 
                                        title={icon.title} 
                                        className={`${icon.className || 'w-12 lg:w-16 h-12 lg:h-16 object-contain filter brightness-0 dark:invert hover:brightness-100 transition-all duration-300'} bg-white/10 dark:bg-white/20 backdrop-blur-sm rounded-lg p-3 border border-indigo-500/30 dark:border-indigo-400/30 shadow-md hover:shadow-indigo-500/50`} // Glass ao redor do ícone + invert no dark + hover full color
                                        loading="lazy"
                                        role="img"
                                        aria-label={icon.title} 
                                    />
                                </motion.div>
                            </SwiperSlide>
                        ))}

                        <div className="swiper-button-next hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 bg-indigo-500/80 text-white p-2 rounded-full shadow-lg hover:bg-indigo-400 transition-all z-10"></div>
                        <div className="swiper-button-prev hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 bg-indigo-500/80 text-white p-2 rounded-full shadow-lg hover:bg-indigo-400 transition-all z-10"></div>
                    </Swiper>
                </motion.div>

                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                    className="h-[1px] w-full bg-gradient-to-l from-indigo-500 via-blue-500 to-purple-500 my-6 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/30 to-transparent animate-shimmer-reverse" /> 
                </motion.div>
            </div>

            <style>{`
            @keyframes shimmer {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }
            @keyframes shimmer-reverse {
                0% { transform: translateX(100%); }
                100% { transform: translateX(-100%); }
            }
            .animate-shimmer { animation: shimmer 2s infinite linear; }
            .animate-shimmer-reverse { animation: shimmer-reverse 2s infinite linear; }
            `}</style>

        </section>
    );
}
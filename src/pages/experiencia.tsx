import { motion, Variants } from "framer-motion"; 
import { Title } from "../components/title";
import { CardExp } from "../components/cardExperiencia"; 
import { useLanguage } from "../context/navegadorContext";
import { expBr, expEn } from "../Utils/translate";
import { Briefcase, Calendar } from "lucide-react"; 

export function Experiencia() {
    const language = useLanguage();
    const experienciaArray = language === 'pt-BR' ? expBr : expEn;
    const ID = language === 'pt-BR' ? "experiência" : "experience";

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.3 }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
        }
    };

    return (
        <section id={ID} className="w-full relative py-20 lg:py-32 overflow-hidden"> 
            <div className="absolute inset-0 bg-gradient-to-br from-[#05070c] via-[#0b111b] to-[#161f2d]" />
            <div className="absolute inset-0 bg-gradient-to-tl from-amber-300/10 via-transparent to-sky-300/10" />
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(135deg,_transparent_30%,_rgba(251,191,36,0.12)_30%,_rgba(251,191,36,0.12)_40%,_transparent_40%),linear-gradient(-135deg,_transparent_30%,_rgba(125,211,252,0.12)_30%,_rgba(125,211,252,0.12)_40%,_transparent_40%)] bg-[length:56px_56px]" />
            </div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <Title title={ID}  />
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="relative"
                >
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-amber-300 to-sky-300 h-full opacity-70 z-0" />

                    {experienciaArray.map((exp, index) => {
                        const isEven = index % 2 === 0; 

                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                id={`exp-${index}`}
                                className={`relative mb-16 flex flex-col lg:flex-row items-center justify-center gap-8 z-10 ${
                                    isEven ? 'lg:flex-row-reverse' : ''
                                }`} 
                                style={{ originX: isEven ? 1 : 0 }} 
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    className="flex flex-col items-center lg:w-1/3 text-center lg:text-left bg-slate-950/60 backdrop-blur-md rounded-xl p-6 border border-amber-200/20 shadow-xl hover:shadow-amber-500/20 transition-all duration-300"
                                >
                                    <div className="absolute -left-2.5 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-amber-300 rounded-full shadow-lg z-20" /> 
                                    
                                    <Briefcase size={32} className="text-amber-300 mb-4" /> 
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-bold text-white">{exp?.empresa || experienciaArray[index].empresa}</h3> 
                                        <div className="flex items-center text-sm text-slate-300">
                                            <Calendar size={16} className="mr-1 text-amber-300" />
                                            {experienciaArray[index].mes} 
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="lg:w-2/3 transition-all duration-500"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3 }}
                                        className="bg-slate-900/60 backdrop-blur-md rounded-xl p-6 border border-amber-200/20 shadow-2xl"
                                    >
                                        <CardExp 
                                            titulo={exp.titulo} 
                                            data={exp.mes} 
                                            empresa={exp?.empresa || experienciaArray[index]?.empresa}
                                            descricao={exp.paragrafo}
                                        />
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
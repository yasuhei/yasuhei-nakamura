import { useState } from "react";
import { motion, Variants } from "framer-motion"; 
import { Title } from "../components/title";
import { CardExp } from "../components/cardExperiencia"; 
import { useLanguage } from "../context/navegadorContext";
import { expBr, expEn } from "../Utils/translate";
import { Briefcase, Calendar, ChevronDown } from "lucide-react"; 

export function Experiencia() {
    const language = useLanguage();
    const experienciaArray = language === 'pt-BR' ? expBr : expEn;
    const ID = language === 'pt-BR' ? "experiência" : "experience";

    const [expandedIndex, setExpandedIndex] = useState<number | null>(null); 

    const handleToggle = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index); 
        const element = document.getElementById(`exp-${index}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

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

    const expandVariants:Variants = {
        collapsed: { height: 'auto', opacity: 1 },
        expanded: { 
            height: 'auto', 
            opacity: 1, 
            transition: { duration: 0.4, ease: 'easeInOut' }
        }
    };

    return (
        <section id={ID} className="w-full relative py-20 lg:py-32 overflow-hidden"> 
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-blue-900/70 to-purple-900/80 dark:from-indigo-900/90 dark:via-blue-900/80 dark:to-purple-900/90" />
            <div className="absolute inset-0 bg-gradient-to-tl from-indigo-500/20 via-transparent to-blue-500/20" /> 
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50/90 to-white/90 dark:hidden" />

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
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-indigo-400 to-blue-400 h-full opacity-60 dark:opacity-80 z-0" /> {/* Linha conectando nós */}

                    {experienciaArray.map((exp, index) => {
                        const isExpanded = expandedIndex === index;
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
                                    className="flex flex-col items-center lg:w-1/3 text-center lg:text-left bg-gray-900/80 dark:bg-gray-900/90 backdrop-blur-md rounded-xl p-6 border border-indigo-500/30 dark:border-indigo-400/30 shadow-xl hover:shadow-indigo-500/25 transition-all duration-300" // Glass card pro
                                >
                                    <div className="absolute -left-2.5 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-indigo-500 rounded-full shadow-lg z-20" /> 
                                    
                                    <Briefcase size={32} className="text-indigo-400 mb-4" /> 
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-bold text-white dark:text-white">{exp?.empresa || experienciaArray[index].empresa}</h3> 
                                        <div className="flex items-center text-sm text-gray-300 dark:text-gray-300">
                                            <Calendar size={16} className="mr-1 text-indigo-400" />
                                            {experienciaArray[index].mes} 
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    variants={expandVariants}
                                    initial="collapsed"
                                    animate={isExpanded ? "expanded" : "collapsed"}
                                    className={`lg:w-2/3 transition-all duration-500 overflow-hidden ${
                                        isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    }`} 
                                >
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="bg-white/10 dark:bg-white/20 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-2xl" 
                                        >
                                            <CardExp 
                                                titulo={exp.titulo} 
                                                data={exp.mes} 
                                                empresa={exp?.empresa || experienciaArray[index]?.empresa}
                                                descricao={exp.paragrafo}
                                            />
                                        </motion.div>
                                    )}
                                </motion.div>

                                <motion.button
                                    onClick={() => handleToggle(index)}
                                    whileHover={{ scale: 1.1 }}
                                    className={`absolute -top-4 left-1/2 transform -translate-x-1/2 p-2 bg-indigo-500/80 rounded-full shadow-lg z-30 ${
                                        isExpanded ? 'rotate-180' : ''
                                    } transition-transform duration-300`} 
                                    aria-expanded={isExpanded}
                                    aria-controls={`exp-${index}`}
                                >
                                    <ChevronDown size={20} className="text-white" />
                                </motion.button>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
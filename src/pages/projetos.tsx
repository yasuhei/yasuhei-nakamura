import { motion } from "framer-motion"; 
import { Title } from "../components/title";
import { useLanguage } from "../context/navegadorContext"; 
import { projBr, projEn } from "../Utils/translate";
import { Github, ExternalLink, Filter } from "lucide-react";
import Img from '../img/image.png';
import Img3 from '../img/OIP.jpeg';
import Planner from '../img/planner.jpg';
import Tiao from '../img/tiao.jpg';

import { useState, useMemo } from "react"; 

export function Projetos() {
    const language = useLanguage();
    const id = language === 'pt-BR' ? "projetos" : "projects";
    const projetosArray = language === 'pt-BR' ? projBr : projEn; 

    const projectsData = useMemo(() => [ 
        {
            img: Img,
            descricao: 'Shuey Burguer',
            texto: projetosArray[0]?.paragrafo || '',
            linkGit: 'https://github.com/yasuhei/shueyBurger',
            linkDemo: '', 
            category: 'frontend', 
            techs: ['React', 'CSS'],
        },
        {
            img: Img3,
            descricao: 'Rick and Morty',
            texto: projetosArray[1]?.paragrafo || '',
            linkGit: 'https://github.com/yasuhei/RickAndMorty',
            linkDemo: '',
            category: 'frontend',
            techs: ['React', 'API'],
        },
        {
            img: Planner,
            descricao: 'NLW Journey',
            texto: projetosArray[2]?.paragrafo || '',
            linkGit: 'https://github.com/yasuhei/projeto-fullstack',
            linkDemo: '',
            category: 'fullstack',
            techs: ['React', 'Node.js', 'MongoDB'],
        },
        {
            img: Tiao,
            descricao: 'Tião Carreiro',
            texto: projetosArray[3]?.paragrafo || '',
            linkGit: 'https://github.com/yasuhei/tiaoRepo',
            linkDemo: '',
            category: 'fullstack',
            techs: ['Angular', 'Firebase'],
        },
    ], [projetosArray]); 

    const [filter, setFilter] = useState('all');
    const filterLabels = language === 'pt-BR' 
        ? { all: 'Todos', frontend: 'Frontend', fullstack: 'Full-Stack' }
        : { all: 'All', frontend: 'Frontend', fullstack: 'Full-Stack' };

    const filteredProjects = useMemo(() => {
        return filter === 'all' 
            ? projectsData 
            : projectsData.filter(p => p.category === filter);
    }, [filter, projectsData]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            transition: { duration: 0.5, ease: 'easeOut' }
        }
    };

    return (
        <section id={id} className="w-full relative py-20 lg:py-32 overflow-hidden"> 
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-blue-900/70 to-purple-900/80 dark:from-indigo-900/90 dark:via-blue-900/80 dark:to-purple-900/90" />
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,_transparent_30%,_rgba(99,102,241,0.1)_30%,_rgba(99,102,241,0.1)_40%,_transparent_40%),linear-gradient(-45deg,_transparent_30%,_rgba(99,102,241,0.1)_30%,_rgba(99,102,241,0.1)_40%,_transparent_40%)] bg-[length:40px_40px]" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50/90 to-white/90 dark:hidden" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <Title title={id} className="text-3xl lg:text-4xl font-black text-gray-900 dark:text-white tracking-tight" />
                </motion.div>

                <div className="flex justify-center mb-12 gap-4 flex-wrap">
                    {Object.entries(filterLabels).map(([key, label]) => (
                        <motion.button
                            key={key}
                            onClick={() => setFilter(key)}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                                filter === key
                                    ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                                    : 'bg-white/10 dark:bg-white/20 text-gray-300 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-white/30 border border-white/20'
                            }`}
                        >
                            <Filter size={16} />
                            {label}
                        </motion.button>
                    ))}
                </div>

                <motion.div
                    key={filter} 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ margin: "-100px 0px" }} 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
                >
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={`${project.descricao}-${index}`} 
                            variants={cardVariants}
                            whileHover={{ 
                                scale: 1.02, 
                                y: -10, 
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' 
                            }}
                            className="group relative overflow-hidden rounded-2xl bg-gray-900/80 dark:bg-gray-900/90 backdrop-blur-md border border-indigo-500/30 dark:border-indigo-400/30 shadow-xl hover:shadow-indigo-500/25 transition-all duration-500 h-auto" // h-auto para variar heights
                        >
                            <div className="relative">
                                <img 
                                    src={project.img} 
                                    alt={`${project.descricao} - Projeto de ${project.category}`}
                                    className="w-full h-48 lg:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileHover={{ opacity: 1, y: 0 }}
                                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4"
                                >
                                    <div className="flex gap-4">
                                        <a 
                                            href={project.linkGit} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="p-3 bg-indigo-500/80 rounded-full text-white hover:bg-indigo-400 transition-all"
                                            aria-label={`Ver código no GitHub de ${project.descricao}`}
                                        >
                                            <Github size={20} />
                                        </a>
                                        {project.linkDemo && (
                                            <a 
                                                href={project.linkDemo} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="p-3 bg-white/20 rounded-full text-white hover:bg-white/30 transition-all"
                                                aria-label={`Ver demo de ${project.descricao}`}
                                            >
                                                <ExternalLink size={20} />
                                            </a>
                                        )}
                                    </div>
                                </motion.div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold text-white mb-2">{project.descricao}</h3>
                                <p className="text-gray-300 dark:text-gray-300 mb-4 leading-relaxed">{project.texto}</p>
                                
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.techs.map((tech, i) => (
                                        <span 
                                            key={i} 
                                            className="px-3 py-1 bg-indigo-500/20 text-indigo-200 rounded-full text-sm font-medium"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {filteredProjects.length === 0 && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-center text-gray-400 dark:text-gray-500 mt-8 col-span-full"
                    >
                        {language === 'pt-BR' ? 'Nenhum projeto nesta categoria.' : 'No projects in this category.'}
                    </motion.p>
                )}
            </div>
        </section>
    );
}
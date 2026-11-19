import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { Title } from "../components/title";
import { useLanguage } from "../context/navegadorContext"; 
import { projBr, projEn } from "../Utils/translate";
import { Github, ExternalLink, Filter } from "lucide-react";
import Img from '../img/image.png';
import Img3 from '../img/OIP.jpeg';
import Planner from '../img/planner.jpg';
import Tiao from '../img/tiao.jpg';
import ArenaFC from '../img/arena-fc.jpeg';

import { useState, useMemo, useRef, type FocusEvent, type PointerEvent } from "react";
import "./projectCards.css";

export function Projetos() {
    const language = useLanguage();
    const isPortuguese = language === 'pt-BR';
    const reducedMotion = useReducedMotion();
    const id = language === 'pt-BR' ? "projetos" : "projects";
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress: sectionScrollProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });
    const showcaseParallax = useTransform(sectionScrollProgress, [0, 1], reducedMotion ? [0, 0] : [18, -18]);
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
        {
            img: ArenaFC,
            descricao: 'Sem Panela FC',
            texto: projetosArray[4]?.paragrafo || '',
            linkGit: 'https://github.com/yasuhei/arena-fc',
            linkDemo: 'https://sem-panela-fc.vercel.app/',
            category: 'frontend',
            techs: ['React', 'TypeScript', 'Tailwind', 'Node.js', 'PostgreSQL'],
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

    const scanCard = (card: HTMLElement) => {
        if (reducedMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const beam = card.querySelector('.project-card-beam');
        if (!beam) return;
        gsap.fromTo(beam, { xPercent: 0, opacity: 0.85 }, {
            xPercent: 610,
            opacity: 0,
            duration: 0.72,
            ease: 'power2.out',
            overwrite: true,
        });
    };

    const handlePointerEnter = (event: PointerEvent<HTMLElement>) => {
        if (event.pointerType === 'mouse') scanCard(event.currentTarget);
    };

    const handleFocus = (event: FocusEvent<HTMLElement>) => {
        if (event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget)) return;
        if (event.target instanceof HTMLElement && event.target.matches(':focus-visible')) scanCard(event.currentTarget);
    };

    return (
        <section ref={sectionRef} id={id} className="w-full relative py-20 lg:py-32 overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <motion.div
                    initial={reducedMotion ? false : { opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <Title title={id} />
                </motion.div>

                <div className="flex justify-center mb-12 gap-4 flex-wrap">
                    {Object.entries(filterLabels).map(([key, label]) => (
                        <motion.button
                            key={key}
                            type="button"
                            aria-pressed={filter === key}
                            onClick={() => setFilter(key)}
                            whileHover={reducedMotion ? undefined : { scale: 1.05, y: -2 }}
                            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                                filter === key
                                    ? 'bg-amber-300 text-slate-900 shadow-lg shadow-amber-500/20'
                                    : 'bg-slate-900/60 text-slate-200 hover:bg-slate-800/70 border border-amber-200/20'
                            }`}
                        >
                            <Filter size={16} />
                            {label}
                        </motion.button>
                    ))}
                </div>

                <motion.div style={{ y: showcaseParallax }} className="project-showcase">
                    <AnimatePresence initial={false} mode="popLayout">
                        {filteredProjects.map((project) => (
                        <motion.article
                            key={project.linkGit}
                            layout={reducedMotion ? false : 'position'}
                            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            exit={reducedMotion ? undefined : { opacity: 0, y: 8 }}
                            transition={{ duration: reducedMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1], layout: { duration: 0.32 } }}
                            onPointerEnter={handlePointerEnter}
                            onFocus={handleFocus}
                            className="project-card"
                        >
                            <div className="project-card-media">
                                <img 
                                    src={project.img} 
                                    alt=""
                                    className="project-card-image"
                                    loading="lazy"
                                />
                                <span className="project-card-beam" aria-hidden="true" />
                                <span className="project-card-category">
                                    {project.category === 'frontend' ? filterLabels.frontend : filterLabels.fullstack}
                                </span>
                            </div>

                            <div className="project-card-body">
                                <h3 className="project-card-title">{project.descricao}</h3>
                                <p className="project-card-description text-slate-200 mb-4 leading-relaxed">{project.texto}</p>

                                <ul className="flex flex-wrap gap-2 mb-5">
                                    {project.techs.map((tech) => (
                                        <li key={tech} className="px-3 py-1 bg-amber-300/15 text-amber-100 rounded-full text-sm font-medium border border-amber-200/20">
                                            {tech}
                                        </li>
                                        ))}
                                </ul>

                                    <div className="project-card-actions">
                                        <a 
                                            href={project.linkGit} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            aria-label={isPortuguese ? `Ver código no GitHub de ${project.descricao}` : `View ${project.descricao} source on GitHub`}
                                        >
                                            <Github size={16} aria-hidden="true" /> GitHub
                                        </a>
                                        {project.linkDemo && (
                                            <a 
                                                href={project.linkDemo} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                aria-label={isPortuguese ? `Ver demo de ${project.descricao}` : `View the ${project.descricao} demo`}
                                            >
                                                <ExternalLink size={16} aria-hidden="true" /> Demo
                                            </a>
                                        )}
                                    </div>
                            </div>
                        </motion.article>
                    ))}
                    </AnimatePresence>
                </motion.div>

                {filteredProjects.length === 0 && (
                    <motion.p
                        initial={reducedMotion ? false : { opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-center text-slate-300 mt-8 col-span-full"
                    >
                        {language === 'pt-BR' ? 'Nenhum projeto nesta categoria.' : 'No projects in this category.'}
                    </motion.p>
                )}
            </div>
        </section>
    );
}
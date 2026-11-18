import { useLayoutEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ArrowDown, Code2, Github, GraduationCap, Layers, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '../context/navegadorContext';
import Selfie from '../assets/vice-city-character.png';
import { sobreBr, sobreEn } from '../Utils/translate';
import './sobre.css';

gsap.registerPlugin(ScrollTrigger);

const chapterIcons = [Code2, Layers, GraduationCap];
const socials = [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/yasuhei-nakamura-9aa80a93/', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/yasuhei', label: 'GitHub' },
    { icon: Mail, href: 'mailto:yasuhei.nakamura@hotmail.com', label: 'E-mail' },
];

export function Sobre() {
    const isPortuguese = useLanguage() === 'pt-BR';
    const { titulo, chamada, paragrafo, tituloJornada, jornada, retratoAlt } = isPortuguese ? sobreBr : sobreEn;
    const id = isPortuguese ? 'sobre' : 'about';
    const timelineRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const reducedMotion = useReducedMotion();

    useLayoutEffect(() => {
        const timeline = timelineRef.current;
        const line = lineRef.current;
        if (!timeline || !line) return;

        const media = gsap.matchMedia();
        media.add('(prefers-reduced-motion: no-preference)', () => {
            gsap.from(line, {
                scaleY: 0,
                ease: 'none',
                scrollTrigger: { trigger: timeline, start: 'top 80%', end: 'bottom 60%', scrub: true },
            });
        });
        return () => media.revert();
    }, []);

    return (
        <section id={id} aria-labelledby={`${id}-title`} className="w-full py-20 lg:py-32">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="about-profile">
                    <figure className="about-profile-portrait">
                        <img src={Selfie} alt={retratoAlt} loading="lazy" />
                        <figcaption className="about-profile-caption">
                            <span className="about-kicker">VICE CITY // {isPortuguese ? 'PERFIL' : 'PROFILE'}</span>
                            <span>Yasuhei Nakamura</span>
                        </figcaption>
                    </figure>

                    <div className="about-profile-body">
                        <h2 id={`${id}-title`} className="about-kicker">{titulo}</h2>
                        <p className="about-profile-headline">{chamada}</p>
                        <p className="about-profile-summary">{paragrafo}</p>
                        <ul className="about-profile-links">
                            {socials.map(({ icon: Icon, href, label }) => (
                                <li key={label}>
                                    <a href={href} target={label === 'E-mail' ? undefined : '_blank'} rel="noopener noreferrer">
                                        <Icon size={16} aria-hidden="true" />
                                        {label}
                                        <ArrowUpRight size={13} aria-hidden="true" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="about-journey" role="region" aria-labelledby={`${id}-journey`}>
                    <div className="about-journey-heading">
                        <h3 id={`${id}-journey`} className="terminal-heading">{tituloJornada}</h3>
                        <ArrowDown size={20} aria-hidden="true" />
                    </div>
                    <div ref={timelineRef} className="about-journey-track">
                        <div ref={lineRef} className="about-journey-progress" aria-hidden="true" />
                        <ol className="about-journey-list">
                            {jornada.map(({ marco, titulo, texto }, index) => {
                                const Icon = chapterIcons[index];
                                return (
                                    <li key={marco} className="about-journey-step">
                                        <motion.span
                                            className="about-journey-marker"
                                            aria-hidden="true"
                                            initial={false}
                                            whileInView={reducedMotion ? undefined : { scale: [1, 1.16, 1], boxShadow: ['0 0 0px #69e3e200', '0 0 18px #69e3e280', '0 0 0px #69e3e200'] }}
                                            viewport={{ once: true, amount: 0.8 }}
                                            transition={{ duration: 0.55 }}
                                        >
                                            <Icon size={19} />
                                        </motion.span>
                                        <div className="about-journey-card">
                                            <p className="about-kicker">{marco}</p>
                                            <h4>{titulo}</h4>
                                            <p>{texto}</p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    );
}

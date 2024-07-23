import { useState } from "react";

export function Header() {
    const [activeLink, setActiveLink] = useState('');
    const [modalOpen, setModalOpen] = useState(false)

    const handleClick = (link: string) => {
        setActiveLink(link);
        setModalOpen(false)

        const element = document.getElementById(link);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    const openModal = (value: boolean) => {
        setModalOpen(value)
    }





    return (    
<header className="w-full pb-8">
    <div className="  sm:px-4 sm:py-2 md:px-8 md:w-full  md:py-4 text-center">
        <div className="md:mr-4 flex justify-between items-center p-3 ">
            <a href="/" className="text-indigo-500 font-sans sm:text-base md:text-2xl font-bold">
                {"</"} <span className="text-slate-300 font-serif"> Yasuhei Nakamura </span> {" />"}
            </a>
            <ul className="hidden sm:flex justify-around text-center items-center gap-6">
                <li className={`text-slate-100  font-medium hover:text-indigo-500 ${activeLink === 'sobre' ? 'text-indigo-500' : ''}`}>
                    <a href="#sobre" onClick={() => handleClick('sobre')}>Sobre</a>
                </li>
                <li className={`text-slate-100 font-medium hover:text-indigo-500 ${activeLink === 'skills' ? 'text-indigo-500' : ''}`}>
                    <a href="#skills" onClick={() => handleClick('skills')}>Skills</a>
                </li>
                <li className={`text-slate-100 font-medium hover:text-indigo-500 ${activeLink === 'projetos' ? 'text-indigo-500' : ''}`}>
                    <a href="#projetos" onClick={() => handleClick('projetos')}>Projetos</a>
                </li>
                <li className={`text-slate-100 font-medium hover:text-indigo-500 ${activeLink === 'experiencia' ? 'text-indigo-500' : ''}`}>
                    <a href="#experiencia" onClick={() => handleClick('experiencia')}>Experiencia</a>
                </li>
                <li className={`text-slate-100 font-medium hover:text-indigo-500 ${activeLink === 'contato' ? 'text-indigo-500' : ''}`}>
                    <a href="#contato" onClick={() => handleClick('contato')}>Contato</a>
                </li>
            </ul>
            <div className="sm:hidden" onClick={() => openModal(!modalOpen)}>
                <button className="text-indigo-500 focus:outline-none">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
        </div>

        {modalOpen === true && (
            <>
        <ul className="sm:hidden flex flex-col mt-4 space-y-2 mr-4 items-end absolute z-40 bg-black w-full opacity-90 h-full pr-4">
            <li className={`text-slate-100 font-medium hover:text-indigo-500 ${activeLink === 'sobre' ? 'text-indigo-500' : ''}`}>
                <a href="#sobre" onClick={() => handleClick('sobre')}>Sobre</a>
            </li>
            <li className={`text-slate-100 font-medium hover:text-indigo-500 ${activeLink === 'skills' ? 'text-indigo-500' : ''}`}>
                <a href="#skills" onClick={() => handleClick('skills')}>Skills</a>
            </li>
            <li className={`text-slate-100 font-medium hover:text-indigo-500 ${activeLink === 'projetos' ? 'text-indigo-500' : ''}`}>
                <a href="#projetos" onClick={() => handleClick('projetos')}>Projetos</a>
            </li>
            <li className={`text-slate-100 font-medium hover:text-indigo-500 ${activeLink === 'experiencia' ? 'text-indigo-500' : ''}`}>
                    <a href="#experiencia" onClick={() => handleClick('experiencia')}>Experiencia</a>
                </li>
            <li className={`text-slate-100 font-medium hover:text-indigo-500 ${activeLink === 'contato' ? 'text-indigo-500' : ''}`}>
                <a href="#contato" onClick={() => handleClick('contato')}>Contato</a>
            </li>
        </ul>
            
            </>
        )}
    </div>
</header>

    )
}
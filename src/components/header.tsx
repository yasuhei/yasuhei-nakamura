import { useState } from "react";

export function Header() {
    const [activeLink, setActiveLink] = useState('');

    const handleClick = (link: string) => {
        console.log(link)
        setActiveLink(link);

        const element = document.getElementById(link);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
    return (    
        <header className="w-full pb-16">
        <div className=" w-full h-7 flex justify-between text-center items-center py-7" >
            <a href="/" className="text-indigo-500 font-sans text-2xl font-bold ">
                {"</"} <span className="text-slate-300 font-serif"> Yasuhei Nakamura </span> {" />"}
            </a>
            <ul className="flex justify-around text-center items-center gap-6">
                <li className={`text-slate-100 font- hover:text-indigo-500 ${activeLink === 'sobre' ? 'text-indigo-500' : ''}`}>
                    <a href="#sobre" onClick={() => handleClick('sobre')}>Sobre</a>
                </li>
                <li className={`text-slate-100 font- hover:text-indigo-500 ${activeLink === 'skills' ? 'text-indigo-500' : ''}`}>
                    <a href="#skills" onClick={() => handleClick('skills')}>Skills</a>
                </li>
                <li className={`text-slate-100 font- hover:text-indigo-500 ${activeLink === 'projetos' ? 'text-indigo-500' : ''}`}>
                    <a href="#projetos" onClick={() => handleClick('projetos')}>Projetos</a>
                </li>
                <li className={`text-slate-100 font- hover:text-indigo-500 ${activeLink === 'contato' ? 'text-indigo-500' : ''}`}>
                    <a href="#contato" onClick={() => handleClick('contato')}>Contato</a>
                </li>
            </ul>
        </div>
    </header>
    )
}
import { useState } from "react";
import { useLanguage } from "../context/navegadorContext";
import { idiomaBr, idiomaEn } from "../Utils/translate";

export function Header() {
    const [activeLink, setActiveLink] = useState('');
    const [modalOpen, setModalOpen] = useState(false)
    const language = useLanguage();
    const languageArray = language === 'pt-BR' ? idiomaBr : idiomaEn;


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
            <div className="px-4 py-2 lg:px-8 lg:w-full lg:py-4 text-center">
                <div className="lg:mr-4 flex justify-between items-center p-3">
                    <a href="#" className="text-indigo-500 font-sans sm:text-base lg:text-2xl font-bold">
                        {"</"} <span className="text-slate-300 font-serif"> Yasuhei Nakamura </span> {" />"}
                    </a>
                    <ul className="hidden lg:flex justify-around text-center items-center gap-6">
                        {languageArray.map((item, index) => (
                            <li key={index} className={`text-slate-100 font-medium hover:text-indigo-500 ${activeLink.toLowerCase() === item.toLowerCase() ? 'text-indigo-500' : ''}`}>
                                <a href={`#${item.toLowerCase()}`} onClick={() => handleClick(item.toLowerCase())}>{item}</a>
                            </li>
                        ))}
                    </ul>
                    <div className="lg:hidden" onClick={() => openModal(!modalOpen)}>
                        <button className="text-indigo-500 focus:outline-none">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                {modalOpen && (
                    <ul className="lg:hidden flex flex-col mt-4 space-y-2 mr-4 items-center absolute z-40 bg-black w-full opacity-95 h-full pr-4">
                        {languageArray.map((item, index) => (
                            <li key={index} className={`text-slate-100 font-medium py-6 hover:text-indigo-500 ${activeLink.toLowerCase() === item.toLowerCase() ? 'text-indigo-500' : ''}`}>
                                <a href={`#${item.toLowerCase()}`} onClick={() => handleClick(item.toLowerCase())}>{item}</a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </header>
    );
}
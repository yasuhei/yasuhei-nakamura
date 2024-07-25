import { Mail, Github, LinkedinIcon } from 'lucide-react';
import { Title } from "../components/title";
import { useLanguage } from '../context/navegadorContext';
import { footerBr, footerEn } from '../Utils/translate';

export function Footer() {
    const language = useLanguage();
    const experienciaText = language === 'pt-BR' ? footerBr : footerEn;

    const id = language === 'pt-BR' ? "contato" : "contact";
    
    return(
        <div className="pt-6 flex justify-center items-center w-full flex-col" id={id}>
            <Title title={id}/>
            <ul className=' gap-11 py-8 flex justify-center items-center flex-col md:flex-row  '>
                        <li>
                            <a className='flex justify-center items-center w-full gap-2 text-center' href="mailto:yasuhei.nakamura@hotmail.com" target='_blank'><Mail className='text-indigo-500 hover:text-indigo-900 transition duration-300 ease-in-out'/> yasuhei.nakamura@hotmail.com </a>
                        </li>
                        <li>
                            <a className='flex justify-center items-center w-full gap-2 text-center' href="https://github.com/yasuhei" target='_blank'> < Github className='text-indigo-500 hover:text-indigo-900 transition duration-300 ease-in-out'/> Github </a>
                        </li>
                        <li>
                         <a className='flex justify-center items-center w-full gap-2 text-center' href="https://www.linkedin.com/in/yasuhei-nakamura-9aa80a93/" target='_blank'> <LinkedinIcon className='text-indigo-500 hover:text-indigo-900 transition duration-300 ease-in-out' /> LinkedIn</a>
                        </li>
                    </ul>
            <footer className="flex justify-center items-center py-8 w-full bg-zinc-900">
                <p className="font-bold text-sm lg:text-lg">{experienciaText}</p>
            </footer>
        </div>
    )
}
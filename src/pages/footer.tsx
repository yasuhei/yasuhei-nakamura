import { Mail, Github, LinkedinIcon } from 'lucide-react';
import { Title } from "../components/title";

export function Footer() {
    const title = "Contato"
    return(
        <div className="pt-6 flex justify-center items-center w-full flex-col" id="contato">
            <Title title={title}/>
            <ul className=' gap-11 py-8 flex justify-center items-center flex-col md:flex-row  '>
                        <li>
                            <a className='flex justify-center items-center w-full gap-2 text-center' href="mailto:yasuhei.nakamura@hotmail.com"><Mail className='text-indigo-500 hover:text-indigo-900 transition duration-300 ease-in-out'/> yasuhei.nakamura@hotmail.com </a>
                        </li>
                        <li>
                            <a className='flex justify-center items-center w-full gap-2 text-center' href="https://github.com/yasuhei"> < Github className='text-indigo-500 hover:text-indigo-900 transition duration-300 ease-in-out'/> Github </a>
                        </li>
                        <li>
                         <a className='flex justify-center items-center w-full gap-2 text-center' href="https://www.linkedin.com/in/yasuhei-nakamura-9aa80a93/"> <LinkedinIcon className='text-indigo-500 hover:text-indigo-900 transition duration-300 ease-in-out' /> LinkedIn</a>
                        </li>
                    </ul>
            <footer className="flex justify-center items-center py-8 w-full bg-zinc-900">
                <p className="font-bold text-sm lg:text-lg"> Copyright © 2024 Todos os direitos reservados.</p>
            </footer>
        </div>
    )
}
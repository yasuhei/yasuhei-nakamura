import { Title } from '../components/title'
import { useLanguage } from '../context/navegadorContext';
import Selfie from '../img/67479901.jpeg'
import { Mail, Github ,LinkedinIcon   } from 'lucide-react' 
import { sobreBr, sobreEn } from '../Utils/translate';


export function Sobre() {
    const language = useLanguage();
    const languageArray = language === 'pt-BR' ? sobreBr : sobreEn;

    const { titulo, paragrafo } = languageArray[0];
    const sectionOne = language === 'pt-BR' ? "Sobre" : "About";
    const id = language === 'pt-BR' ? "sobre" : "about";


    return(
        <section id={id} className='w-full'>
            <div className=' bg-image bg-contain bg-repeat-x bg-center-bottom   flex justify-center items-end   lg:h-32'>
            <Title title={sectionOne}/>
            </div>
            <div className="bg-zinc-900 flex lg:flex-row justify-around items-center pt-9 w-full px-[5%] flex-col">
                <div className='flex min-w-48 min-h-48 max-w-96  justify-center flex-col items-center'>
                    <img src={Selfie} alt="foto do Yasuhei" className='h-48 border-4 file:border-solid border-indigo-900 rounded-full'  />
                    <h3 className='font-serif pt-4 '>Yasuhei Nakamura</h3>
                    <ul className='flex gap-11 pt-4'>
                        <li>
                            <a href="mailto:yasuhei.nakamura@hotmail.com"><Mail className='text-indigo-500 hover:text-indigo-900 transition duration-300 ease-in-out'/> </a>
                        </li>
                        <li>
                            <a href="https://github.com/yasuhei"> < Github className='text-indigo-500 hover:text-indigo-900 transition duration-300 ease-in-out'/> </a>
                        </li>
                        <li>
                         <a href="https://www.linkedin.com/in/yasuhei-nakamura-9aa80a93/"> <LinkedinIcon className='text-indigo-500 hover:text-indigo-900 transition duration-300 ease-in-out' /></a>
                        </li>
                    </ul>
                </div>
                <div className='flex justify-around flex-col text-center pt-4 md:w-[620px]'>
                <h2 className="uppercase text-lg pb-4 font-bold "> {titulo} </h2>
                <p className=''>{paragrafo} </p>
                </div>
            </div>

            <div className=' bg-imageBottom bg-contain bg-repeat-x bg-center-bottom h-32 flex justify-center items-end uppercase text-2xl'>
            </div>
        </section>
        
    )
}
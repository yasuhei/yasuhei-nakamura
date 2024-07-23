import { Title } from '../components/title'
import Selfie from '../img/67479901.jpeg'
import { Mail, Github ,LinkedinIcon   } from 'lucide-react' 


export function Sobre() {
    const sectionOne = "Sobre";

    return(
        <section id="sobre" className='w-full'>
            <div className=' bg-image bg-contain bg-repeat-x bg-center-bottom h-32 flex justify-center items-end '>
            <Title title={sectionOne}/>
            </div>
            <div className="bg-zinc-900 flex justify-around items-center pt-9 w-full px-[5%] ">
                <div className='flex min-w-48 min-h-48 max-w-96  justify-center flex-col items-center'>
                    <img src={Selfie} alt="" className='w-full h-[200px] border-4 file:border-solid border-indigo-900 rounded-full'  />
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
                <div className='flex justify-around flex-col w-[620px]'>
                <h2 className="uppercase text-lg pb-4 font-bold"> conheça um pouco sobre mim</h2>
                <p className=''>Olá, sou formado em Engenharia de Produção e tenho 33 anos. Desde 2019, tenho me dedicado à área de programação, inicialmente como desenvolvedor frontend. Em 2024, dei um passo significativo na minha carreira e me tornei desenvolvedor full-stack, utilizando tecnologias de ponta como React.js, Angular 8+ e NestJS. Atualmente, estou focado em aprofundar meus conhecimentos em backend, buscando sempre evolução e excelência no que faço. </p>
                </div>
            </div>

            <div className=' bg-imageBottom bg-contain bg-repeat-x bg-center-bottom h-32 flex justify-center items-end uppercase text-2xl'>
            </div>
        </section>
        
    )
}
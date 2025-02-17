import { bodyBr, bodyEn } from '../Utils/translate';
import Image from '../assets/SVG PROGRAMADOR 04.svg';
import pdf from '../assets/pdf/Yasuhei_Nakamura.pdf';
import pdfEn from '../assets/pdf/Yasuhei_Nakamura_-_FEng.pdf';
import { useLanguage } from '../context/navegadorContext';

export function Body() {
    const language = useLanguage();
    const languageArray = language === 'pt-BR' ? bodyBr : bodyEn;
    const curric = language === 'pt-BR' ? pdf : pdfEn;

    const { titulo, paragrafo, paragrafo2, curriculo } = languageArray[0];

    return (
        <main className='w-full'>
        <div className="flex items-center justify-center  bg-gradient-custom bg-custom-radial relative">
            <div className="py-8 w-full pl-[3%] lg:pl-0">
                <span className="sm:text-lg md:text-xl font-bold mb-4 text-indigo-500 uppercase font-serif" title={titulo}>{titulo}</span>
                <h1 className="text-xl lg:text-3xl pb-3" title='Yasuhei Nakamura'>Yasuhei Nakamura</h1>
                <p className="text-sm lg:text-xl max-w-md mb-4 font-sans" title={paragrafo}>{paragrafo} <br />
                    {paragrafo2}
                </p>

                <a href={curric} download="yasuheiFrontend.pdf" className="inline-block px-6 py-3 mt-2 lg:mt-0 border-2 border-indigo-500 text-indigo-500 hover:border-indigo-950 hover:opacity-95 hover:text-indigo-950 transition duration-300 ease-in-out sm:mt-4">
                    {curriculo}
                </a>
            </div>

            <div className="w-full sm:block hidden md:w-1/3  mt-8">
                <img src={Image} alt="imagem ilustrativa de um programador" className="w-full" />
            </div>
        </div>
        </main>
    );
}

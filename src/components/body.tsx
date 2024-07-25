import { bodyBr, bodyEn } from '../Utils/translate';
import Image from '../assets/SVG PROGRAMADOR 04.svg';
import pdf from '../assets/pdf/Yasuhei_Nakamura.pdf';
import { useLanguage } from '../context/navegadorContext';

export function Body() {
    const language = useLanguage();
    const languageArray = language === 'pt-BR' ? bodyBr : bodyEn;

    const { titulo, paragrafo, paragrafo2, curriculo } = languageArray[0];

    return (
        <div className="flex items-center justify-center w-full bg-gradient-custom bg-custom-radial relative">
            <div className="max-w-3xl mx-auto px-4 py-8">
                <span className="sm:text-lg md:text-xl font-bold mb-4 text-indigo-500 uppercase font-serif">{titulo}</span>
                <h1 className="text-xl lg:text-3xl pb-3">Yasuhei Nakamura</h1>
                <p className="text-sm lg:text-2xl max-w-md mb-4">{paragrafo} <br />
                    {paragrafo2}
                </p>

                <a href={pdf} download="yasuheiFrontend.pdf" className="inline-block px-6 py-3 mt-2 lg:mt-0 border-2 border-indigo-500 text-indigo-500 hover:border-indigo-950 hover:opacity-95 hover:text-indigo-950 transition duration-300 ease-in-out sm:mt-4">
                    {curriculo}
                </a>
            </div>

            <div className="w-full sm:block hidden md:w-1/3  mt-8">
                <img src={Image} alt="imagem ilustrativa de um programador" className="w-full" />
            </div>
        </div>
    );
}

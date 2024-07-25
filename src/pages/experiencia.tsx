import { useState } from "react"
import { Title } from "../components/title"
import { CardExp } from "../components/cardExperiencia"
import { useLanguage } from "../context/navegadorContext";
import { expBr, expEn } from "../Utils/translate";

export function Experiencia() {
    const language = useLanguage();

    const experienciaArray = language === 'pt-BR' ? expBr : expEn;
    const ID = language === 'pt-BR' ? "experiência" : "experience";

    const [textoSelecionado, SetTextoSelecionado] = useState('1')

    const handleClick = (id: string) => {
        SetTextoSelecionado(id);

    }

    return (
        <div className="pt-6 flex justify-center items-center w-full flex-col lg:bg-zinc-900 bg-zinc-950 " id={ID}>
            <div className="pb-10">
                <Title title={ID} />
            </div>

            <div className="flex gap-10 justify-center  flex-col lg:flex-row ">
                <div className="flex flex-col h-64 bg-zinc-950 lg:w-max-[42%] shadow-shape">
                    <div className={`px-5 py-5 cursor-pointer shadow-shape ${textoSelecionado === '1' ? 'border-l-2 border-indigo-900 text-indigo-900' : ''}`} onClick={() => handleClick('1')}>
                        <h3>7COMm - People and tech to transform</h3>
                    </div>
                    <div className={`px-5 py-5 cursor-pointer shadow-shape ${textoSelecionado === '2' ? 'border-l-2 border-indigo-900 text-indigo-900' : ''}`} onClick={() => handleClick('2')}>
                        <h3>Indorama Brasil</h3>
                    </div>
                    <div className={`px-5 py-5 cursor-pointer shadow-shape ${textoSelecionado === '3' ? 'border-l-2 border-indigo-900 text-indigo-900' : ''}`} onClick={() => handleClick('3')}>
                        <h3>Oráculo Meteorologia</h3>
                    </div>
                    <div className={`px-5 py-5 cursor-pointer shadow-shape ${textoSelecionado === '4' ? 'border-l-2 border-indigo-900 text-indigo-900' : ''}`} onClick={() => handleClick('4')}>
                        <h3>Hausz - Pisos e Ambientes</h3>
                    </div>
                </div>

                <div className="lg:w-[55%]">
                    {textoSelecionado && (
                        <div>
                            {textoSelecionado === '1' && (
                                <>
                                    <CardExp titulo={experienciaArray[0].titulo} data={experienciaArray[0].mes} empresa={'7COMm - People and tech to transform'} descricao={experienciaArray[0].paragrafo} />
                                </>
                            )}
                            {textoSelecionado === '2' && (
                                <>
                                    <CardExp titulo={experienciaArray[1].titulo} data={experienciaArray[1].mes} empresa={'Indorama Brasil'} descricao={experienciaArray[1].paragrafo} />
                                </>

                            )}
                            {textoSelecionado === '3' && (
                                <>
                                    <CardExp titulo={experienciaArray[2].titulo} data={experienciaArray[2].mes} empresa={'Oráculo Meteorologia'} descricao={experienciaArray[2].paragrafo} />
                                </>
                            )}
                            {textoSelecionado === '4' && (
                                <>
                                    <CardExp titulo={experienciaArray[3].titulo} data={experienciaArray[3].mes} empresa={'Hausz - Pisos e Ambientes'} descricao={experienciaArray[3].paragrafo} />
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>


        </div>
    )
}
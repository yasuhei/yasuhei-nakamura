import { useLanguage } from "../context/navegadorContext";

interface ICardProps {
titulo: string;
data: string;
empresa: string;
descricao: string
}


export function CardExp({ titulo, data, empresa, descricao}: ICardProps) {
    const language = useLanguage();
    const title = language === 'pt-BR' ? "Cargo" : "Position";


    return(
        <>
         <div className="flex items-center justify-between text-center  px-3 lg:px-0 flex-col ">
            <span className="text-[10px] text-start w-full" title={title}>{title}</span>
            <div className="flex items-center justify-between w-full">
            <h4 className="font-bold text-base md:text-xl" title={titulo}>{titulo}</h4>
            <p className="text-zinc-400 text-xs" title={data}>{data}</p>
            </div>
        </div>
        <h5 className="text-indigo-900 py-8 font-bold text-lg px-3 md:px-0" title={empresa}>{empresa}</h5>
        <p className="text-zinc-400 pb-8 px-3 md:px-0" title={descricao}>{descricao}</p>
        
        </>
    )
}
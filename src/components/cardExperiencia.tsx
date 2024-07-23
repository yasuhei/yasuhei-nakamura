interface ICardProps {
titulo: string;
data: string;
empresa: string;
descricao: string
}


export function CardExp({ titulo, data, empresa, descricao}: ICardProps) {
    return(
        <>
         <div className="flex items-center justify-between text-center w-full px-3 md:px-0">
            <h4 className="font-bold text-lg md:text-xl">{titulo}</h4>
            <p className="text-zinc-400 text-xs">{data}</p>
        </div>
        <h5 className="text-indigo-900 py-8 font-bold text-lg px-3 md:px-0">{empresa}</h5>
        <p className="text-zinc-400 pb-8 px-3 md:px-0">{descricao}</p>
        
        </>
    )
}
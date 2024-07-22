import  '../index.css'

interface ICardProps {
    img: string;
    descricao: string;
    link: string;
    texto:string
}
export function CardProjetos({ img, descricao, link, texto }: ICardProps) {
    return (
        <div className="border-[1px] border-indigo-900 p-2 flex justify-end items-center flex-col hover:border-indigo-950">
            <img src={img} alt="" className="w-[330px] h-56" />
            <p className="text-2xl font-semibold py-4">{descricao}</p>
            <div className="w-[330px]">
                <div className="max-h-9 min-h-[140px] overflow-y-auto">
                    <p className='text-sm'>{texto}</p>
                </div>
                <button className="border-2 mt-12 p-3 w-full border-indigo-500 text-indigo-500 hover:border-indigo-950 hover:opacity-95 hover:text-indigo-950 transition duration-300 ease-in-out">
                    <a className="p-4" href={link} target="_blank">Ver Mais</a>
                </button>
            </div>
        </div>
    );
}


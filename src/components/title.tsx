interface ITitle {
    title: string;
}

export function Title({title}: ITitle) {
    return (
        <h1 className="font-bold uppercase text-xl md:text-2xl ">{title}</h1>
    )
}
interface ITitle {
    title: string;
}

export function Title({title}: ITitle) {
    return (
        <h1 className="font-bold uppercase text-xl md:text-2xl pt-8 lg:pt-0 text-3xl lg:text-4xl font-black text-gray-900 dark:text-white tracking-tight" title={title}>{title}</h1>
    )
}
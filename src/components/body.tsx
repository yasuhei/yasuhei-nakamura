import Image  from '../assets/SVG PROGRAMADOR 04.svg'


export function Body() {
    return(
        <div className="flex  items-center justify-center w-full  bg-gradient-custom  bg-custom-radial">
        <div className=" w-full h-60 pt-4">
            
        <span className="text-xl font-bold mb-4 text-indigo-500 uppercase font-serif">Desenvolvedor Full-stack</span>
        <h1 className="text-3xl pb-3">Yasuhei Nakamura</h1>
        <p className="w-96">Olá! Bem-vindo(a) ao meu portfólio! <br />
        Aqui você encontrará meus projetos mais recentes e as tecnologias que utilizo para criar soluções web eficazes. Explore os projetos e entre em contato para discutirmos como posso colaborar com você!</p>
        <button className="border-2 mt-12 p-3 w-[300px] border-indigo-500 text-indigo-500 hover:border-indigo-950 hover:opacity-95 hover:text-indigo-950 transition duration-300 ease-in-out">
        Baixar Currículo
        </button>
        </div>

        <div className="w-[830px]">
            <img src={Image} alt="imagem ilustrativa de um programador" className="w-full" />
            
        </div>
    </div>
    )
}
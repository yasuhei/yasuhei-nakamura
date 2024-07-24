import Image  from '../assets/SVG PROGRAMADOR 04.svg'
import pdf from '../assets/pdf/Yasuhei_Nakamura.pdf'

export function Body() {
    return(
<div className="flex items-center justify-center w-full bg-gradient-custom bg-custom-radial relative">
    <div className="max-w-3xl mx-auto px-4 py-8">
        <span className="sm:text-lg md:text-xl font-bold mb-4 text-indigo-500 uppercase font-serif">Desenvolvedor Full-stack</span>
        <h1 className="text-xl  lg:text-3xl pb-3">Yasuhei Nakamura</h1>
        <p className="text-sm lg:text-2xl max-w-md mb-4">Olá! Bem-vindo(a) ao meu portfólio! <br />
    Aqui você encontrará meus projetos mais recentes e as tecnologias que utilizo para criar soluções web eficazes. Explore os projetos e entre em contato para discutirmos como posso colaborar com você!
</p>

        <a href={pdf} download="yasuheiFrontend.pdf" className="inline-block px-6 py-3 mt-2 lg:mt-0 border-2 border-indigo-500 text-indigo-500 hover:border-indigo-950 hover:opacity-95 hover:text-indigo-950 transition duration-300 ease-in-out sm:mt-4">
            Baixar Currículo
        </a>
    </div>

    <div className="w-full sm:block hidden md:w-1/3  xl:w-2/3 mt-8">
        <img src={Image} alt="imagem ilustrativa de um programador" className="w-full" />
    </div>
</div>

    )
}
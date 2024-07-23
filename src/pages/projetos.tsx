import { CardProjetos } from "../components/card";
import { Title } from "../components/title";
import Img from '../img/image.png'
import Img3 from '../img/OIP.jpeg'
import Planner from '../img/planner.jpg'
import Tiao from '../img/tiao.jpg'


export function Projetos() {
    const title = "Projetos"
    return (
        <div id="projetos" className="pt-6 flex justify-center items-center w-full flex-col">
            <Title  title={title} />
            <div className="flex justify-center items-center w-full h-full gap-4 flex-wrap pt-7" >
                <CardProjetos
                img={Img} descricao={'Shuey Burguer'} texto={'Este projeto foi desenvolvido por mim e é inspirado no layout do iFood. Utilizei a API de login da Alura, adaptando-a especificamente para atender às necessidades deste projeto. As tecnologias empregadas incluem React.js para a construção da interface do usuário e Tailwind CSS.'} link={'https://github.com/yasuhei/shueyBurger'} />

                <CardProjetos
                img={Img3} descricao={'Rick and Morty'} texto={'Este projeto foi um dos primeiros que desenvolvi durante meu aprendizado do framework Angular e da biblioteca Angular Material. meu objetivo principal era consolidar os fundamentos do Angular e Angular Material. Este projeto foi uma etapa crucial no meu desenvolvimento como desenvolvedor, permitindo-me adquirir habilidades práticas e compreender melhor as interações entre frontend e backend.'} link={'https://github.com/yasuhei/RickAndMorty'} />


                <CardProjetos
                img={Planner} descricao={'NLW Journey'} texto={'Este projeto foi realizado através do evento da Rocketseat, realizei as trilhas de backend, onde pude me aprofundar nas tecnologias como Prisma, Nodejs, Fastify, envio de E-mails com o nodemail e também validações com o Zod, na trilha de Reactjs, também me aprofundei com o Tailwindcss, integração com o backend usando o axios, hooks como useState e useEffect. '} link={'https://github.com/yasuhei/projeto-fullstack'} />

                <CardProjetos
                img={Tiao} descricao={'Tião Carreiro'} texto={'Este projeto foi desenvolvido com base em um wireframe inicial detalhado, utilizando tecnologias modernas como ReactJS para a construção da interface do usuário e Tailwind CSS para estilização responsiva e eficiente. Além disso, foi implementado o Axios, uma biblioteca JavaScript, para realizar requisições HTTP de forma simplificada e eficaz à API, permitindo uma integração fluida e segura com os dados necessários. O uso de ReactJS garantiu uma experiência de usuário dinâmica e interativa, aproveitando ao máximo o conceito de componentização para modularizar e reutilizar código.'} link={'https://github.com/yasuhei/tiaoRepo'} />

                
                 
            </div>
        </div>
    )
}
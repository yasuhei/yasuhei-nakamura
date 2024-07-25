import { CardProjetos } from "../components/card";
import { Title } from "../components/title";
import { useLanguage } from "../context/navegadorContext";
import Img from '../img/image.png'
import Img3 from '../img/OIP.jpeg'
import Planner from '../img/planner.jpg'
import Tiao from '../img/tiao.jpg'
import { projBr, projEn } from "../Utils/translate";


export function Projetos() {
    const language = useLanguage();
    const id = language === 'pt-BR' ? "projetos" : "projects";
    const experienciaArray = language === 'pt-BR' ? projBr : projEn;


    return (
        <div id={id} className="pt-6 flex justify-center items-center w-full flex-col">
            <Title  title={id} />
            <div className="flex justify-center items-center w-full h-full gap-4 flex-wrap pt-7" >
                <CardProjetos
                img={Img} descricao={'Shuey Burguer'} texto={experienciaArray[0].paragrafo} link={'https://github.com/yasuhei/shueyBurger'} />

                <CardProjetos
                img={Img3} descricao={'Rick and Morty'}  texto={experienciaArray[1].paragrafo} link={'https://github.com/yasuhei/RickAndMorty'} />

                <CardProjetos
                img={Planner} descricao={'NLW Journey'}  texto={experienciaArray[2].paragrafo} link={'https://github.com/yasuhei/projeto-fullstack'} />

                <CardProjetos
                img={Tiao} descricao={'Tião Carreiro'}  texto={experienciaArray[3].paragrafo} link={'https://github.com/yasuhei/tiaoRepo'} />

                
            </div>
        </div>
    )
}
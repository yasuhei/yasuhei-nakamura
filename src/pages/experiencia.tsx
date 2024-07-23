import { useState } from "react"
import { Title } from "../components/title"
import { CardExp } from "../components/cardExperiencia"

export function Experiencia() {
    const title = "Experiência"
    const [textoSelecionado, SetTextoSelecionado] = useState('1')

    const handleClick = (id: string) => {
        SetTextoSelecionado(id);

    }

    return (
        <div className="pt-6 flex justify-center items-center w-full flex-col bg-zinc-900 " id="experiencia">
            <div className="pb-10">
                <Title title={title} />
            </div>

            <div className="flex gap-10 justify-center h-96">
                <div className="flex flex-col h-64 bg-zinc-950 w-[21%]">
                    <div className={`px-5 py-5 cursor-pointer ${textoSelecionado === '1' ? 'border-l-2 border-indigo-900 text-indigo-900' : ''}`} onClick={() => handleClick('1')}>
                        <h3>7COMm - People and tech to transform</h3>
                    </div>
                    <div className={`px-5 py-5 cursor-pointer ${textoSelecionado === '2' ? 'border-l-2 border-indigo-900 text-indigo-900' : ''}`} onClick={() => handleClick('2')}>
                        <h3>Indorama Brasil</h3>
                    </div>
                    <div className={`px-5 py-5 cursor-pointer ${textoSelecionado === '3' ? 'border-l-2 border-indigo-900 text-indigo-900' : ''}`} onClick={() => handleClick('3')}>
                        <h3>Oráculo Meteorologia</h3>
                    </div>
                    <div className={`px-5 py-5 cursor-pointer ${textoSelecionado === '4' ? 'border-l-2 border-indigo-900 text-indigo-900' : ''}`} onClick={() => handleClick('4')}>
                        <h3>Hausz - Pisos e Ambientes</h3>
                    </div>
                </div>

                <div className="w-[55%]">
                    {textoSelecionado && (
                        <div>

                            {textoSelecionado === '1' && (
                                <>
                                    <CardExp titulo={'Desenvolvedor front-end'} data={'Ago 2023 - Atual'} empresa={'7COMm - People and tech to transform'} descricao={'Participei do desenvolvimento de um sistema de renegociação de dívidas para o banco Bradesco. Recebemos o endpoint da equipe de backend e implementamos as chamadas no nosso BFF (Backend for Frontend), utilizando o framework Nest.js. Organizamos o código em módulos responsáveis, integrados ao micro-frontend. No lado do frontend, utilizamos Angular, seguindo o design system Fluig, e realizamos testes unitários com Jest. Para garantir a qualidade, implementamos testes automatizados em ferramentas como Bamboo e SonarQube, seguindo metodologias ágeis. Além disso, aplicamos tagueamento e integrações com microserviços.'} />

                                </>
                            )}
                            {textoSelecionado === '2' && (

                                <>
                                    <CardExp titulo={'Analista de sistemas'} data={'Mai 2023 - Jul 2023 · 3 meses'} empresa={'Indorama Brasil'} descricao={'Participei ativamente na criação de um portal dedicado aos colaboradores, integrando APIs tanto externas quanto internas para fornecer uma experiência integrada. Utilizamos práticas avançadas de versionamento no GitHub para um desenvolvimento colaborativo e organizado. Para garantir uma interface de usuário moderna e responsiva, implementamos o Material-UI, aproveitando suas capacidades de design e componentização. O projeto foi desenvolvido utilizando React.js, aproveitando ao máximo as funcionalidades dinâmicas e eficientes da biblioteca. Além disso, aplicamos JavaScript para lógica de programação essencial e Tailwind CSS para estilos customizados e escaláveis, garantindo uma aparência coesa e de fácil manutenção.'} />

                                </>

                            )}
                            {textoSelecionado === '3' && (
                                <>

                                    <CardExp titulo={'Desenvolvedor front-end'} data={'Out de 2022 - Jul de 2023 · 10 meses'} empresa={'Oráculo Meteorologia'} descricao={'Na Oráculo, participei ativamente do desenvolvimento de um sistema em pleno funcionamento, colaborando com uma equipe composta por dois back-ends, dois front-ends, dois DevOps e um CTO. Trabalhava frequentemente em conjunto com um backend na mesma task. Utilizamos amplamente a AWS para conectar ao banco de dados e outras aplicações. Um dos destaques foi o desenvolvimento de um avançado criador de tarefas, substituindo processos manuais anteriormente realizados em Excel, devido à complexidade das regras de negócio.Além disso, implementamos gráficos para análise de desempenho afetado por manutenções programadas. Mantínhamos reuniões diárias para alinhar nossas atividades. No desenvolvimento do sistema, adotamos tecnologias modernas como React.js, TypeScript e styled-components para assegurar uma interface de usuário eficiente e atualizada. Também integrávamos diversas APIs para melhorar a interação do sistema com outros serviços. Esta versão foca nas tecnologias utilizadas e nos aspectos técnicos do projeto na Oráculo.'} />

                                </>
                            )}
                            {textoSelecionado === '4' && (
                                <>
                                    <CardExp titulo={'Desenvolvedor front-end'} data={'Out de 2021 - Set de 2022 · 11 meses'} empresa={'Hausz - Pisos e Ambientes'} descricao={'Desenvolvemos um ERP utilizando o poderoso framework Angular, aproveitando as capacidades avançadas de TypeScript e SCSS para garantir uma aplicação robusta e escalável. Implementamos testes automatizados para assegurar a qualidade do software ao longo do desenvolvimento.Além disso, criei um clone personalizado do Trello, adaptando-o às especificidades e regras de negócio da empresa para permitir que os franqueados organizassem suas tarefas de maneira eficiente. Utilizei a biblioteca pdfmake para gerar PDFs personalizados dinamicamente.Para complementar, desenvolvi landing pages utilizando HTML, CSS e JavaScript, proporcionando uma experiência de usuário atraente e interativa."Esta versão destaca as tecnologias específicas utilizadas em cada parte do projeto, focando nos frameworks e ferramentas relevantes para cada funcionalidade desenvolvida.'} />

                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>


        </div>
    )
}
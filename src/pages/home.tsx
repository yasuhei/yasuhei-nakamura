import { Body } from "../components/body";
import { Header } from "../components/header";
import { Experiencia } from "./experiencia";
import { Footer } from "./footer";
import { Projetos } from "./projetos";
import { Skills } from "./skills";
import { Sobre } from "./sobre";

export function Home() {
    return (
        <>
        <section className="flex flex-col items-center min-h-screen sm:px-10 sm:py-5  md:px-20 md:py-10 ">
            <Header />
            <Body />
            <Sobre />
            <Skills />
            <Experiencia />
            <Projetos />
            
        </section>
            <Footer />
        </>
    );
}

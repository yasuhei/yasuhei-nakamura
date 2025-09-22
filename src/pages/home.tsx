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
        <section className="flex flex-col items-center min-h-screen">
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

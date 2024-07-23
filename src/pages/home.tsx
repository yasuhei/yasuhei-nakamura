import { Body } from "../components/body";
import { Header } from "../components/header";
import { Footer } from "./footer";
import { Projetos } from "./projetos";
import { Skills } from "./skills";
import { Sobre } from "./sobre";

export function Home() {
    return (
        <>
        <section className="flex flex-col items-center min-h-screen px-20 py-10">
            <Header />
            <Body />
            <Sobre />
            <Skills />
            <Projetos />
            
        </section>
            <Footer />
        </>
    );
}

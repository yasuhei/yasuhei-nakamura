import { MotionConfig } from "framer-motion";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { Body } from "../components/body";
import { Header } from "../components/header";
import { Experiencia } from "./experiencia";
import { Footer } from "./footer";
import { Projetos } from "./projetos";
import { Skills } from "./skills";
import { Sobre } from "./sobre";
import { TerminalBackground } from "../components/terminalBackground";

export function Home() {
    return (
        <ReactLenis root>
            <MotionConfig reducedMotion="user">
                <TerminalBackground />
                <section className="flex flex-col items-center min-h-screen">
                    <Header />
                    <Body />
                    <Sobre />
                    <Skills />
                    <Experiencia />
                    <Projetos />
                </section>
                <Footer />
            </MotionConfig>
        </ReactLenis>
    );
}

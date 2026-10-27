import { useEffect, useState } from 'react';
import { useLanguage } from '../context/navegadorContext';

interface Line {
    text: string;
    kind: 'command' | 'output';
}

const linesBr: Line[] = [
    { kind: 'command', text: 'whoami' },
    { kind: 'output', text: 'yasuhei nakamura' },
    { kind: 'command', text: 'cat role.txt' },
    { kind: 'output', text: 'desenvolvedor full-stack' },
    { kind: 'command', text: 'ls stack/' },
    { kind: 'output', text: 'angular  node.js  typescript  java' },
    { kind: 'command', text: 'uptime --experience' },
    { kind: 'output', text: '5+ anos construindo para a web' },
    { kind: 'command', text: 'echo $STATUS' },
    { kind: 'output', text: 'pós em Eng. de Software com Java e IA_' },
];

const linesEn: Line[] = [
    { kind: 'command', text: 'whoami' },
    { kind: 'output', text: 'yasuhei nakamura' },
    { kind: 'command', text: 'cat role.txt' },
    { kind: 'output', text: 'full-stack developer' },
    { kind: 'command', text: 'ls stack/' },
    { kind: 'output', text: 'angular  node.js  typescript  java' },
    { kind: 'command', text: 'uptime --experience' },
    { kind: 'output', text: '5+ years building for the web' },
    { kind: 'command', text: 'echo $STATUS' },
    { kind: 'output', text: 'postgrad in SW Eng. with Java & AI_' },
];

const TYPE_MS = 38;
const OUTPUT_PAUSE_MS = 280;

export function TerminalWindow() {
    const language = useLanguage();
    const lines = language === 'pt-BR' ? linesBr : linesEn;
    const reducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const [lineIndex, setLineIndex] = useState(reducedMotion ? lines.length : 0);
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        setLineIndex(reducedMotion ? lines.length : 0);
        setCharIndex(0);
    }, [lines, reducedMotion]);

    useEffect(() => {
        if (lineIndex >= lines.length) return;
        const line = lines[lineIndex];

        if (line.kind === 'output') {
            const timeout = setTimeout(() => {
                setLineIndex((current) => current + 1);
                setCharIndex(0);
            }, OUTPUT_PAUSE_MS);
            return () => clearTimeout(timeout);
        }

        const timeout = setTimeout(() => {
            if (charIndex < line.text.length) {
                setCharIndex((current) => current + 1);
            } else {
                setLineIndex((current) => current + 1);
                setCharIndex(0);
            }
        }, charIndex === 0 && lineIndex > 0 ? 450 : TYPE_MS);
        return () => clearTimeout(timeout);
    }, [lineIndex, charIndex, lines]);

    const done = lineIndex >= lines.length;

    return (
        <div
            className="terminal-window w-full max-w-md border border-dashed border-red-500/40 bg-black/70 backdrop-blur-sm font-mono text-sm shadow-[0_0_40px_rgba(239,45,67,0.12)]"
            role="img"
            aria-label={language === 'pt-BR' ? 'Terminal apresentando Yasuhei Nakamura' : 'Terminal introducing Yasuhei Nakamura'}
        >
            <div className="flex items-center gap-2 px-4 py-2 border-b border-dashed border-red-500/30">
                <span className="h-2.5 w-2.5 bg-red-500" />
                <span className="h-2.5 w-2.5 bg-neutral-600" />
                <span className="h-2.5 w-2.5 bg-neutral-700" />
                <span className="ml-3 text-xs text-neutral-500">yasuhei@portfolio:~</span>
            </div>

            <div className="px-4 py-4 min-h-[300px] leading-7">
                {lines.map((line, index) => {
                    if (index > lineIndex) return null;
                    const isCurrent = index === lineIndex;
                    const visible = isCurrent ? line.text.slice(0, charIndex) : line.text;
                    if (line.kind === 'output') {
                        return (
                            <div key={index} className="text-neutral-300">
                                {isCurrent ? '' : visible}
                            </div>
                        );
                    }
                    return (
                        <div key={index} className="text-neutral-100">
                            <span className="text-red-500">$ </span>
                            {visible}
                            {isCurrent && <span className="terminal-caret" />}
                        </div>
                    );
                })}
                {done && (
                    <div className="text-neutral-100">
                        <span className="text-red-500">$ </span>
                        <span className="terminal-caret" />
                    </div>
                )}
            </div>
        </div>
    );
}

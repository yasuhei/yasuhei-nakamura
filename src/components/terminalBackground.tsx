const pixels = Array.from({ length: 30 }, (_, index) => ({
    id: index,
    left: `${(index * 37 + 11) % 100}%`,
    top: `${(index * 61 + 13) % 100}%`,
    size: index % 5 === 0 ? 12 : 7,
    duration: 7 + (index % 5),
    delay: -(index % 7),
}));

export function TerminalBackground() {
    return (
        <div className="terminal-backdrop" aria-hidden="true">
            {pixels.map((pixel) => (
                <span
                    className="terminal-pixel"
                    key={pixel.id}
                    style={{
                        left: pixel.left,
                        top: pixel.top,
                        width: pixel.size,
                        height: pixel.size,
                        animationDuration: `${pixel.duration}s`,
                        animationDelay: `${pixel.delay}s`,
                    }}
                />
            ))}
        </div>
    );
}

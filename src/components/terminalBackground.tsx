import { useEffect, useRef } from "react";

type Sprite = string[];
type Palette = Record<string, string>;

const pacOpen: Sprite = [
    "..XXXXX..",
    ".XXXXXXX.",
    "XXXXXXX..",
    "XXXXX....",
    "XXX......",
    "XXXXX....",
    "XXXXXXX..",
    ".XXXXXXX.",
    "..XXXXX..",
];

const pacClosed: Sprite = [
    "..XXXXX..",
    ".XXXXXXX.",
    "XXXXXXXXX",
    "XXXXXXXXX",
    "XXXXXXXXX",
    "XXXXXXXXX",
    "XXXXXXXXX",
    ".XXXXXXX.",
    "..XXXXX..",
];

const ghostA: Sprite = [
    "..XXXXXX..",
    ".XXXXXXXX.",
    "XXXXXXXXXX",
    "XX..XX..XX",
    "XX..XX..XX",
    "XXXXXXXXXX",
    "XXXXXXXXXX",
    "XX.XXXX.XX",
];

const ghostB: Sprite = [
    "..XXXXXX..",
    ".XXXXXXXX.",
    "XXXXXXXXXX",
    "XX..XX..XX",
    "XX..XX..XX",
    "XXXXXXXXXX",
    "XXXXXXXXXX",
    "X.XXXXXX.X",
];

const invaderA: Sprite = [
    "..X.....X..",
    "...X...X...",
    "..XXXXXXX..",
    ".XX.XXX.XX.",
    "XXXXXXXXXXX",
    "X.XXXXXXX.X",
    "X.X.....X.X",
    "...XX.XX...",
];

const invaderB: Sprite = [
    "..X.....X..",
    "X..X...X..X",
    "X.XXXXXXX.X",
    "XXX.XXX.XXX",
    "XXXXXXXXXXX",
    ".XXXXXXXXX.",
    "..X.....X..",
    ".X.......X.",
];

const pellet: Sprite = ["XX", "XX"];

// X = corpo, R = cachecol, S = energia
const heroWalkA: Sprite = [
    "...XXXX.......",
    "..XXXXXX......",
    "..XXXXXX......",
    "...XXXX.......",
    "..RRRRRR......",
    ".XXXXXXXX.....",
    ".XXXXXXXX.....",
    "..XXXXXX......",
    "..XXX.XX......",
    ".XXX...XX.....",
    ".XX....XXX....",
];

const heroWalkB: Sprite = [
    "...XXXX.......",
    "..XXXXXX......",
    "..XXXXXX......",
    "...XXXX.......",
    "..RRRRRR......",
    ".XXXXXXXX.....",
    ".XXXXXXXX.....",
    "..XXXXXX......",
    "..XX.XXX......",
    "..XX..XXX.....",
    ".XXX...XX.....",
];

const heroCharge: Sprite = [
    "...XXXX.......",
    "..XXXXXX......",
    "..XXXXXX......",
    "...XXXX.......",
    "..RRRRRR......",
    ".XXXXXXXXX....",
    ".XXXXXXXXXSS..",
    "..XXXXXX..SS..",
    "..XX..XX......",
    ".XXX..XXX.....",
    ".XX....XX.....",
];

const heroCast: Sprite = [
    "...XXXX.......",
    "..XXXXXX......",
    "..XXXXXX......",
    "...XXXX.......",
    "..RRRRRR......",
    ".XXXXXXXXXXX..",
    ".XXXXXXXXXXSS.",
    "..XXXXXX...SS.",
    "..XX..XX......",
    ".XXX..XXX.....",
    ".XX....XX.....",
];

interface Entity {
    frames: Sprite[];
    x: number;
    y: number;
    speed: number;
    direction: 1 | -1;
    bobs: boolean;
    hostile: boolean;
    alive: boolean;
    respawnAt: number;
    color: string;
    scale: number;
    offset: number;
}

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    born: number;
    life: number;
    color: string;
}

interface Bolt {
    x: number;
    y: number;
    vx: number;
    vy: number;
    born: number;
}

interface Hero {
    x: number;
    y: number;
    facing: 1 | -1;
    slashing: boolean;
    slashStart: number;
    hitDone: boolean;
    target: Entity | null;
    wanderX: number;
    wanderY: number;
}

const PIXEL = 4;
const FRAME_MS = 280;
const HERO_SCALE = 5;
const HERO_WIDTH = heroWalkA[0].length * HERO_SCALE;
const HERO_HEIGHT = heroWalkA.length * HERO_SCALE;
const HERO_SPEED = 95;
const REACH = 260;
const SLASH_MS = 420;
const BOLT_SPEED = 520;
const grays = ["#262626", "#2e2e2e", "#363636"];
const reds = ["#3a1218", "#431720"];
const heroPalette: Palette = { X: "#a8a29e", R: "#ef2d43", S: "#f5f5f4" };

const entityWidth = (entity: Entity) => entity.frames[0][0].length * entity.scale;
const entityHeight = (entity: Entity) => entity.frames[0].length * entity.scale;

function createEntities(width: number, height: number): Entity[] {
    const count = Math.max(10, Math.min(22, Math.round((width * height) / 90000)));
    const kinds: Array<Pick<Entity, "frames" | "bobs">> = [
        { frames: [pacOpen, pacClosed], bobs: false },
        { frames: [ghostA, ghostB], bobs: false },
        { frames: [invaderA, invaderB], bobs: true },
        { frames: [pellet], bobs: false },
    ];

    return Array.from({ length: count }, (_, index) => {
        const kind = kinds[index % kinds.length];
        const isPellet = kind.frames[0] === pellet;
        return {
            ...kind,
            x: Math.random() * width,
            y: Math.random() * height,
            speed: isPellet ? 0 : 8 + Math.random() * 16,
            direction: Math.random() > 0.5 ? 1 : -1,
            hostile: !isPellet,
            alive: true,
            respawnAt: 0,
            color: index % 5 === 0
                ? reds[index % reds.length]
                : grays[index % grays.length],
            scale: isPellet ? PIXEL : PIXEL * (Math.random() > 0.7 ? 2 : 1),
            offset: Math.random() * FRAME_MS * 2,
        };
    });
}

function drawSprite(
    context: CanvasRenderingContext2D,
    sprite: Sprite,
    x: number,
    y: number,
    scale: number,
    mirror: boolean,
    palette: Palette
) {
    const width = sprite[0].length;
    const originX = Math.round(x / scale) * scale;
    const originY = Math.round(y / scale) * scale;
    sprite.forEach((row, rowIndex) => {
        for (let column = 0; column < width; column++) {
            const color = palette[row[column]];
            if (!color) continue;
            const drawColumn = mirror ? width - 1 - column : column;
            context.fillStyle = color;
            context.fillRect(
                originX + drawColumn * scale,
                originY + rowIndex * scale,
                scale,
                scale
            );
        }
    });
}

export function TerminalBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (!canvas || !context) return;

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        let entities: Entity[] = [];
        let particles: Particle[] = [];
        let bolts: Bolt[] = [];
        let frameRequest = 0;
        let lastTime = performance.now();
        const hero: Hero = {
            x: 0,
            y: 0,
            facing: 1,
            slashing: false,
            slashStart: 0,
            hitDone: false,
            target: null,
            wanderX: 0,
            wanderY: 0,
        };

        const randomWanderPoint = () => {
            hero.wanderX = Math.random() * Math.max(canvas.width - HERO_WIDTH, 1);
            hero.wanderY = Math.random() * Math.max(canvas.height - HERO_HEIGHT, 1);
        };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            entities = createEntities(canvas.width, canvas.height);
            particles = [];
            bolts = [];
            hero.x = canvas.width * 0.12;
            hero.y = canvas.height * 0.7;
            hero.target = null;
            randomWanderPoint();
        };

        const isVisible = (entity: Entity) =>
            entity.alive &&
            entity.x > 0 &&
            entity.x + entityWidth(entity) < canvas.width;

        const kill = (entity: Entity, time: number) => {
            entity.alive = false;
            entity.respawnAt = time + 2500 + Math.random() * 2500;
            const centerX = entity.x + entityWidth(entity) / 2;
            const centerY = entity.y + entityHeight(entity) / 2;
            for (let i = 0; i < 14; i++) {
                const angle = (Math.PI * 2 * i) / 14 + Math.random() * 0.4;
                const force = 40 + Math.random() * 90;
                particles.push({
                    x: centerX,
                    y: centerY,
                    vx: Math.cos(angle) * force,
                    vy: Math.sin(angle) * force - 20,
                    born: time,
                    life: 500 + Math.random() * 400,
                    color: i % 3 === 0 ? "#ef4658" : "#8a8a8a",
                });
            }
        };

        const respawn = (entity: Entity) => {
            const fromLeft = Math.random() > 0.5;
            entity.alive = true;
            entity.direction = fromLeft ? 1 : -1;
            entity.x = fromLeft ? -entityWidth(entity) : canvas.width;
            entity.y = Math.random() * Math.max(canvas.height - entityHeight(entity), 1);
        };

        const findTarget = (): Entity | null => {
            const heroCenterX = hero.x + HERO_WIDTH / 2;
            const heroCenterY = hero.y + HERO_HEIGHT / 2;
            let best: Entity | null = null;
            let bestDistance = Infinity;
            entities.forEach((entity) => {
                if (!entity.hostile || !isVisible(entity)) return;
                const dx = entity.x + entityWidth(entity) / 2 - heroCenterX;
                const dy = entity.y + entityHeight(entity) / 2 - heroCenterY;
                const distance = dx * dx + dy * dy;
                if (distance < bestDistance) {
                    best = entity;
                    bestDistance = distance;
                }
            });
            return best;
        };

        const updateHero = (time: number, delta: number) => {
            const heroCenterX = hero.x + HERO_WIDTH / 2;
            const heroCenterY = hero.y + HERO_HEIGHT / 2;

            if (hero.slashing) {
                const elapsed = time - hero.slashStart;
                if (elapsed >= SLASH_MS) {
                    hero.slashing = false;
                    return;
                }
                if (!hero.hitDone && elapsed >= SLASH_MS / 3) {
                    hero.hitDone = true;
                    const target = hero.target;
                    const aimX = target ? target.x + entityWidth(target) / 2 : heroCenterX + hero.facing * 200;
                    const aimY = target ? target.y + entityHeight(target) / 2 : heroCenterY;
                    const startX = heroCenterX + hero.facing * HERO_WIDTH * 0.45;
                    const startY = heroCenterY - HERO_SCALE;
                    const angle = Math.atan2(aimY - startY, aimX - startX);
                    bolts.push({
                        x: startX,
                        y: startY,
                        vx: Math.cos(angle) * BOLT_SPEED,
                        vy: Math.sin(angle) * BOLT_SPEED,
                        born: time,
                    });
                }
                return;
            }

            if (!hero.target || !isVisible(hero.target)) hero.target = findTarget();

            let goalX: number;
            let goalY: number;
            if (hero.target) {
                goalX = hero.target.x + entityWidth(hero.target) / 2;
                goalY = hero.target.y + entityHeight(hero.target) / 2;
            } else {
                goalX = hero.wanderX + HERO_WIDTH / 2;
                goalY = hero.wanderY + HERO_HEIGHT / 2;
            }

            const dx = goalX - heroCenterX;
            const dy = goalY - heroCenterY;
            if (Math.abs(dx) > 4) hero.facing = dx >= 0 ? 1 : -1;

            if (hero.target && Math.hypot(dx, dy) < REACH) {
                hero.slashing = true;
                hero.slashStart = time;
                hero.hitDone = false;
                return;
            }

            const distance = Math.hypot(dx, dy);
            if (!hero.target && distance < 12) {
                randomWanderPoint();
                return;
            }
            if (distance > 0) {
                hero.x += (dx / distance) * HERO_SPEED * delta;
                hero.y += (dy / distance) * HERO_SPEED * delta;
            }
            hero.x = Math.min(Math.max(hero.x, 0), canvas.width - HERO_WIDTH);
            hero.y = Math.min(Math.max(hero.y, 0), canvas.height - HERO_HEIGHT);
        };

        const heroSprite = (time: number): Sprite => {
            if (!hero.slashing) {
                return Math.floor(time / 160) % 2 === 0 ? heroWalkA : heroWalkB;
            }
            const phase = (time - hero.slashStart) / SLASH_MS;
            if (phase < 1 / 3) return heroCharge;
            return heroCast;
        };

        const updateBolts = (time: number, delta: number) => {
            bolts = bolts.filter((bolt) => {
                bolt.x += bolt.vx * delta;
                bolt.y += bolt.vy * delta;
                if (
                    time - bolt.born > 1800 ||
                    bolt.x < -20 || bolt.x > canvas.width + 20 ||
                    bolt.y < -20 || bolt.y > canvas.height + 20
                ) return false;

                const hit = entities.find((entity) =>
                    entity.hostile &&
                    entity.alive &&
                    bolt.x > entity.x - 8 &&
                    bolt.x < entity.x + entityWidth(entity) + 8 &&
                    bolt.y > entity.y - 8 &&
                    bolt.y < entity.y + entityHeight(entity) + 8
                );
                if (hit) kill(hit, time);
                return !hit;
            });

            bolts.forEach((bolt) => {
                const trailX = bolt.x - bolt.vx * 0.04;
                const trailY = bolt.y - bolt.vy * 0.04;
                context.fillStyle = "#ef2d43";
                context.fillRect(Math.round(trailX / PIXEL) * PIXEL - PIXEL, Math.round(trailY / PIXEL) * PIXEL - PIXEL, PIXEL * 2, PIXEL * 2);
                context.fillStyle = "#f5f5f4";
                context.fillRect(Math.round(bolt.x / PIXEL) * PIXEL - PIXEL, Math.round(bolt.y / PIXEL) * PIXEL - PIXEL, PIXEL * 2, PIXEL * 2);
            });
        };

        const render = (time: number) => {
            const delta = Math.min((time - lastTime) / 1000, 0.1);
            lastTime = time;
            context.clearRect(0, 0, canvas.width, canvas.height);

            entities.forEach((entity) => {
                if (!entity.alive) {
                    if (!reducedMotion && time >= entity.respawnAt) respawn(entity);
                    return;
                }

                if (!reducedMotion) {
                    const width = entityWidth(entity);
                    entity.x += entity.speed * entity.direction * delta;
                    if (entity.direction === 1 && entity.x > canvas.width) entity.x = -width;
                    if (entity.direction === -1 && entity.x < -width) entity.x = canvas.width;
                }

                const frameIndex = reducedMotion
                    ? 0
                    : Math.floor((time + entity.offset) / FRAME_MS) % entity.frames.length;
                const bob = entity.bobs && !reducedMotion
                    ? Math.sin((time + entity.offset) / 700) * PIXEL * 2
                    : 0;

                drawSprite(
                    context,
                    entity.frames[frameIndex],
                    entity.x,
                    entity.y + bob,
                    entity.scale,
                    entity.direction === -1 && entity.frames[0] === pacOpen,
                    { X: entity.color }
                );
            });

            if (!reducedMotion) {
                updateHero(time, delta);
                updateBolts(time, delta);
                particles = particles.filter((particle) => time - particle.born < particle.life);
                particles.forEach((particle) => {
                    particle.x += particle.vx * delta;
                    particle.y += particle.vy * delta;
                    particle.vy += 160 * delta;
                    context.globalAlpha = 1 - (time - particle.born) / particle.life;
                    context.fillStyle = particle.color;
                    context.fillRect(
                        Math.round(particle.x / PIXEL) * PIXEL,
                        Math.round(particle.y / PIXEL) * PIXEL,
                        PIXEL,
                        PIXEL
                    );
                });
                context.globalAlpha = 1;
            }

            drawSprite(context, heroSprite(time), hero.x, hero.y, HERO_SCALE, hero.facing === -1, heroPalette);

            if (!reducedMotion) frameRequest = requestAnimationFrame(render);
        };

        resize();
        frameRequest = requestAnimationFrame(render);
        window.addEventListener("resize", resize);

        return () => {
            cancelAnimationFrame(frameRequest);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <div className="terminal-backdrop" aria-hidden="true">
            <canvas ref={canvasRef} className="terminal-canvas" />
        </div>
    );
}

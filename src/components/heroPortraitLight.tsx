import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function HeroPortraitLight() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const portrait = canvas?.closest('figure');
        if (!canvas || !portrait) return;

        const media = gsap.matchMedia();
        media.add('(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)', () => {
            let cancelled = false;
            let dispose: (() => void) | undefined;

            const loadLight = (event: PointerEvent) => {
                if (event.pointerType === 'touch') return;
                portrait.removeEventListener('pointerenter', loadLight);
                void import('three').then((THREE) => {
                    if (cancelled) return;
                    const context = canvas.getContext('webgl2', { alpha: true });
                    if (!context) return;

                    const renderer = new THREE.WebGLRenderer({ canvas, context, alpha: true });
                    renderer.setPixelRatio(1);
                    const scene = new THREE.Scene();
                    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 2);
                    camera.position.z = 1;
                    const geometry = new THREE.PlaneGeometry(2, 2);
                    const pointer = new THREE.Vector2();
                    const intensity = { value: 0 };
                    const aspect = { value: 1 };
                    const material = new THREE.ShaderMaterial({
                        transparent: true,
                        depthWrite: false,
                        uniforms: { pointer: { value: pointer }, intensity, aspect },
                        vertexShader: `
                            varying vec2 positionOnCard;
                            void main() {
                                positionOnCard = uv;
                                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                            }
                        `,
                        fragmentShader: `
                            varying vec2 positionOnCard;
                            uniform vec2 pointer;
                            uniform float intensity;
                            uniform float aspect;
                            void main() {
                                vec2 delta = (positionOnCard - pointer) * vec2(aspect, 1.0);
                                float glow = (1.0 - smoothstep(0.0, 0.48, length(delta))) * intensity;
                                vec3 color = mix(vec3(1.0, 0.29, 0.55), vec3(1.0, 0.72, 0.42), glow);
                                gl_FragColor = vec4(color, glow * 0.23);
                            }
                        `,
                    });
                    scene.add(new THREE.Mesh(geometry, material));

                    const render = () => renderer.render(scene, camera);
                    const resize = new ResizeObserver(() => {
                        if (!canvas.clientWidth || !canvas.clientHeight) return;
                        aspect.value = canvas.clientWidth / canvas.clientHeight;
                        renderer.setSize(Math.ceil(canvas.clientWidth / 2), Math.ceil(canvas.clientHeight / 2), false);
                        render();
                    });
                    const glow = gsap.quickTo(intensity, 'value', { duration: 0.28, ease: 'power2.out', onUpdate: render });
                    let isLit = false;
                    const move = (event: PointerEvent) => {
                        if (event.pointerType === 'touch') return;
                        const rect = portrait.getBoundingClientRect();
                        pointer.set((event.clientX - rect.left) / rect.width, 1 - (event.clientY - rect.top) / rect.height);
                        if (!isLit) {
                            isLit = true;
                            glow(1);
                        }
                        render();
                    };
                    const leave = () => {
                        isLit = false;
                        glow(0);
                    };

                    resize.observe(canvas);
                    portrait.addEventListener('pointermove', move);
                    portrait.addEventListener('pointerleave', leave);
                    if (portrait.matches(':hover')) move(event);
                    dispose = () => {
                        resize.disconnect();
                        portrait.removeEventListener('pointermove', move);
                        portrait.removeEventListener('pointerleave', leave);
                        glow.tween.kill();
                        renderer.clear();
                        geometry.dispose();
                        material.dispose();
                        renderer.dispose();
                    };
                }).catch((error: unknown) => console.warn('Efeito de luz do retrato indisponível.', error));
            };

            portrait.addEventListener('pointerenter', loadLight);
            return () => {
                cancelled = true;
                portrait.removeEventListener('pointerenter', loadLight);
                dispose?.();
            };
        });

        return () => media.revert();
    }, []);

    return <canvas ref={canvasRef} className="hero-portrait-light" aria-hidden="true" />;
}

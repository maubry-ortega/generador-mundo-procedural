import { createNoise2D, createNoise3D } from 'simplex-noise';
import alea from 'alea';

export class NoiseGenerator {
    private noise2D: ReturnType<typeof createNoise2D>;
    private noise3D: ReturnType<typeof createNoise3D>;

    /**
     * Constructor del generador de ruido.
     * @param seed Semilla opcional para garantizar consistencia en la generación de ruido.
     */
    constructor(seed?: string) {
        const randomFn = seed ? alea(seed) : Math.random;
        this.noise2D = createNoise2D(randomFn);
        this.noise3D = createNoise3D(randomFn);
    }

    /**
     * Genera un valor de ruido 2D, ideal para mapas planos.
     * @param x Coordenada X.
     * @param y Coordenada Y.
     * @returns Valor de ruido entre -1 y 1.
     */
    generateNoise2D(x: number, y: number): number {
        return this.noise2D(x, y);
    }

    /**
     * Genera un valor de ruido 3D, útil para mundos con altura variable o efectos volumétricos.
     * @param x Coordenada X.
     * @param y Coordenada Y.
     * @param z Coordenada Z (altura o dimensión extra).
     * @returns Valor de ruido entre -1 y 1.
     */
    generateNoise3D(x: number, y: number, z: number): number {
        return this.noise3D(x, y, z);
    }

    /**
     * Genera un chunk de mapa basado en ruido 2D.
     * @param width Ancho del chunk.
     * @param height Alto del chunk.
     * @param offsetX Desplazamiento en X.
     * @param offsetY Desplazamiento en Y.
     * @returns Matriz 2D representando el chunk del mapa.
     */
    generateChunk(width: number, height: number, offsetX: number, offsetY: number): string[][] {
        return Array.from({ length: height }, (_, y) =>
            Array.from({ length: width }, (_, x) => {
                const noiseValue = this.noise2D((x + offsetX) / 10, (y + offsetY) / 10);
                return noiseValue > 0.3 ? 'grass' : 'road';
            })
        );
    }
}
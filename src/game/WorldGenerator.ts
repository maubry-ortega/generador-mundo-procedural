import { NoiseGenerator } from '../generators/NoiseGenerator';

export class WorldGenerator {
    private noiseGenerator: NoiseGenerator;

    /**
     * Constructor para inicializar el generador de mundos con una semilla opcional.
     * @param seed Semilla opcional para la generación consistente del mundo.
     */
    constructor(seed?: string) {
        this.noiseGenerator = new NoiseGenerator(seed);
    }

    /**
     * Genera un chunk del mapa utilizando el NoiseGenerator.
     * @param width Ancho del chunk.
     * @param height Alto del chunk.
     * @param offsetX Desplazamiento en X para el chunk.
     * @param offsetY Desplazamiento en Y para el chunk.
     * @returns Una matriz 2D representando el chunk del mapa con etiquetas como 'grass' o 'road'.
     */
    generateChunk(width: number, height: number, offsetX: number, offsetY: number): string[][] {
        return this.noiseGenerator.generateChunk(width, height, offsetX, offsetY);
    }
}

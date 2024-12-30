import { BiomeManager, BiomeName } from "../generators/BiomeManager";
import { StructureManager } from "../generators/StructureManager";
import { NoiseGenerator } from "../generators/NoiseGenerator";

export class WorldGenerator {
    private noiseGenerator: NoiseGenerator;
    private biomeManager = new BiomeManager();
    private structureManager = new StructureManager();

    constructor(seed?: string) {
        this.noiseGenerator = new NoiseGenerator(seed);
    }

    async init(): Promise<void> {
        await this.biomeManager.init();
        await this.structureManager.init();
    }

    generateChunk(width: number, height: number, offsetX: number, offsetY: number): BiomeName[][] {
        const map: BiomeName[][] = Array.from({ length: height }, (_, y) =>
            Array.from({ length: width }, (_, x) => {
                const noiseValue = this.noiseGenerator.generateNoise2D((x + offsetX) / 10, (y + offsetY) / 10);

                // Mapear ruido a biomas según el valor
                if (noiseValue > 0.6) return "road";
                if (noiseValue > 0.3) return "forest";
                return "grassland"; // Valor por defecto
            })
        );

        return map;
    }

    placeStructure(map: BiomeName[][], structureName: string, startX: number, startY: number): void {
        const structure = this.structureManager.getStructure(structureName);
        if (!structure) return;

        for (let y = 0; y < structure.height; y++) {
            for (let x = 0; x < structure.width; x++) {
                const mapY = startY + y;
                const mapX = startX + x;
                const tile = structure.tiles[y][x];

                // Verificar bordes del mapa y si hay un tile válido
                if (map[mapY]?.[mapX] && tile) {
                    map[mapY][mapX] = tile as BiomeName;
                }
            }
        }
    }
}
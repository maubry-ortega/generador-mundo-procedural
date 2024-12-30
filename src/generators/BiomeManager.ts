import { random, sample } from "lodash";

export type BiomeName = "grassland" | "road" | "forest";

interface BiomeConfig {
    tiles: string[];
    weight: number;
}

interface BiomeData {
    [key: string]: BiomeConfig;
}

export class BiomeManager {
    private biomes: BiomeData = {};

    async init(): Promise<void> {
        const response = await fetch("/assets/json/biomes.json");
        this.biomes = await response.json();
    }

    getRandomBiome(): BiomeName {
        const entries = Object.entries(this.biomes).map(([name, config]) => ({
            name: name as BiomeName,
            weight: config.weight,
        }));

        // Selecciona un bioma basado en sus pesos.
        const totalWeight = entries.reduce((sum, entry) => sum + entry.weight, 0);
        const roll = random(0, totalWeight);
        let currentWeight = 0;

        for (const entry of entries) {
            currentWeight += entry.weight;
            if (roll <= currentWeight) return entry.name;
        }

        return "grassland"; // Predeterminado si no ocurre un caso válido.
    }

    getTileForBiome(biome: BiomeName): string {
        const biomeConfig = this.biomes[biome];
        if (!biomeConfig) return "grass"; // Valor por defecto.

        // Selecciona una tile aleatoria del bioma.
        return sample(biomeConfig.tiles) || "grass";
    }
}
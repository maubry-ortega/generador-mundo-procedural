import { createNoise2D } from "simplex-noise";

// Función para convertir las coordenadas del mundo a coordenadas isométricas para un tile
export const isoToScreen = (gridX: number, gridY: number): { x: number; y: number } => {
    const tileSize = 34;
    const halfTile = tileSize / 2;
    const quarterTile = tileSize / 4;

    return {
        x: (gridX - gridY) * halfTile,
        y: (gridX + gridY) * quarterTile,
    };
};

// Función para generar un chunk de terreno basado en el ruido simplex
export const generateChunk = (
    width: number,
    height: number,
    noiseGenerator: ReturnType<typeof createNoise2D>,
    offsetX: number,
    offsetY: number
): string[][] => {
    const map: string[][] = [];
    
    for (let y = 0; y < height; y++) {
        map[y] = [];
        for (let x = 0; x < width; x++) {
            const value = noiseGenerator((x + offsetX) / 10, (y + offsetY) / 10);
            map[y][x] = value > 0.3 ? "grass" : "road";
        }
    }

    return map;
};
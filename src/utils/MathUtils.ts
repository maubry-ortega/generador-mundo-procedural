/**
 * Convierte coordenadas isométricas de cuadrícula a coordenadas de pantalla.
 * @param gridX Coordenada X en la cuadrícula.
 * @param gridY Coordenada Y en la cuadrícula.
 * @returns Coordenadas de pantalla en formato { x, y }.
 */
export const isoToScreen = (gridX: number, gridY: number): { x: number; y: number } => {
    const tileSize = 34; // Tamaño del tile en píxeles.
    const halfTile = tileSize / 2;
    const quarterTile = tileSize / 4;

    return {
        x: (gridX - gridY) * halfTile,
        y: (gridX + gridY) * quarterTile,
    };
};

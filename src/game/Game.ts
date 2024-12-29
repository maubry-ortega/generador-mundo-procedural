import { Container, Sprite } from 'pixi.js';
import { isoToScreen } from '../utils/MathUtils';
import { AssetLoader } from '../core/AssetLoader';

export class Game {
    private stage: Container;

    constructor(stage: Container) {
        this.stage = stage;
    }

    /**
     * Dibuja un chunk del mapa en la interfaz.
     * @param map Matriz 2D del mapa que representa los tiles.
     * @param offsetX Desplazamiento en X del chunk.
     * @param offsetY Desplazamiento en Y del chunk.
     */
    async drawMapChunk(map: string[][], offsetX: number, offsetY: number): Promise<void> {
        try {
            const textures = {
                grass: AssetLoader.getTexture('grass'),
                road: AssetLoader.getTexture('road'),
            };

            map.forEach((row, y) => {
                row.forEach((tileType, x) => {
                    const texture = textures[tileType as keyof typeof textures];
                    if (!texture) return;

                    const tile = new Sprite(texture);
                    const { x: screenX, y: screenY } = isoToScreen(x + offsetX, y + offsetY);
                    tile.x = screenX;
                    tile.y = screenY;
                    this.stage.addChild(tile);
                });
            });
        } catch (error) {
            console.error('Error al dibujar el mapa:', error);
        }
    }
}
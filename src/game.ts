import { Sprite, Assets, Container } from "pixi.js";
import { isoToScreen } from "./world";

export class Game {
    stage: Container;
    tileSize = 34;

    constructor(stage: Container) {
        this.stage = stage;
    }

    async drawMapChunk(map: string[][], offsetX: number, offsetY: number): Promise<void> {
        const [grassTexture, roadTexture] = await Promise.all([
            Assets.load("/assets/tiles/grass.png"),
            Assets.load("/assets/tiles/road.png"),
        ]);

        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[y].length; x++) {
                const tileType = map[y][x];
                const texture = tileType === "grass" ? grassTexture : roadTexture;
                const tile = new Sprite(texture);

                const { x: screenX, y: screenY } = isoToScreen(x + offsetX, y + offsetY);
                tile.x = screenX;
                tile.y = screenY;

                this.stage.addChild(tile);
            }
        }
    }
}
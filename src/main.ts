import { Container } from "pixi.js";
import { app } from "./init.pixi";
import { Game } from "./game";
import { generateChunk } from "./world";
import { createNoise2D } from "simplex-noise";
import { Player } from "./player";
import keyboardjs from "keyboardjs";

const CHUNK_SIZE = 10; // Tamaño del chunk
const VISIBLE_CHUNKS = 2; // Chunks visibles alrededor del jugador

(async () => {
    const stage = new Container();
    app.stage.addChild(stage);

    const noiseGenerator = createNoise2D();
    const game = new Game(stage);
    const player = new Player();
    await player.create(stage); // Creamos y mostramos al jugador

    const loadedChunks: Set<string> = new Set();

    // Función para obtener el "chunk" según las coordenadas
    function getChunkKey(chunkX: number, chunkY: number): string {
        return `${chunkX}-${chunkY}`;
    }

    // Carga los chunks visibles alrededor del jugador
    function loadVisibleChunks(playerX: number, playerY: number): void {
        const centerChunkX = Math.floor(playerX / CHUNK_SIZE);
        const centerChunkY = Math.floor(playerY / CHUNK_SIZE);

        const newLoadedChunks = new Set<string>();

        for (let dx = -VISIBLE_CHUNKS; dx <= VISIBLE_CHUNKS; dx++) {
            for (let dy = -VISIBLE_CHUNKS; dy <= VISIBLE_CHUNKS; dy++) {
                const chunkX = centerChunkX + dx;
                const chunkY = centerChunkY + dy;
                const chunkKey = getChunkKey(chunkX, chunkY);

                if (!loadedChunks.has(chunkKey)) {
                    const chunk = generateChunk(
                        CHUNK_SIZE,
                        CHUNK_SIZE,
                        noiseGenerator,
                        chunkX * CHUNK_SIZE,
                        chunkY * CHUNK_SIZE
                    );
                    game.drawMapChunk(chunk, chunkX * CHUNK_SIZE, chunkY * CHUNK_SIZE);
                    newLoadedChunks.add(chunkKey);
                }
            }
        }

        loadedChunks.clear();
        newLoadedChunks.forEach((chunkKey) => loadedChunks.add(chunkKey));
    }

    // Cargar los chunks iniciales
    loadVisibleChunks(player.position.gridX, player.position.gridY);

    // Actualizar el jugador en el ticker (bucle principal de PixiJS)
    app.ticker.add(() => {
        let dx = 0, dy = 0;
        // Detecta las teclas presionadas y mueve al jugador en consecuencia
        if (keyboardjs.isPressed("left")) dx = -1;
        if (keyboardjs.isPressed("right")) dx = 1;
        if (keyboardjs.isPressed("up")) dy = -1;
        if (keyboardjs.isPressed("down")) dy = 1;

        // Actualiza la posición del jugador
        player.updatePosition(dx, dy);

        // Cargar y recargar los chunks alrededor del jugador
        loadVisibleChunks(player.position.gridX, player.position.gridY);

        // Movimiento de cámara
        stage.x = -(player.sprite.x - app.screen.width / 2);
        stage.y = -(player.sprite.y - app.screen.height / 2);
    });
})();
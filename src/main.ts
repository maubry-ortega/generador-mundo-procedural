import { PixiInitializer } from './core/PixiInitializer';
import { Game } from './game/Game';
import { Player } from './game/Player';
import { PlayerController } from './game/PlayerController';
import { AssetLoader } from './core/AssetLoader';
import { Config } from './core/Config';
import { WorldGenerator } from './game/WorldGenerator';

(async () => {
    const pixi = new PixiInitializer();
    await pixi.init();
    pixi.initialize();

    const stage = pixi.getApp().stage;
    const game = new Game(stage);

    // Carga de texturas
    await AssetLoader.load({
        grass: '/assets/tiles/grass.png',
        road: '/assets/tiles/road.png',
        player: '/assets/sprites/player.png',
    });

    // Inicialización del jugador
    const player = new Player();
    player.create(stage);

    // Controlador del jugador
    const playerController = new PlayerController(player, () => {
        console.log(`Jugador movido a: (${player.position.gridX}, ${player.position.gridY})`);
    });

    // Generador de mundos
    const worldGenerator = new WorldGenerator();
    const mapChunk = worldGenerator.generateChunk(Config.chunkSize, Config.chunkSize, 0, 0);
    await game.drawMapChunk(mapChunk, 0, 0);

    // Manejo de destrucción (opcional)
    window.addEventListener('unload', () => playerController.destroy());
})();
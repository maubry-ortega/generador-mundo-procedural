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
        water: '/assets/tiles/water.png',
        deep_water: '/assets/tiles/deep_water.png',
        wall: '/assets/tiles/wall.png',
        floor: '/assets/tiles/floor.png',
        player: '/assets/sprites/player.png',
    });

    // Inicialización de generadores
    const worldGenerator = new WorldGenerator();
    await worldGenerator.init();

    // Generación de mapa
    const mapChunk = worldGenerator.generateChunk(Config.chunkSize, Config.chunkSize, 0, 0);
    worldGenerator.placeStructure(mapChunk, 'house', 2, 2); // Ejemplo de colocar estructura "house"
    await game.drawMapChunk(mapChunk, 0, 0);

    // Jugador
    const player = new Player();
    player.create(stage);
    const playerController = new PlayerController(player, () => {
        console.log(`Jugador movido a: (${player.position.gridX}, ${player.position.gridY})`);
    });

    window.addEventListener('unload', () => playerController.destroy());
})();
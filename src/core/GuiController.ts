import { GUI } from 'dat.gui';
import { Config } from './Config';

export class GuiController {
    private gui: GUI;

    constructor() {
        this.gui = new GUI();

        const worldFolder = this.gui.addFolder('World Settings');
        worldFolder.add(Config, 'chunkSize', 5, 20).step(1);
        worldFolder.add(Config, 'visibleChunks', 1, 5).step(1);
        worldFolder.open();

        const playerFolder = this.gui.addFolder('Player Settings');
        playerFolder.add(Config, 'playerSpeed', 0.5, 10).step(0.5);
        playerFolder.open();
    }

    destroy(): void {
        this.gui.destroy();
    }
}
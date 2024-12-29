import { Player } from './Player';
import { KeyboardUtils } from '../utils/KeyboardUtils';

export class PlayerController {
    private moveMap: Record<string, [number, number]> = {
        w: [0, -1],
        s: [0, 1],
        a: [-1, 0],
        d: [1, 0],
    };

    constructor(private player: Player, private onMoveCallback: () => void) {
        this.setupControls();
    }

    /**
     * Configura los controles para el movimiento del jugador.
     */
    private setupControls(): void {
        Object.keys(this.moveMap).forEach((key) => {
            KeyboardUtils.bindKey(key, () => {
                const [dx, dy] = this.moveMap[key];
                this.player.updatePosition(dx, dy);
                this.onMoveCallback();
            });
        });
    }

    /**
     * Desactiva los controles al destruir la instancia.
     */
    destroy(): void {
        Object.keys(this.moveMap).forEach((key) => KeyboardUtils.unbindKey(key));
    }
}
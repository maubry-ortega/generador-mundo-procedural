import { Container, Sprite } from 'pixi.js';
import { AssetLoader } from '../core/AssetLoader';

export class Player {
    public sprite: Sprite = new Sprite();
    public position = { gridX: 5, gridY: 5 };
    private speed: number = 2;

    /**
     * Crea el sprite del jugador y lo agrega al escenario.
     * @param stage Contenedor principal del juego.
     */
    create(stage: Container): void {
        try {
            this.sprite.texture = AssetLoader.getTexture('player');
            this.sprite.x = this.position.gridX * 34;
            this.sprite.y = this.position.gridY * 34;
            this.sprite.anchor.set(0.5);
            stage.addChild(this.sprite);
        } catch (error) {
            console.error('Error al crear el jugador:', error);
        }
    }

    /**
     * Actualiza la posición del jugador en la cuadrícula.
     * @param dx Cambio en la coordenada X.
     * @param dy Cambio en la coordenada Y.
     */
    updatePosition(dx: number, dy: number): void {
        this.position.gridX += dx * this.speed;
        this.position.gridY += dy * this.speed;
        this.sprite.x = this.position.gridX * 34;
        this.sprite.y = this.position.gridY * 34;
    }
}
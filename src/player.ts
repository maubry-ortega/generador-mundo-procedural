import { Sprite, Container, Texture } from "pixi.js";

export class Player {
    public sprite: Sprite;
    public position: { gridX: number; gridY: number };
    private speed: number = 2;

    constructor() {
        this.position = { gridX: 5, gridY: 5 };
        this.sprite = new Sprite(Texture.EMPTY); // Inicializa con una textura vacía
    }

    // Crear sprite del jugador
    async create(stage: Container): Promise<void> {
        const texture = Texture.from("/assets/sprites/player.png"); // Ruta de la textura del jugador

        this.sprite.texture = texture; // Asignar la textura correctamente
        this.sprite.x = this.position.gridX * 34; // Posición inicial
        this.sprite.y = this.position.gridY * 34;
        this.sprite.anchor.set(0.5); // Centrado del sprite, para mejorar la rotación y el movimiento
        this.sprite.scale.set(1); // Ajusta el tamaño, puedes modificarlo según sea necesario

        stage.addChild(this.sprite); // Agregar al escenario
    }

    // Función para actualizar la posición del jugador
    updatePosition(dx: number, dy: number): void {
        this.position.gridX += dx; // Movimiento en el eje X
        this.position.gridY += dy; // Movimiento en el eje Y

        // Actualización de la posición del sprite
        this.sprite.x = this.position.gridX * 34;
        this.sprite.y = this.position.gridY * 34;
    }
}
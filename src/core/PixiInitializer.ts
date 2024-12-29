import { Application } from 'pixi.js';
import { Config } from './Config';

export class PixiInitializer {
    private app: Application;

    constructor() {
        this.app = new Application();
    }

    async init(): Promise<void> {
        await this.app.init({
            width: window.innerWidth,
            height: window.innerHeight,
            background: Config.defaultBackgroundColor, // "backgroundColor" es ahora "background"
        })
    }


    initialize(): void {
        document.body.appendChild(this.app.canvas);
    }

    getApp(): Application {
        return this.app;
    }
}
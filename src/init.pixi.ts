import { Application } from 'pixi.js';

let app: Application;

(async () => {
    app = new Application();

    await app.init({
        backgroundColor: 0x2e2e2e,
        resizeTo: window,
    });

    document.body.appendChild(app.canvas);
})();

export { app };
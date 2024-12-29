import { Assets, Texture } from 'pixi.js';

export class AssetLoader {
    private static textures: { [key: string]: Texture } = {};

    static async load(assets: { [key: string]: string }, onProgress?: (progress: number) => void): Promise<void> {
        const assetEntries = Object.entries(assets);
        const totalAssets = assetEntries.length;
        let loadedAssets = 0;

        for (const [name, url] of assetEntries) {
            const texture = await Assets.load(url);
            this.textures[name] = texture;
            loadedAssets++;
            if (onProgress) {
                onProgress((loadedAssets / totalAssets) * 100);
            }
        }
    }

    static getTexture(name: string): Texture {
        if (!this.textures[name]) {
            throw new Error(`Texture '${name}' not found.`);
        }
        return this.textures[name];
    }
}
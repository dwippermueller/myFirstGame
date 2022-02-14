import { Message } from "../message/message.js";
import { Asset } from "./asset.js";
import { AssetLoader } from "./assetLoader.js";
import { ImageAssetLoader } from "./ImageAssetLoader.js";

export const MESSAGE_ASSET_LOADER_ASSET_LOADED = "MESSAGE_ASSET_LOADER_ASSET_LOADED::"

export class AssetManager {

    private static _loaders: AssetLoader[] = []
    private static _loadedAssets: { [name: string]: Asset } = {}

    private constructor() {
    }

    static initialize() {
        AssetManager._loaders.push(new ImageAssetLoader())
    }

    static registerLoader(loader: AssetLoader) {
        AssetManager._loaders.push(loader)
    }

    static onAssetLoaded(asset: Asset) {
        AssetManager._loadedAssets[asset.name] = asset
        Message.send(MESSAGE_ASSET_LOADER_ASSET_LOADED + asset.name, this, asset)
    }

    static loadAsset(assetName: string) {
        let extension = assetName.split('.').pop()?.toLowerCase()!
        for (let l of AssetManager._loaders) {
            if (l.supportedExtensions.indexOf(extension) !== -1) {
                l.loadAsset(assetName)
            }
        }

        console.warn("Unable to load asset with extension " + extension + " because there is no loader associated with it.")
    }

    static isAssetLoaded(assetName: string): boolean {
        return AssetManager._loadedAssets[assetName] !== undefined
    }

    static getAsset(assetName: string): Asset {
        const asset = AssetManager._loadedAssets[assetName];
        if (asset !== undefined) {
            return asset
        } else {
            AssetManager.loadAsset(assetName)
        }
        return undefined!
    }
}
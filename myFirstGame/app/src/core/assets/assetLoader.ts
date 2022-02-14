import { Asset } from "./asset.js";

export interface AssetLoader {

    readonly supportedExtensions: string[]

    loadAsset(assetName: string): void
}
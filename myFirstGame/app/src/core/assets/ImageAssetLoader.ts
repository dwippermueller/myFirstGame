import { Asset } from "./asset.js";
import { AssetLoader } from "./assetLoader.js";
import { AssetManager } from "./assetManager.js";

export class ImageAsset implements Asset {

    readonly name: string
    readonly data: HTMLImageElement

    get width(): number {
        return this.data.width
    }

    get height(): number {
        return this.data.height
    }

    constructor(name: string, data: HTMLImageElement) {
        this.name = name
        this.data = data
    }
}

export class ImageAssetLoader implements AssetLoader {
    
    get supportedExtensions(): string[] {
        return ["png", "gif", "jpg"]
    }

    loadAsset(assetName: string) {
        const image = new Image()
        image.onload = this.onImageLoaded.bind(this, assetName, image)
        image.src = assetName
    }

    private onImageLoaded(assetName: string, image: HTMLImageElement) {
        console.log("onImageLoaded(): assetName/image", assetName, image)
        const asset = new ImageAsset(assetName, image)
        AssetManager.onAssetLoaded(asset)
    }

}
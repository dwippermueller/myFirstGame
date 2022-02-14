/**
 * The WebGL rendering context
 */
export var gl: WebGLRenderingContext

/**
 * Used for initializing GL context
 */
export class GLUtilities {

    /**
     * Initializes WebGL and returns a canvas if possible
     * 
     * @param elementId The element of the canvas if there is one 
     * @returns The created canvas
     */
    static initialize(elementId?: string): HTMLCanvasElement {
        let canvas: HTMLCanvasElement

        if (elementId !== undefined) {
            canvas = document.getElementById(elementId) as HTMLCanvasElement
            if (canvas === undefined) {
                throw new Error("Cannot find element with id " + elementId)
            }
        } else {
            canvas = document.createElement("canvas") as HTMLCanvasElement
            document.body.appendChild(canvas)
        }

        const context = canvas.getContext("webgl")
        if (context === null) {
            throw new Error("Unable to get context")
        }
        gl = context

        return canvas
    }
}
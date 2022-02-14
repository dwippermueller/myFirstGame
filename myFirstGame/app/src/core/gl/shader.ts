import { gl } from "./gl.js"

/**
 * Represents a WebGL shader.
 */
export class Shader {

    readonly name: string
    private _program!: WebGLProgram
    private _attributes: { [name: string]: number } = {}
    private _uniforms: { [name: string]: WebGLUniformLocation } = {}

    /**
     * Creates a new shader.
     * @param name The name of the shader
     * @param vertexSource The vertext source
     * @param fragmentSource The fragment source
     */
    constructor(name: string, vertexSource: string, fragmentSource: string) {
        this.name = name
        let vertexShader = this.loadShader(vertexSource, gl.VERTEX_SHADER)
        let fragmentShader = this.loadShader(fragmentSource, gl.FRAGMENT_SHADER)
        this.createProgram(vertexShader, fragmentShader)
        this.detectAttributes()
        this.detectUniforms()
    }

    use() {
        gl.useProgram(this._program)
    }

    /**
     * Gets the location of an attribute with the provided name
     * @param name The name of the attribute
     * @returns 
     */
    getAttributeLocation(name: string): number {
        const attribute = this._attributes[name]
        if (attribute === undefined) {
            throw new Error(`Unable to find attribute named '${name}' in shader named '${this.name}'`)
        }
        return attribute
    }

    /**
     * Gets the location of a uniform with the provided name
     * @param name The name of the uniform
     * @returns 
     */
    getUniformLocation(name: string): WebGLUniformLocation {
        const uniform = this._uniforms[name]
        if (uniform === undefined) {
            throw new Error(`Unable to find uniform named '${name}' in shader named '${this.name}'`)
        }
        return uniform
    }

    private loadShader(source: string, shaderType: number): WebGLShader {
        let shader = gl.createShader(shaderType)!
        gl.shaderSource(shader, source)
        gl.compileShader(shader)
        let error = gl.getShaderInfoLog(shader)
        if (error !== "") {
            throw new Error("Error compiling shader with name " + this.name + " : " + error)
        }
        return shader
    }

    private createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader) {
        this._program = gl.createProgram()!
        gl.attachShader(this._program, vertexShader)
        gl.attachShader(this._program, fragmentShader)

        gl.linkProgram(this._program)
        let error = gl.getProgramInfoLog(this._program)
        if (error !== "") {
            throw new Error("Error linking shader with name " + this.name + " : " + error)
        }
    }

    private detectAttributes() {
        const attributeCount = gl.getProgramParameter(this._program, gl.ACTIVE_ATTRIBUTES)
        for (let i = 0; i < attributeCount; i++) {
            let attributeInfo = gl.getActiveAttrib(this._program, i)
            if (!attributeInfo) {
                break;
            }
            this._attributes[attributeInfo.name] = gl.getAttribLocation(this._program, attributeInfo.name)
        }
    }

    private detectUniforms() {
        const uniformCount = gl.getProgramParameter(this._program, gl.ACTIVE_UNIFORMS)
        for (let i = 0; i < uniformCount; i++) {
            let uniformInfo = gl.getActiveUniform(this._program, i)
            if (!uniformInfo) {
                break;
            }
            this._uniforms[uniformInfo.name] = gl.getUniformLocation(this._program, uniformInfo.name)!
        }
    }
}
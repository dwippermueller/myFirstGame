import { AttributeInfo, GLBuffer } from "../gl/glBuffer.js"
import { Vector3 } from "../math/vector3.js"

export class Sprite {

    private _name: string
    private _width: number
    private _height: number

    private _buffer!: GLBuffer

    position: Vector3 = new Vector3()
    
    constructor(name: string, width: number = 100, height: number = 100) {
        this._name = name
        this._width = width
        this._height = height
    }

    load() {
        this._buffer = new GLBuffer(3)

        this._buffer.addAttributeLocation(new AttributeInfo(0, 3, 0))

        const vertices = [
            0, 0, 0,
            0, this._height, 0,
            this._width, this._height, 0,

            this._width, this._height, 0,
            this._width, 0, 0,
            0, 0, 0
        ]

        this._buffer.pushBackData(vertices)
        this._buffer.upload()
        this._buffer.unbind()
    }

    update(time: number) {

    }

    draw() {
        this._buffer.bind()
        this._buffer.draw()
    }
}
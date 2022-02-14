import { Vector3 } from "./vector3.js"

export class Matrix4x4 {

    private _data: number[] = []

    private constructor() {
        this._data = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]
    }

    get data(): number[] {
        return this._data
    }

    static identity(): Matrix4x4 {
        return new Matrix4x4()
    }

    static orthographic(left: number, right: number, bottom: number, top: number, nearClip: number, farClip: number): Matrix4x4 {
        let m = new Matrix4x4()

        let lr = 1.0 / (left - right)
        let bt = 1.0 / (bottom - top)
        let nf = 1.0 / (nearClip - farClip)

        m._data = [
            -2.0 * lr,           0,                   0,                         0,
            0,                   -2.0 * bt,           0,                         0,
            0,                   0,                   2.0 * nf,                  0,
            (left + right) * lr, (top + bottom) * bt, (farClip + nearClip) * nf, 1        
        ]
        
        return m
    }

    static translation(position: Vector3): Matrix4x4 {
        let m = new Matrix4x4()

        m._data = [
            1,          0,          0,          0,
            0,          1,          0,          0,
            0,          0,          1,          0,
            position.x, position.y, position.z, 1
        ]

        return m
    }
}
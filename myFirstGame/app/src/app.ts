import { Engine } from "./core/engine.js"

var engine: Engine

window.onload = function () {
    engine= new Engine
    engine.start()
}

window.onresize = function() {
    engine.resize()
}
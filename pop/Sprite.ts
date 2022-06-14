import Texture from "./Texture";
import Container from "./Container";

class Sprite {
    pos = {x: 0, y: 0};
    scale = {x: 1, y: 1};
    anchor = {x: 0, y: 0};
    pivot = {x: 0, y: 0};
    rotation: number;
    update: (dt: number, t: number, container: Container) => void;
    dead = false;
    private texture: Texture;


    constructor(texture: Texture) {
        this.texture = texture;
    }
}

export default Sprite;

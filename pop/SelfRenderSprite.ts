import Container from "./Container";

class SelfRenderSprite {
    pos = {x: 0, y: 0};
    scale = {x: 1, y: 1};
    anchor = {x: 0, y: 0};
    pivot = {x: 0, y: 0};
    rotation: number = 0;
    update: (dt: number, t: number, container: Container) => void;
    dead = false;
    selfRender: any = null;
}

export default SelfRenderSprite;

import Sprite from "./Sprite";
import Texture from "./Texture";
import AnimManager from "./AnimManager";

class TileSprite extends Sprite {
    private tileW: number;
    private tileH: number;
    frame: { x: number; y: number };
    anims: AnimManager;
    constructor (texture: Texture, w: number, h: number) {
        super(texture);
        this.tileW = w;
        this.tileH = h;
        this.frame = { x: 0, y: 0 };
        this.anims = new AnimManager(this);
    }

    // @ts-ignore
    update(dt: number,t: number): void {
        this.anims.update(dt);
    }
}

export default TileSprite;

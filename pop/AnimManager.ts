import Anim from "./Anim";
import TileSprite from "./TileSprite";

class AnimManager {
    current: any = null;
    private anims: Record<string, any> = {};
    private running = false;
    private frameSource: any;

    constructor(e: TileSprite) {
        this.frameSource  = e;
    }

    add(name: string, frames: any[], speed: number) {
        this.anims[name] = new Anim(frames, speed);
        return this.anims[name];
    }

    update(dt: number) {
        const {current, anims, frameSource} = this;

        if (!current) {
            return; // bail!
        }
        const anim = anims[current];
        anim.update(dt);

        // Sync the TileSprite frame
        frameSource.frame.x = anim.frame.x;
        frameSource.frame.y = anim.frame.y;
    }

    play(anim: string) {
        const {current, anims} = this;
        if (anim === current) {
            return;
        }
        this.current = anim;
        anims[anim].reset();
    }

    stop() {
        this.current = null;
    }
}

export default AnimManager;

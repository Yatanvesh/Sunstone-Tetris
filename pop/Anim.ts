class Anim {
    private frames: any[];
    private rate: number;
    private curTime = 0;
    private curFrame= 0;
    private frame: any;
    constructor(frames: any[], rate: number) {
        this.frames = frames;
        this.rate = rate;
        this.reset();
    }

    update(dt: number) {
        const { rate, frames } = this;
        if ((this.curTime += dt) > rate) {
            this.curFrame++;
            this.frame = frames[this.curFrame % frames.length];
            this.curTime -= rate;
        }
    }
    reset() {
        this.frame = this.frames[0];
        this.curFrame = 0;
        this.curTime = 0;
    }
}

export default Anim;

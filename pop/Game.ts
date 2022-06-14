import Container from "./Container";
import CanvasRenderer from "./renderer/CanvasRenderer";

class   Game {
    w: number;
    h: number;
    scene: Container;
    private renderer: CanvasRenderer;
    private STEP = 1 / 60;
    private MAX_FRAME = this.STEP * 5;

    constructor(w: number, h: number, parent = "#board") {
        this.w = w;
        this.h = h;
        this.renderer = new CanvasRenderer(w, h);
        document.querySelector(parent).appendChild(this.renderer.view);
        this.scene = new Container();
    }

    run(gameUpdate = (dt: number, t: number) => {
    }) {
        let dt = 0;
        let last = 0;
        const loopy = (ms: number) => {
            requestAnimationFrame(loopy);

            const t = ms / 1000; // Let's work in seconds
            dt = Math.min(t - last, this.MAX_FRAME);
            last = t;

            this.scene.update(dt, t);
            gameUpdate(dt, t);
            this.renderer.render(this.scene);
        };
        requestAnimationFrame(loopy);
    }
}

export default Game;

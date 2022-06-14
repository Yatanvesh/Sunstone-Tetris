class MouseControls {
    private el: HTMLCanvasElement;
    pos: { x: number; y: number }  ={ x: 0, y: 0 };
    isDown = false;
    pressed = false;
    released = false;

    constructor(container: HTMLCanvasElement) {
        this.el = container;
        document.addEventListener("mousemove", this.move.bind(this), false);
        document.addEventListener("mousedown", this.down.bind(this), false);
        document.addEventListener("mouseup", this.up.bind(this), false);
    }

    mousePosFromEvent({ clientX, clientY }: MouseEvent) {
        const { el, pos } = this;
        const rect = el.getBoundingClientRect();
        const xr = el.width / el.clientWidth;
        const yr = el.height / el.clientHeight;
        pos.x = (clientX - rect.left) * xr;
        pos.y = (clientY - rect.top) * yr;
    }

    move(e: MouseEvent) {
        this.mousePosFromEvent(e);
    }

    down(e: MouseEvent) {
        this.isDown = true;
        this.pressed = true;
        this.mousePosFromEvent(e);
    }

    up() {
        this.isDown = false;
        this.released = true;
    }

    update() {
        this.released = false;
        this.pressed = false;
    }
}

export default MouseControls;

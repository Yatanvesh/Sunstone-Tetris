class CanvasRenderer {
    view: HTMLCanvasElement;
    private w: number;
    private h: number;
    private ctx: CanvasRenderingContext2D;

    constructor(w: number, h: number) {
        const canvas = document.createElement("canvas");
        this.w = canvas.width = w;
        this.h = canvas.height = h;
        this.view = canvas;
        this.ctx = canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.textBaseline = "top";
    }

    render(container: any, clear = true) {
        if (container.visible == false) {
            return;
        }
        const {ctx} = this;

        function renderRec(container: any) {
            // Render the container children
            container.children.forEach((child: any) => {
                if (child.visible == false) {
                    return;
                }
                ctx.save();

                // Handle transforms
                if (child.pos) {
                    ctx.translate(Math.round(child.pos.x), Math.round(child.pos.y));
                }
                if (child.scale) ctx.scale(child.scale.x, child.scale.y);
                if (child.anchor) ctx.translate(child.anchor.x, child.anchor.y);
                if (child.rotation) {
                    const px = child.pivot ? child.pivot.x : 0;
                    const py = child.pivot ? child.pivot.y : 0;
                    ctx.translate(px, py);
                    ctx.rotate(child.rotation);
                    ctx.translate(-px, -py);
                }

                // Draw the leaf nodes
                if (child.text) {
                    const {font, fill, align} = child.style;
                    if (font) ctx.font = font;
                    if (fill) ctx.fillStyle = fill;
                    if (align) ctx.textAlign = align;
                    ctx.fillText(child.text, 0, 0);
                } else if (child.texture) {
                    const img = child.texture.img;
                    if (child.tileW) {
                        ctx.drawImage(
                            img,
                            child.frame.x * child.tileW, // source x
                            child.frame.y * child.tileH, // source y
                            child.tileW, child.tileH,    // width & height
                            0, 0,                        // destination x & y
                            child.tileW, child.tileH     // destination width & height
                        );
                    } else {
                        ctx.drawImage(img, 0, 0);
                    }
                } else if (child.selfRender) {
                    child.selfRender(ctx);
                }

                // Render any child sub-nodes
                if (child.children) {
                    renderRec(child);
                }
                ctx.restore();
            });
        }

        if (clear) {
            ctx.clearRect(0, 0, this.w, this.h);
            ctx.fillStyle = "#22366a";
            ctx.fillRect(0, 0, this.w, this.h);
        }
        renderRec(container);
    }
}

export default CanvasRenderer;

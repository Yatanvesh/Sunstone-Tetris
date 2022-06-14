class Text {
    pos = { x: 0, y: 0 };
    text: string;
    private style: Record<any, any>;
    update: (dt: any) => void;

    constructor(text = "", style = {}) {
        this.text = text;
        this.style = style;
    }
}

export default Text;

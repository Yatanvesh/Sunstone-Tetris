import SelfRenderSprite from "../../pop/SelfRenderSprite";

export type IDirection = 'horizontal' | 'vertical';

class Squiggly extends SelfRenderSprite {
    direction: IDirection = 'vertical';
    frozen = false;

    constructor() {
        super();
        this.pos = {x: 1, y: 0};
    }

    freeze() {
        this.frozen = true;
    }

    swapDirection() {
        if (this.direction === 'horizontal') {
            this.direction = 'vertical';
        } else {
            this.direction = 'horizontal';
        }
    }

}


export default Squiggly;

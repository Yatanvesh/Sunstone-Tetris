import Sprite from "./Sprite";

class Container {
    pos = {x: 0, y: 0};
    private children: any = [];

    constructor() {
    }

    add(child: any) {
        this.children.push(child);
        return child;
    }

    remove(child:any) {
        this.children = this.children.filter((c: any) => c !== child);
        return child;
    }

    update (dt: number, t: number) {
        this.children = this.children.filter((child: Sprite) => {
            if (child.update) {
                child.update(dt, t, this);
            }
            return child.dead ? false : true;
        });
    }

    map (f: any) {
        return this.children.map(f);
    }
}

export default Container

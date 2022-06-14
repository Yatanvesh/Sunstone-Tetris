import SelfRenderSprite from "../../pop/SelfRenderSprite";
import {GameDimensions, SquareLen} from "../constants";
import Squiggly from "./Squiggly";
import math from "../../pop/utils/math";

class TetrisBoard extends SelfRenderSprite {
    boardMatrix: any = [];
    columns: number;
    rows: number;
    squigglies: Squiggly[] = [];
    computedSquigglyWidth = 3;

    constructor() {
        super();
        this.pos = {x: 0, y: 0};
        this.columns = GameDimensions.w / 20;
        this.rows = GameDimensions.h / 20;
        this.resetBoard();
    }

    get activeSquiggly(): Squiggly | null {
        if (this.squigglies.length) {
            return this.squigglies[this.squigglies.length - 1];
        }
        return null;
    }

    resetBoard() {
        const rootMatrix = [];
        for (let row = 0; row < this.rows; row++) {
            const rowData = [];
            for (let col = 0; col < this.columns; col++) {
                rowData.push(0);
            }
            rootMatrix.push(rowData);
        }
        this.boardMatrix = rootMatrix;
    }

    selfRender = (ctx: CanvasRenderingContext2D): void => {
        ctx.fillStyle = 'white';
        this.updateBoard();
        this.checkCollision();
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.columns; col++) {
                if (this.boardMatrix[row][col]) {
                    ctx.fillRect(col * SquareLen, row * SquareLen, SquareLen, SquareLen);
                }
            }
        }
    }

    timedUpdate = () => {
        this.shift();
        this.checkBoardClearing();
    }

    checkBoardClearing() {
        const lastRow = this.boardMatrix[this.boardMatrix.length - 1];
        const sum = lastRow.reduce((item: number, acc = 0) => acc + item);
        if (sum === lastRow.length) {

        }
    }

    spawnSquiggly = () => {
        const squiggly = new Squiggly();
        squiggly.pos.x = math.rand(1, this.columns - 1);
        this.squigglies.push(squiggly);
    }

    updateBoard() {
        this.resetBoard();
        this.squigglies.forEach((squiggly: Squiggly) => {
            if (squiggly.direction === 'horizontal') {
                this.boardMatrix[squiggly.pos.y][squiggly.pos.x] = 1;
                this.boardMatrix[squiggly.pos.y + 1][squiggly.pos.x] = 1;
                this.boardMatrix[squiggly.pos.y + 1][squiggly.pos.x - 1] = 1;
                this.boardMatrix[squiggly.pos.y][squiggly.pos.x + 1] = 1;
            } else {
                this.boardMatrix[squiggly.pos.y][squiggly.pos.x] = 1;
                if (squiggly.pos.y !== 0) {
                    this.boardMatrix[squiggly.pos.y - 1][squiggly.pos.x] = 1;
                }
                this.boardMatrix[squiggly.pos.y][squiggly.pos.x + 1] = 1;
                this.boardMatrix[squiggly.pos.y + 1][squiggly.pos.x + 1] = 1;
            }
        });
    }

    shift = () => {
        if (this.activeSquiggly.pos.y < this.boardMatrix.length - 2 && !this.activeSquiggly.frozen) {
            this.activeSquiggly.pos.y += 1;
        }
    }

    moveHorizontal = (multiplier: number) => {
        const {pos, direction} = this.activeSquiggly;
        let enableMovement;
        if (direction === 'horizontal') {
            if (multiplier === 1) {
                enableMovement = !this.boardMatrix[pos.y][pos.x + 2] && !this.boardMatrix[pos.y + 1][pos.x + 1];
            } else {
                enableMovement = !this.boardMatrix[pos.y + 1][pos.x - 2];
            }
        } else {
            if (multiplier === 1) {
                enableMovement = !this.boardMatrix[pos.y][pos.x + 2] && !this.boardMatrix[pos.y + 1][pos.x + 2];
            } else {
                enableMovement = !this.boardMatrix[pos.y][pos.x - 1] && !this.boardMatrix[pos.y - 1][pos.x - 1] && !this.boardMatrix[pos.y + 1][pos.x];
            }
        }

        if (enableMovement) {
            pos.x += multiplier;
        }

        pos.x = Math.max(direction === 'horizontal' ? 1 : 0, this.activeSquiggly.pos.x);
        pos.x = Math.min(this.columns - this.computedSquigglyWidth + 1, pos.x);
    }


    rotate = () => {
        this.activeSquiggly.swapDirection();
    }

    private checkCollision() {
        const pos = this.activeSquiggly.pos;
        let collision;
        const reachedEnd = this.activeSquiggly.pos.y === this.boardMatrix.length - 2;
        if (this.activeSquiggly.direction === 'horizontal') {
            collision = reachedEnd
                || this.boardMatrix[pos.y + 2][pos.x]
                || this.boardMatrix[pos.y + 2][pos.x - 1]
                || this.boardMatrix[pos.y + 1][pos.x + 1];
        } else {
            collision = reachedEnd
                || this.boardMatrix[pos.y + 1][pos.x]
                || this.boardMatrix[pos.y + 2][pos.x + 1];
        }
        if (collision) {
            !this.activeSquiggly.frozen && setTimeout(() => {
                this.spawnSquiggly();
            }, 500);
            this.activeSquiggly.freeze();
        }
    }
}


export default TetrisBoard;

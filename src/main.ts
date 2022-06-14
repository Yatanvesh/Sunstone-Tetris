import pop from "../pop/index";
import {GameDimensions} from "./constants";
import TetrisBoard from "./entities/TetrisBoard";
import Text from "../pop/Text";

const {Game, KeyControls, Texture, Sprite} = pop;

const game = new Game(GameDimensions.w, GameDimensions.h);
const {scene, w, h} = game;

const controls = new KeyControls();
const board = new TetrisBoard()
scene.add(board);
board.spawnSquiggly();
setInterval(() => {
    board.timedUpdate();
    amount += 100;

}, 1000);

const scholarship = new Text('Scholarship: ₹0', {fill: 'white', font: '14px Courier New'});
scholarship.pos = {x: 4, y: 6};
scene.add(scholarship);
let amount = 0;
game.run((dt, t) => {

    if (controls.x) {
        board.moveHorizontal(controls.x);
        controls.reset()
    } else if (controls.y == 1) {
        board.shift();
        controls.reset()
    } else if (controls.y === -1) {
        board.rotate();
        controls.reset();
    }

    scholarship.text = `Scholarship: ₹${amount}`
    // if(activeTetrimino.reachedBottom) {
    //     activeTetrimino = new Squiggly();
    //     scene.add(activeTetrimino);
    // }
});

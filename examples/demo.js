const { Game, Render, Keyboard } = require('../index');

const game = new Game();

let obj1 = new Render.PixelGroup('1 3 5 7 9', 10, 15);

let obj2 = new Render.PixelGroup('2 4 6 8 0', 10, 15);

new Keyboard().on('key', key => {
    if(key == ' ') return;
    console.log(key);
});
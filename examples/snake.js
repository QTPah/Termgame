const { Game, Keyboard, Render } = require('../index');

const game = new Game();

let snakeLength = 5;

let snakeModel = (() => {
    let r = '';
    for(let i = 0; i < snakeLength - 1; i++) r += 'o';
    return r += '#';
})();

const update = () => {
    let model = new Render.PixelGroup(snakeModel, 0, 0).r;

    let frame = new Render.Frame([...model]);

    game.render(frame);
}

update();
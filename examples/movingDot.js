const { Game, Keyboard, Render } = require('../index');

const game = new Game();

let pos = {
    x: 0,
    y: (process.stdout.rows / 5) + 1
}

const rand = (min, max) => {  
    return Math.floor(Math.random() * (max - min) + min );
}

let target = new Render.Pixel(rand(0, process.stdout.columns - 1), rand((process.stdout.rows / 5) + 1, process.stdout.rows - 2), 'X');
let bar = new Render.PixelGroup((()=>{
    let r = '';
    for(let i = 0; i < process.stdout.columns; i++) r += '=';
    return r;
})(), 0, process.stdout.rows / 5);

let title = new Render.PixelGroup('Capture The Dot', (process.stdout.columns / 2) -7, Math.floor((process.stdout.rows / 5) / 2));

let kb = new Keyboard();

kb.on('key', key => {
    switch(key) {
        case 'w':
            if(pos.y <= (process.stdout.rows / 5) + 1) return;
            pos.y--;
            update();
            break;
        case 'a':
            if(pos.x <= 0) return;
            pos.x--;
            update();
            break;
        case 's':
            if(pos.y >= process.stdout.rows - 2) return;
            pos.y++;
            update();
            break;
        case 'd':
            if(pos.x >= process.stdout.columns - 1) return;
            pos.x++;
            update();
            break;
    }
});

const update = () => {
    let model = new Render.PixelGroup('#', pos.x, pos.y);

    if(pos.x == target.x && pos.y == target.y) {
        target = new Render.Pixel(rand(0, process.stdout.columns - 1), rand((process.stdout.rows / 5) + 1, process.stdout.rows - 2), 'X');
    }

    let frame = new Render.Frame([...title.r, ...bar.r, ...model.r, target]);

    game.render(frame);
}

update();
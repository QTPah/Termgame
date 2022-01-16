// Game of life (zero player game)
const { Game, Render, Keyboard } = require('../index');
const { Pixel } = require('../modules/render');

const game = new Game();

let cells = [];

const objects = [...cells];

let frame = new Render.Frame(objects);

const update = () => {
    frame = new Render.Frame(objects);
    game.render(frame);
}

const selectCells = () => {
    let selector = new Render.Pixel(0, 0, '#');
    objects.unshift(selector);
    update();
    new Keyboard().on('key', key => {
        switch(key) {
            case 'w':
                if(selector.y <= 0) return;
                selector.y--;
                update();
                break;
            case 'a':
                if(selector.x <= 0) return;
                selector.x--;
                update();
                break;
            case 's':
                if(selector.y >= process.stdout.rows - 2) return;
                selector.y++;
                update();
                break;
            case 'd':
                if(selector.x >= process.stdout.columns - 1) return;
                selector.x++;
                update();
                break;
            case 'n':
                nextGen();
                update();
                break;
            case ' ':
                if(objects.find(pixel => pixel.char == 'O' && pixel.x == selector.x && pixel.y == selector.y)) return;
                objects.push(new Pixel(selector.x, selector.y, 'O'));
                update();
                break;
        }
    });
}

const nextGen = () => {

    for(let i = 0; i < objects.length; i++) {
        let neighborCells = objects.filter(object => object.char == 'O').filter(cell =>
        (cell.x == objects[i].x + 1 && cell.y == objects[i].y) ||
        (cell.x == objects[i].x - 1 && cell.y == objects[i].y) ||
        (cell.y == objects[i].y + 1 && cell.x == objects[i].x) ||
        (cell.y == objects[i].y - 1 && cell.x == objects[i].x) ||
        (cell.x == objects[i].x + 1 && cell.y == objects[i].y + 1) ||
        (cell.x == objects[i].x + 1 && cell.y == objects[i].y - 1) ||
        (cell.x == objects[i].x - 1 && cell.y == objects[i].y + 1) || 
        (cell.x == objects[i].x - 1 && cell.y == objects[i].y - 1));

        if(neighborCells.length < 2) objects.splice(i, 1);

        if(neighborCells.length > 3) objects.splice(i, 1);
    }

    let deadCells = [];

    for(let y = 0; y < frame.content.split('\n').length; y++) {
        for(let x = 0; x < frame.content.split('\n')[y].length + 1; x++) {
            if(frame.content.split('\n')[y][x] == ' ') {
                deadCells.push({ x: x, y: y });
            }
        }
    }

    for(let i = 0; i < deadCells.length; i++) {
        let neighborCellsForDead = objects.filter(object => object.char == 'O').filter(cell =>
        (cell.x == deadCells[i].x + 1 && cell.y == deadCells[i].y) ||
        (cell.x == deadCells[i].x - 1 && cell.y == deadCells[i].y) ||
        (cell.y == deadCells[i].y + 1 && cell.x == deadCells[i].x) ||
        (cell.y == deadCells[i].y - 1 && cell.x == deadCells[i].x) ||
        (cell.x == deadCells[i].x + 1 && cell.y == deadCells[i].y + 1) ||
        (cell.x == deadCells[i].x + 1 && cell.y == deadCells[i].y - 1) ||
        (cell.x == deadCells[i].x - 1 && cell.y == deadCells[i].y + 1) || 
        (cell.x == deadCells[i].x - 1 && cell.y == deadCells[i].y - 1));

        //console.log(neighborCellsForDead);
        //console.log(deadCells[i]);

        if(neighborCellsForDead.length == 3) objects.push(new Pixel(deadCells[i].x, deadCells[i].y, 'O'));
    }
    

}

selectCells();
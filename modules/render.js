class Frame {
    /**
     * @param {Array} objects 
     */
    constructor(objects) {
        this.content = "";

        for(let y = 0; y < process.stdout.rows-1; y++) {
            for(let x = 0; x < process.stdout.columns; x++) {
                let found = false;
                for(let i in objects) {
                    if(objects[i].x == x && objects[i].y == y) {
                        this.content += objects[i].char;
                        found = true;
                        break;
                    }
                }
                
                if(found) 
                    found = false;
                else
                    this.content += ' ';
            }
            this.content += '\n';
        }

        this.getPixel = (x, y) => {
            return new Pixel(x, y, this.content.split('\n')[y][x]);
        }
    }
}

class Pixel {
    constructor(x, y, char) {
        this.x = x;
        this.y = y;
        this.char = char[0];
    }
}

class PixelGroup {
    constructor(string, x, y) {
        this.r = [];
        let rows = string.split('\n');
        for(let Y in rows) {
            for(let X in rows[Y]) {
                if(rows[Y][X] !== ' ') {
                    this.r.push(new Pixel(x + parseInt(X, 10), y + parseInt(Y, 10), string.split('\n')[Y][X]));
                }
            }
        }
    }
}

module.exports = { Frame, Pixel, PixelGroup };
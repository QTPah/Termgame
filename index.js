const Keyboard = require('./modules/keyboard'),
      Render = require('./modules/render');

class Game {
    constructor() {

        process.stdin.resume();
        
        /**
         * @param {Render.Frame} frame 
         */
        this.render = (frame) => {
            process.stdout.write(frame.content);
        }

        this.quit = () => {
            process.stdin.destroy();
        }
    }
}

module.exports = { Game, Keyboard, Render };
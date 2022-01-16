class Keyboard extends require('events') {
    constructor() {
        super();

        const stdin = process.stdin;

        stdin.setRawMode(true);

        stdin.resume();

        stdin.setEncoding('utf8');

        stdin.on('data', key => {
            if(key === '\u0003') process.exit();
            
            this.emit('key', key);
        });
    }
}

module.exports = Keyboard;
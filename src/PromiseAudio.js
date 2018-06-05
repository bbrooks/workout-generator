export class PromiseAudio {
    constructor(src, loop) {
        this.audio = new Howl({
            src: ['./sounds/' + src],
            loop
        });
    }
    play() {
        return new Promise(resolve => {
            this.audio.on('end', resolve);
            this.audio.play()
        });
    }
    load() {
        return new Promise(resolve => {
            this.audio.once('load', resolve);
        });  
    }
}
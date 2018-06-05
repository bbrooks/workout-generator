export class PromiseAudio {
    constructor(src) {
        this.audio = new Howl({
            src: ['./sounds/' + src]
        });
    }
    play() {
        return new Promise(resolve => {
            this.audio.on('end', resolve);
            this.audio.play()
        });
    }
}
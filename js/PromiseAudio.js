export class PromiseAudio {
    constructor(src) {
        this.audio = new Audio('./sounds/' + src);
    }
    play() {
        return new Promise(resolve => {
            this.audio.onended = resolve;
            this.audio.play()
        });
    }
}
export default class AudioLoader {
    private context: AudioContext;
    constructor(context: AudioContext) {
        this.context = context;
    }

    public async loadSound(url: string) {
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            return new Promise(resolve => {
                this.context.decodeAudioData(arrayBuffer, resolve);
            });
    };
}
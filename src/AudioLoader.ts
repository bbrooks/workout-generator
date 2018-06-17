export default class AudioLoader {
    private context: AudioContext;
    constructor(context: AudioContext) {
        this.context = context;
    }

    public loadSound(url: string, onLoaded: (b: AudioBuffer) => void) {
            const request = new XMLHttpRequest();
            request.open('get', url, true);
            request.responseType = 'arraybuffer';
            request.onload = () => {
                this.context.decodeAudioData(request.response, onLoaded);
            };
            request.send();
    };
}
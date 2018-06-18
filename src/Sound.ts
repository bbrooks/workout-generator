export default class Sound {
    private context: AudioContext;
    private buffer: AudioBuffer;
    private source: AudioBufferSourceNode;
    private pausedAt: number;
    private startedAt: number;
    // private outstandingResolve: any;

    constructor(context: AudioContext, buffer: AudioBuffer, source: AudioBufferSourceNode) {
        this.context = context;
        this.buffer = buffer;
        this.source = source;
    }

    public setup() {
        if (this.source.buffer) {
            this.source = this.context.createBufferSource();
        }
        this.source.buffer = this.buffer;
        this.source.connect(this.context.destination);
    }

    public play() {
        this.setup();
        this.startedAt = this.context.currentTime;
        this.source.start(this.startedAt, this.pausedAt);

        return new Promise((resolve, reject) => {
            this.source.onended = resolve;
        });
    }

    public pause() {
        const additionalTime = this.pausedAt ? this.pausedAt : 0;
        this.pausedAt = this.context.currentTime - this.startedAt + additionalTime;
        this.source.onended = null;
        this.stop();
    }

    public stop() {
        this.source.stop(this.context.currentTime);
    }
}
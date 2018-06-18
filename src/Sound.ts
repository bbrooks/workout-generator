export default class Sound {
    private context: AudioContext;
    private buffer: AudioBuffer;
    private source: AudioBufferSourceNode;
    private pausedAt: number;
    private startedAt: number;
    private outstandingResolve: any;

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
        if(this.outstandingResolve) {
            return new Promise(resolve => {
                this.source.onended = () => {
                    this.outstandingResolve();
                    this.outstandingResolve = null;
                    resolve();
                };
            });
        } else {
            return new Promise((resolve, reject) => {
                this.outstandingResolve = resolve;
                this.source.onended = resolve;
            });
        }
    }

    public pause() {
        this.pausedAt = this.context.currentTime - this.startedAt;
        this.source.onended = null;
        this.stop();
    }

    public stop() {
        this.source.stop(this.context.currentTime);
    }
}
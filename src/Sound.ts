export default class Sound {
    private context: AudioContext;
    private buffer: AudioBuffer;
    private source: AudioBufferSourceNode;
    private pausedAt: number;
    private startedAt: number;
    private outstandingResolve: null | ((resolvedWith?: any) => void);

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

    public play(loop: boolean = false) {
        this.setup();
        this.startedAt = this.context.currentTime;
        this.source.loop = loop;
        this.source.start(this.startedAt, this.pausedAt);
        
        if (loop) {
            return Promise.resolve();
        }

        if (this.outstandingResolve) {
            return new Promise(resolve => {
                this.source.onended = () => {
                    if(this.outstandingResolve) {
                        this.outstandingResolve();
                    }
                    this.outstandingResolve = null;
                    resolve();
                };
            });
        } else {
            return new Promise((resolve, reject) => {
                this.outstandingResolve = resolve;
                this.source.onended = () => {
                    this.source.onended = null;
                    resolve();
                };
            });
        }
    }

    public pause() {
        const additionalTime = this.pausedAt ? this.pausedAt : 0;
        this.pausedAt = this.context.currentTime - this.startedAt + additionalTime;
        this.source.onended = null;
        this.stop();
    }

    public stop() {
        this.source.stop();
    }
}
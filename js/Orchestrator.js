import { PromiseAudio } from "./PromiseAudio";
import { sounds } from "./sounds";

export class Orchestrator {
    constructor() {
        this.sounds = sounds;
        return this;
    }
    
    async go() {
        // WIP
        await new PromiseAudio(this.sounds.transitions.next).play()
        await new PromiseAudio(this.sounds.exercises['plank']).play()
        await this.wait(2000);
        await new PromiseAudio(this.sounds.exercises['plank']).play()        
        await new PromiseAudio(this.sounds.transitions.go).play()
        await this.wait(5000);
        await new PromiseAudio(this.sounds.transitions.rest).play()
        await new PromiseAudio(this.sounds.transitions.next).play()
        await new PromiseAudio(this.sounds.exercises['crunches']).play()
        await this.wait(2000);
        await new PromiseAudio(this.sounds.exercises['crunches']).play()        
        await new PromiseAudio(this.sounds.transitions.go).play()
        await this.wait(5000);
        await new PromiseAudio(this.sounds.transitions.rest).play()
        await new PromiseAudio(this.sounds.transitions.next).play()
        await new PromiseAudio(this.sounds.exercises['squats']).play()
        await this.wait(2000);
        await new PromiseAudio(this.sounds.exercises['squats']).play()        
        await new PromiseAudio(this.sounds.transitions.go).play()
        await this.wait(5000);
        await new PromiseAudio(this.sounds.transitions.rest).play()
        await new PromiseAudio(this.sounds.transitions.complete).play()
    }

    wait(milliseconds) {
        return new Promise(resolve => {
          setTimeout(() => resolve(milliseconds), milliseconds);
        });
    };
}
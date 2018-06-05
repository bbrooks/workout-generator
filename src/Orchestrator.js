import { PromiseAudio } from "./PromiseAudio";
import { sounds } from "./sounds";

export class Orchestrator {
    constructor() {
        this.restLength = 5 * 1000;
        this.workoutLength = 30 * 1000;
    }
    
    async go() {
        const background = new PromiseAudio(this.getBeat());
        const exercises = this.getExercises();
        // background.audio.loop = true;
        // background.audio.volume = 0.5;
        // background.audio.play()
        for (let i = 0; i < exercises.length; i++) {
            await this.playExercise(exercises[i])
        }
        // background.audio.pause();
        this.play(sounds.transitions.complete);
    }

    wait(milliseconds) {
        return new Promise(resolve => {
          setTimeout(() => resolve(milliseconds), milliseconds);
        });
    };

    shuffle(array) {
        const a = array.slice();
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    getExercises() {
        return this.shuffle(Object.values(sounds.exercises));
    }

    getBeat() {
        const beats = Object.values(sounds.backgrounds);
        return beats[Math.floor(Math.random()*beats.length)];
    }

    async playExercise(path) {
        await this.play(sounds.transitions.next);
        await this.play(path);
        await this.wait(this.restLength);
        await this.play(path);        
        await this.play(sounds.transitions.go);
        await this.wait(this.workoutLength);
        return this.play(sounds.transitions.rest);;
    }

    play(path) {
        return new PromiseAudio(path).play();
    }


}
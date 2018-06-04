import { PromiseAudio } from "./PromiseAudio";
import { sounds } from "./sounds";

export class Orchestrator {
    constructor() {
        this.restLength = 5 * 1000;
        this.workoutLength = 30 * 1000;
    }
    
    async go() {
        const exercises = this.getExercises()
        for (let i = 0; i < exercises.length; i++) {
            await this.playExercise(exercises[i])
        }
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
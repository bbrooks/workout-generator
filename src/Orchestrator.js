import { PromiseAudio } from "./PromiseAudio";
import { sounds } from "./sounds";

export class Orchestrator {
    constructor() {
        this.restLength = 5 * 1000;
        this.workoutLength = 30 * 1000;
        this.exercises = this.getExercises();
        this.background = new PromiseAudio(this.getBeat(), true);
        this.isPlaying = false;
    }

    load() {
        const loadingPromises = this.exercises.map(exercise => new PromiseAudio(exercise).load());
        return Promise.all(loadingPromises);
    }
    
    async go() {
        const background = this.background;
        const exercises = this.exercises;
        const loadingPromises = exercises.map(exercise => new PromiseAudio(exercise).load());
        loadingPromises.push(background.load());
        this.isPlaying = true;
        background.audio.play()
        for (let i = 0; i < exercises.length; i++) {
            await this.playExercise(exercises[i])
        }
        background.audio.pause();
        await this.play(sounds.transitions.complete);
        this.isPlaying = false;
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
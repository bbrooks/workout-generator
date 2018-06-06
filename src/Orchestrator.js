import { sounds, soundsPrefix } from "./sounds";

export class Orchestrator {
    constructor(audioObj) {
        this.exercises = this.getExercisePaths();
        this.audioObj = audioObj;
        this.hasGone = false;
    }

    go() {
        this.hasGone = true;
        this.playSequence(this.getFullSequence());
    }

    shuffle(array) {
        const a = array.slice();
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    getExercisePaths() {
        const shuffled = this.shuffle(Object.values(sounds.exercises));
        return shuffled.map(path => soundsPrefix + path);
    }

    getFullSequence() {
        const sequence = [];
        this.exercises.forEach(excercise => {
            sequence.push(...this.getSingleExerciseSequence(excercise));
        });
        sequence.push(soundsPrefix + sounds.transitions.complete);
        return sequence;
    }

    getSingleExerciseSequence(exercise) {
        return [
            soundsPrefix + sounds.transitions.next,
            exercise,
            soundsPrefix + sounds.transitions["silence-5"],
            exercise,
            soundsPrefix + sounds.transitions.go,
            soundsPrefix + sounds.transitions["silence-30"],
            soundsPrefix + sounds.transitions.rest
        ]
    }

    playSequence(soundPaths) {
        const newSongList = soundPaths.slice();
        const song = newSongList.shift();
        if (song) {
          this.audioObj.src = song;
          this.audioObj.onended = () => {
            this.playSequence(newSongList);
          }
          this.audioObj.play();
        }
    }
}
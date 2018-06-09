import { sounds, exerciseCategories } from "./sounds";

export class Orchestrator {
    constructor(audioObj) {
        this.exercises = this.getExercisePaths();
        this.audioObj = audioObj;
        this.hasGone = false;
        this.rounds = 3;
    }

    go() {
        this.hasGone = true;
        var thing = this.getFullSequence();
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

    // Gets the files paths of the excercises in order
    getExercisePaths() {
        const paths = [];

        // Randomize the different categories, but start with cardio
        let shuffledCategories = this.shuffle(Object.values(exerciseCategories).slice().filter(value => value !== exerciseCategories.cardio));
        shuffledCategories.unshift(exerciseCategories.cardio)
        const exerciseGroups = shuffledCategories.map(category => sounds.excercises[category].slice());

        // Build an excercise list using one from each category for each round, in order of categories
        for(let i = 0; i < 3; i++) {
            exerciseGroups.forEach(exerciseGroup => {
                if(exerciseGroup.length > 1){
                    paths.push(exerciseGroup.shift())
                } else if (exerciseGroup.length === 1){
                    paths.push(exerciseGroup[0])
                }
            });
        }
        return paths;
    }

    // Gets the sequence of sounds needed for the workout,
    // including the transition sounds and breaks.
    getFullSequence() {
        const sequence = [sounds.transitions.welcome];
        this.exercises.forEach(excercise => {
            sequence.push(...this.getSingleExerciseSequence(excercise));
        });
        sequence.push(sounds.transitions.complete);
        return sequence;
    }

    // Gets one exercise sequence, including intro sounds and silence
    getSingleExerciseSequence(exercisePath) {
        return [
            sounds.transitions.next,
            exercisePath,
            sounds.transitions.silence5,
            exercisePath,
            sounds.transitions.go,
            sounds.transitions.silence30,
            sounds.transitions.rest
        ]
    }

    // Plays a sequence of audio paths
    playSequence(soundPaths) {
        const newSoundList = soundPaths.slice();
        const sound = newSoundList.shift();
        if (sound) {
          this.audioObj.src = sound;
          this.audioObj.onended = () => {
            this.playSequence(newSoundList);
          }
          this.audioObj.play();
        }
    }
}
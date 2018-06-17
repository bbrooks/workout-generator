import { DEFAULT_EXERCISE_LENGTH, DEFAULT_ROUNDS } from "./App";
import { exerciseCategories, sounds } from "./sounds";
import { arrayRandom, shuffle } from "./utils";
import Sound from "./Sound";
import AudioLoader from "./AudioLoader";


export class Orchestrator {
    public hasGone: boolean;
    private audioObj: HTMLAudioElement;
    private rounds: number;
    private exerciseLength: number;
    private audioCtx: AudioContext

    constructor(audioObj: HTMLAudioElement) {
        this.audioObj = audioObj;
        this.audioObj.src = sounds.transitions.silence15;
        this.hasGone = false;
        this.rounds = DEFAULT_ROUNDS;
        this.exerciseLength = DEFAULT_EXERCISE_LENGTH;
        this.audioCtx = new AudioContext();
    }

    public setRounds(n: number) {
        this.rounds = n;
    }

    public setExerciseLength(n: number) {
        this.exerciseLength = n;
    }

    public go() {
        const source = this.audioCtx.createBufferSource();
        this.hasGone = true;
        this.audioObj.play();

        this.initializeBackgroundAudio(buffer => {
            const bgAudio = new Sound(this.audioCtx, buffer, source);
            const onPlay = () => bgAudio.isPlaying() || bgAudio.play();
            const onPause = () => this.audioObj.ended || bgAudio.stop();
            this.audioObj.pause();
            this.audioObj.addEventListener('play', onPlay);
            this.audioObj.addEventListener('pause', onPause);
            this.playSequence(this.getFullSequence(), () => {
                bgAudio.stop();
                this.audioObj.removeEventListener('play', onPlay);
                this.audioObj.removeEventListener('pause', onPause);
                this.hasGone = false;
            });
        });
    }

    // Gets the files paths of the excercises in order
    private getExercisePaths(): string[] {
        const paths: string[] = [];

        // Randomize the different categories, but start with cardio
        const shuffledCategories = shuffle(Object.keys(sounds.excercises).slice().filter(key => key !== exerciseCategories.cardio));
        shuffledCategories.unshift(exerciseCategories.cardio)
        const exerciseGroups = shuffledCategories.map(category => shuffle(sounds.excercises[category]));

        // Build an excercise list using one from each category for each round, in order of categories
        for (let i = 0; i < this.rounds; i++) {
            exerciseGroups.forEach(exerciseGroup => {
                if (exerciseGroup.length > 1) {
                    paths.push(exerciseGroup.shift())
                } else if (exerciseGroup.length === 1) {
                    paths.push(exerciseGroup[0])
                }
            });
        }
        return paths;
    }

    private initializeBackgroundAudio(onLoaded: (b: AudioBuffer) => void): void {
        const url = arrayRandom(sounds.backgroundMusic);
        const thing = new AudioLoader(this.audioCtx);
        thing.loadSound(url, onLoaded);
    }

    // Gets the sequence of sounds needed for the workout,
    // including the transition sounds and breaks.
    private getFullSequence() {
        const sequence = [sounds.transitions.welcome];
        this.getExercisePaths().forEach(excercise => {
            sequence.push(...this.getSingleExerciseSequence(excercise));
        });
        sequence.push(sounds.transitions.complete);

        if (sequence.indexOf(undefined!) !== -1) {
            alert('Unexpected Error, try reloading.');
            throw new Error('audio sequence contained undefined paths');
        }

        return sequence;
    }

    // Gets one exercise sequence, including intro sounds and silence
    private getSingleExerciseSequence(exercisePath: string) {
        return [
            sounds.transitions.next,
            exercisePath,
            sounds.transitions.silence5,
            exercisePath,
            sounds.transitions.go,
            sounds.transitions['silence' + this.exerciseLength],
            sounds.transitions.rest
        ]
    }

    // Plays a sequence of audio paths
    private playSequence(soundPaths: string[], onComplete: () => void) {
        const newSoundList = soundPaths.slice();
        const sound = newSoundList.shift();
        if (sound) {
            this.audioObj.src = sound;
            this.audioObj.onended = () => {
                this.playSequence(newSoundList, onComplete);
            }
            this.audioObj.play();
        } else {
            onComplete();
        }
    }
}
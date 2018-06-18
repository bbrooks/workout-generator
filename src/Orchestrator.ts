import { DEFAULT_EXERCISE_LENGTH, DEFAULT_ROUNDS } from "./App";
import { exerciseCategories, sounds } from "./sounds";
import { arrayRandom, shuffle } from "./utils";
import Sound from "./Sound";
import AudioLoader from "./AudioLoader";
import createAudioContext from "./SafeAudioCtx";

export class Orchestrator {
    public isPlaying: boolean;
    private audioObj: HTMLAudioElement;
    private rounds: number;
    private exerciseLength: number;
    private audioCtx: AudioContext

    constructor(audioObj: HTMLAudioElement) {
        this.audioObj = audioObj;
        this.audioObj.src = sounds.transitions.silence15;
        this.isPlaying = false;
        this.rounds = DEFAULT_ROUNDS;
        this.exerciseLength = DEFAULT_EXERCISE_LENGTH;
        this.audioCtx = createAudioContext();
    }

    public setRounds(n: number) {
        this.rounds = n;
    }

    public setExerciseLength(n: number) {
        this.exerciseLength = n;
    }

    public async go() {
        this.isPlaying = true;

        // We have to do some rigamarole before going asynchronous
        // to make sure iOS allows us to play the audio even after
        // a short wait. If we don't do this, iOS will say that
        // the user didn't initiate the play so it's not allowed.
        const audioSource = this.establishPlayPrecedent()

        // Set up the background audio
        const audioBuffer = await this.initializeBackgroundAudio();
        const bgAudio = new Sound(this.audioCtx, audioBuffer, audioSource);

        // Create named callbacks so we can unbind them later
        const playBackgroundAudio = () => bgAudio.isPlaying() || bgAudio.play();
        const pauseBackgroundAudio = () => this.audioObj.ended || bgAudio.stop();
        this.audioObj.addEventListener('play', playBackgroundAudio);
        this.audioObj.addEventListener('pause', pauseBackgroundAudio);

        // Play the sequence of exercise sounds, which
        // will trigger the background audio to start
        await this.playSequence(this.getFullWorkoutSequence());
        bgAudio.stop();

        // Don't listen for background audio events anymore since the
        // workout is over
        this.audioObj.removeEventListener('play', playBackgroundAudio);
        this.audioObj.removeEventListener('pause', pauseBackgroundAudio);

        this.isPlaying = false;
    }

    // If we execute this on a user input, we can then
    // modify the audio object and audio context later
    // when we want to sequence sounds.
    // If we don't do this on user input, then iOS will
    // lock us out of modifying these objects later.
    private establishPlayPrecedent(): AudioBufferSourceNode {
        this.audioObj.play();
        this.audioObj.pause();
        return this.audioCtx.createBufferSource();
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

    // Initiates the web audio api instance that will loop the
    // background audio. In iOS there is a delay between loops
    // if you try to loop an HTMLAudioElement, so this is the
    // only way to get seamless looping on iOS.
    private async initializeBackgroundAudio(): Promise<AudioBuffer> {
        const url = arrayRandom(sounds.backgroundMusic);
        const audioBuffer = await new AudioLoader(this.audioCtx).loadSound(url) as AudioBuffer;
        return audioBuffer;
    }

    // Gets the sequence of sounds needed for the workout,
    // including the transition sounds and breaks.
    private getFullWorkoutSequence() {
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

    // Plays a sequence of audio files
    private async playSequence(soundPaths: string[]): Promise<void> {
        for (const soundPath of soundPaths) {
            this.audioObj.src = soundPath;
            await new Promise(resolve => {
                this.audioObj.onended = resolve;
                this.audioObj.play();
            });
        }
        return Promise.resolve();
    }
}
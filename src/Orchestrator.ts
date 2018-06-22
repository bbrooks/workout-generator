import { DEFAULT_EXERCISE_LENGTH, DEFAULT_ROUNDS } from "./App";
import { exerciseCategories, sounds } from "./sounds";
import { arrayRandom, shuffle } from "./utils";
import Sound from "./Sound";
import AudioLoader from "./AudioLoader";
import createAudioContext from "./SafeAudioCtx";

interface IAudioData {
    buffer: AudioBuffer,
    source: AudioBufferSourceNode
}

export class Orchestrator {
    public isPlaying: boolean;
    public isMidSequence: boolean;
    private rounds: number;
    private exerciseLength: number;
    private audioCtx: AudioContext
    private currentSound: Sound;
    private backgroundMusic: Sound;
    private audioLoader: AudioLoader;

    constructor() {
        this.isPlaying = false;
        this.rounds = DEFAULT_ROUNDS;
        this.exerciseLength = DEFAULT_EXERCISE_LENGTH;
        this.audioCtx = createAudioContext();
        this.audioLoader = new AudioLoader(this.audioCtx);
    }

    public setRounds(n: number) {
        this.rounds = n;
    }

    public setExerciseLength(n: number) {
        this.exerciseLength = n;
    }

    public async go(onFinished: () => void) {
        this.isMidSequence = true;

        // We have to do some rigamarole before going asynchronous
        // to make sure iOS allows us to play the audio even after
        // a short wait. If we don't do this, iOS will say that
        // the user didn't initiate the play so it's not allowed.
        this.setPlayPrecedent();
        
        // Set up the background audio
        const audioSource = this.audioCtx.createBufferSource();
        const audioBuffer = await this.initializeBackgroundAudio();
        this.backgroundMusic = new Sound(this.audioCtx, audioBuffer, audioSource);

        // Get this party started
        this.isPlaying = true;
        this.backgroundMusic.play(true);
        await this.playSequence(this.getFullWorkoutSequence());
        this.backgroundMusic.stop();
        delete this.backgroundMusic;
        delete this.currentSound;
        this.isPlaying = false;
        this.isMidSequence = false;
        onFinished();
    }

    public resume() {
        if(this.currentSound && this.backgroundMusic) {
            this.currentSound.play();
            this.backgroundMusic.play(true);
            this.isPlaying = true;
        }
    }

    public pause() {
        if(this.currentSound && this.backgroundMusic) {
            this.currentSound.pause();
            this.backgroundMusic.stop();
            this.isPlaying = false;
        }
    }

    private setPlayPrecedent() {
        const silence = new Audio(sounds.transitions.silence5);
        silence.play();
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
        const audioBuffer = await this.audioLoader.loadSound(url) as AudioBuffer;
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
        const audioDataList: IAudioData[] = [];

        for (const url of soundPaths) {
            const source = this.audioCtx.createBufferSource();
            const buffer = await this.audioLoader.loadSound(url) as AudioBuffer;
            audioDataList.push({
                buffer,
                source
            });
        }

        const soundsArray: Sound[] = audioDataList.map((audioData) => {
            return new Sound(this.audioCtx, audioData.buffer, audioData.source)
        });

        for (const sound of soundsArray) {
            this.currentSound = sound;
            await sound.play();
        }

        return Promise.resolve();
    }
}
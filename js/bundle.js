(function () {
    'use strict';

    const exerciseCategories = {
        cardio: 'cardio',
        upperBody: 'upper-body',
        lowerBody: 'lower-body',
        core: 'core'
    };

    const sounds = {
        transitions: {
            welcome: './sounds/transitions/welcome.mp3',
            next: './sounds/transitions/next.mp3',
            go: './sounds/transitions/go.mp3',
            complete: './sounds/transitions/complete.mp3',
            rest: './sounds/transitions/rest.mp3',
            silence5: './sounds/transitions/silence-5.mp3',
            silence30: './sounds/transitions/silence-30.mp3'
        },
        backgroundMusic: [
            './sounds/background-music/wall-sit.mp3',
        ],
        excercises: {
            [exerciseCategories.cardio]: [
                './sounds/cardio/bear-crawl.mp3',
                './sounds/cardio/box-jump.mp3',
                './sounds/cardio/burpee.mp3',
                './sounds/cardio/butt-kicks.mp3',
                './sounds/cardio/chair-steps.mp3',
                './sounds/cardio/high-knees.mp3',
                './sounds/cardio/jacks.mp3',
                './sounds/cardio/lateral-balance-jump.mp3',
                './sounds/cardio/long-jumps.mp3',
                './sounds/cardio/march.mp3',
                './sounds/cardio/side-shuffle.mp3',
                './sounds/cardio/skip.mp3',
                './sounds/cardio/stand-and-box.mp3',
                './sounds/cardio/starfish-jacks.mp3',
            ],
            [exerciseCategories.core]: [
                './sounds/core/crunches.mp3',
                './sounds/core/kettlebell-swing.mp3',
                './sounds/core/plank-alternate-arms.mp3',
                './sounds/core/plank.mp3',
                './sounds/core/side-plank-lifts.mp3',
                './sounds/core/snow-angel-situp.mp3',
                './sounds/core/superman.mp3',
            ],
           [exerciseCategories.upperBody]: [
                './sounds/upper-body/bent-over-row.mp3',
                './sounds/upper-body/bicep-curl.mp3',
                './sounds/upper-body/farmer-carry.mp3',
                './sounds/upper-body/push-ups.mp3',
                './sounds/upper-body/pushup-rotate.mp3',
                './sounds/upper-body/pushup-row.mp3',
                './sounds/upper-body/pushups-triangle.mp3',
                './sounds/upper-body/pushups-wide.mp3',
                './sounds/upper-body/tricep-dips.mp3',
            ],
            [exerciseCategories.lowerBody]: [
                './sounds/lower-body/heel-lifts.mp3',
                './sounds/lower-body/lunges.mp3',
                './sounds/lower-body/mountain-climbers.mp3',
                './sounds/lower-body/reverse-lunge-core-twist.mp3',
                './sounds/lower-body/side-lunges.mp3',
                './sounds/lower-body/squats.mp3',
                './sounds/lower-body/wall-sit.mp3',
            ]
        }
    };

    class Orchestrator {
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
            shuffledCategories.unshift(exerciseCategories.cardio);
            const exerciseGroups = shuffledCategories.map(category => this.shuffle(sounds.excercises[category]));

            // Build an excercise list using one from each category for each round, in order of categories
            for(let i = 0; i < 3; i++) {
                exerciseGroups.forEach(exerciseGroup => {
                    if(exerciseGroup.length > 1){
                        paths.push(exerciseGroup.shift());
                    } else if (exerciseGroup.length === 1){
                        paths.push(exerciseGroup[0]);
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
              };
              this.audioObj.play();
            }
        }
    }

    (() => {
        const loadingWrap = document.getElementById('loading-wrap');
        const loadedWrap = document.getElementById('loaded-wrap');
        const audioEl = document.getElementById('audio-el');
        const o = new Orchestrator(audioEl);
        audioEl.onplay = () => {
            if(!o.hasGone) {
                o.go();
            }
        };
        loadingWrap.hidden = true;
        loadedWrap.hidden = false;
    })();

}());

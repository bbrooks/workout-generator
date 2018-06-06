(function () {
    'use strict';

    const sounds = {
        'transitions': {
            'next': 'next.mp3',
            'go': 'go.mp3',
            'complete': 'complete.mp3',
            'rest': 'rest.mp3',
            'silence-5': 'silence-5.mp3',
            'silence-30': 'silence-30.mp3'
        },
        'exercises': {
            'chair-steps': 'chair-steps.mp3',
            'crunches': 'crunches.mp3',
            'high-knees': 'high-knees.mp3',
            'jumping-jacks': 'jacks.mp3',
            'lunges': 'lunges.mp3',
            'plank': 'plank.mp3',
            'push-ups': 'push-ups.mp3',
            'push-up-rotate': 'pushup-rotate.mp3',  
            'squats': 'squats.mp3',
            'tricep-dips': 'tricep-dips.mp3',
            'wall-sit': 'wall-sit.mp3'
        },
        'backgrounds': {
            'beat1': 'beat1.mp3',
        }
    };

    const soundsPrefix = './sounds/';

    class Orchestrator {
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

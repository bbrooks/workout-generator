(function () {
    'use strict';

    class PromiseAudio {
        constructor(src) {
            this.audio = new Howl({
                src: ['./sounds/' + src]
            });
        }
        play() {
            return new Promise(resolve => {
                this.audio.on('end', resolve);
                this.audio.play();
            });
        }
    }

    const sounds = {
        'transitions': {
            'next': 'next.mp3',
            'go': 'go.mp3',
            'complete': 'complete.mp3',
            'rest': 'rest.mp3'
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

    class Orchestrator {
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
                await this.playExercise(exercises[i]);
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
            return this.play(sounds.transitions.rest);    }

        play(path) {
            return new PromiseAudio(path).play();
        }


    }

    document.getElementById('trigger')
        .addEventListener('click', () => {
            const o = new Orchestrator;
            o.go();
        });

}());

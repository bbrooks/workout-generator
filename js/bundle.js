(function () {
    'use strict';

    class PromiseAudio {
        constructor(src, loop) {
            this.audio = new Howl({
                src: ['./sounds/' + src],
                loop
            });
        }
        play() {
            return new Promise(resolve => {
                this.audio.on('end', resolve);
                this.audio.play();
            });
        }
        load() {
            return new Promise(resolve => {
                this.audio.once('load', resolve);
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
            background.audio.play();
            for (let i = 0; i < exercises.length; i++) {
                await this.playExercise(exercises[i]);
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
            return this.play(sounds.transitions.rest);    }

        play(path) {
            return new PromiseAudio(path).play();
        }


    }

    (async () => {
        const loadingWrap = document.getElementById('loading-wrap');
        const loadedWrap = document.getElementById('loaded-wrap');
        const playBtn = document.getElementById('play-btn');
        const o = new Orchestrator;
        playBtn.addEventListener('click', () => {
            if(!o.isPlaying) {
                o.go();
                playBtn.classList.add('stop');
            } else {
                window.location.reload();
            }
        });
        await Promise.all([o.load(), o.wait(500)]);
        loadingWrap.hidden = true;
        loadedWrap.hidden = false;
    })();

}());

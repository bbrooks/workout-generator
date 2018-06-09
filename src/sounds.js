export const exerciseCategories = {
    cardio: 'cardio',
    upperBody: 'upper-body',
    lowerBody: 'lower-body',
    core: 'core'
}

export const sounds = {
    transitions: {
        welcome: '/sounds/transitions/welcome.mp3',
        next: '/sounds/transitions/next.mp3',
        go: '/sounds/transitions/go.mp3',
        complete: '/sounds/transitions/complete.mp3',
        rest: '/sounds/transitions/rest.mp3',
        silence5: '/sounds/transitions/silence-5.mp3',
        silence30: '/sounds/transitions/silence-30.mp3'
    },
    backgroundMusic: [
        '/sounds/background-music/wall-sit.mp3',
    ],
    excercises: {
        [exerciseCategories.cardio]: [
            '/sounds/cardio/bear-crawl.mp3',
            '/sounds/cardio/box-jump.mp3',
            '/sounds/cardio/burpee.mp3',
            '/sounds/cardio/butt-kicks.mp3',
            '/sounds/cardio/chair-steps.mp3',
            '/sounds/cardio/high-knees.mp3',
            '/sounds/cardio/jacks.mp3',
            '/sounds/cardio/lateral-balance-jump.mp3',
            '/sounds/cardio/long-jumps.mp3',
            '/sounds/cardio/march.mp3',
            '/sounds/cardio/side-shuffle.mp3',
            '/sounds/cardio/skip.mp3',
            '/sounds/cardio/stand-and-box.mp3',
            '/sounds/cardio/starfish-jacks.mp3',
        ],
        [exerciseCategories.core]: [
            '/sounds/core/crunches.mp3',
            '/sounds/core/kettlebell-swing.mp3',
            '/sounds/core/plank-alternate-arms.mp3',
            '/sounds/core/plank.mp3',
            '/sounds/core/side-plank-lifts.mp3',
            '/sounds/core/snow-angel-situp.mp3',
            '/sounds/core/superman.mp3',
        ],
       [exerciseCategories.upperBody]: [
            '/sounds/upper-body/bent-over-row.mp3',
            '/sounds/upper-body/bicep-curl.mp3',
            '/sounds/upper-body/farmer-carry.mp3',
            '/sounds/upper-body/push-ups.mp3',
            '/sounds/upper-body/pushup-rotate.mp3',
            '/sounds/upper-body/pushup-row.mp3',
            '/sounds/upper-body/pushups-triangle.mp3',
            '/sounds/upper-body/pushups-wide.mp3',
            '/sounds/upper-body/tricep-dips.mp3',
        ],
        [exerciseCategories.lowerBody]: [
            '/sounds/lower-body/heel-lifts.mp3',
            '/sounds/lower-body/lunges.mp3',
            '/sounds/lower-body/mountain-climbers.mp3',
            '/sounds/lower-body/reverse-lunge-core-twist.mp3',
            '/sounds/lower-body/side-lunges.mp3',
            '/sounds/lower-body/squats.mp3',
            '/sounds/lower-body/wall-sit.mp3',
        ]
    }
}
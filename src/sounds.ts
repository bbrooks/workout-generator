export const exerciseCategories = {
    cardio: 'cardio',
    core: 'core',
    lowerBody: 'lower-body',
    upperBody: 'upper-body',
}

export const sounds = {
    backgroundMusic: [
        process.env.PUBLIC_URL + '/sounds/background-music/wall-sit.mp3',
    ],
    excercises: {
        [exerciseCategories.cardio]: [
            process.env.PUBLIC_URL + '/sounds/cardio/bear-crawl.mp3',
            process.env.PUBLIC_URL + '/sounds/cardio/box-jump.mp3',
            process.env.PUBLIC_URL + '/sounds/cardio/burpee.mp3',
            process.env.PUBLIC_URL + '/sounds/cardio/butt-kicks.mp3',
            process.env.PUBLIC_URL + '/sounds/cardio/chair-steps.mp3',
            process.env.PUBLIC_URL + '/sounds/cardio/high-knees.mp3',
            process.env.PUBLIC_URL + '/sounds/cardio/jacks.mp3',
            process.env.PUBLIC_URL + '/sounds/cardio/lateral-balance-jump.mp3',
            process.env.PUBLIC_URL + '/sounds/cardio/long-jumps.mp3',
            process.env.PUBLIC_URL + '/sounds/cardio/march.mp3',
            process.env.PUBLIC_URL + '/sounds/cardio/side-shuffle.mp3',
            process.env.PUBLIC_URL + '/sounds/cardio/skip.mp3',
            process.env.PUBLIC_URL + '/sounds/cardio/stand-and-box.mp3',
            process.env.PUBLIC_URL + '/sounds/cardio/starfish-jacks.mp3',
        ],
        [exerciseCategories.core]: [
            process.env.PUBLIC_URL + '/sounds/core/crunches.mp3',
            process.env.PUBLIC_URL + '/sounds/core/kettlebell-swing.mp3',
            process.env.PUBLIC_URL + '/sounds/core/plank-alternate-arms.mp3',
            process.env.PUBLIC_URL + '/sounds/core/plank.mp3',
            process.env.PUBLIC_URL + '/sounds/core/side-plank-lifts.mp3',
            process.env.PUBLIC_URL + '/sounds/core/snow-angel-situp.mp3',
            process.env.PUBLIC_URL + '/sounds/core/superman.mp3',
        ],
       [exerciseCategories.upperBody]: [
            process.env.PUBLIC_URL + '/sounds/upper-body/bent-over-row.mp3',
            process.env.PUBLIC_URL + '/sounds/upper-body/bicep-curl.mp3',
            process.env.PUBLIC_URL + '/sounds/upper-body/farmer-carry.mp3',
            process.env.PUBLIC_URL + '/sounds/upper-body/push-ups.mp3',
            process.env.PUBLIC_URL + '/sounds/upper-body/pushup-rotate.mp3',
            process.env.PUBLIC_URL + '/sounds/upper-body/pushup-row.mp3',
            process.env.PUBLIC_URL + '/sounds/upper-body/pushups-triangle.mp3',
            process.env.PUBLIC_URL + '/sounds/upper-body/pushups-wide.mp3',
            process.env.PUBLIC_URL + '/sounds/upper-body/tricep-dips.mp3',
        ],
        [exerciseCategories.lowerBody]: [
            process.env.PUBLIC_URL + '/sounds/lower-body/heel-lifts.mp3',
            process.env.PUBLIC_URL + '/sounds/lower-body/lunges.mp3',
            process.env.PUBLIC_URL + '/sounds/lower-body/mountain-climbers.mp3',
            process.env.PUBLIC_URL + '/sounds/lower-body/reverse-lunge-core-twist.mp3',
            process.env.PUBLIC_URL + '/sounds/lower-body/side-lunges.mp3',
            process.env.PUBLIC_URL + '/sounds/lower-body/squats.mp3',
            process.env.PUBLIC_URL + '/sounds/lower-body/wall-sit.mp3',
        ]
    },
    transitions: {
        complete: process.env.PUBLIC_URL +'/sounds/transitions/complete.mp3',
        go: process.env.PUBLIC_URL +'/sounds/transitions/go.mp3',
        next: process.env.PUBLIC_URL +'/sounds/transitions/next.mp3',
        rest: process.env.PUBLIC_URL +'/sounds/transitions/rest.mp3',
        silence30: process.env.PUBLIC_URL +'/sounds/transitions/silence-30.mp3',
        silence5: process.env.PUBLIC_URL +'/sounds/transitions/silence-5.mp3',
        welcome: process.env.PUBLIC_URL +'/sounds/transitions/welcome.mp3',
    },

}
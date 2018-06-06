import { Orchestrator } from './Orchestrator';

(() => {
    const loadingWrap = document.getElementById('loading-wrap');
    const loadedWrap = document.getElementById('loaded-wrap');
    const audioEl = document.getElementById('audio-el')
    const o = new Orchestrator(audioEl);
    audioEl.onplay = () => {
        if(!o.hasGone) {
            o.go();
        }
    }
    loadingWrap.hidden = true;
    loadedWrap.hidden = false;
})();
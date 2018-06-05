import { Orchestrator } from './Orchestrator';
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
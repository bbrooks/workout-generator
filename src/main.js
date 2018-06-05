import { Orchestrator } from './Orchestrator';

document.getElementById('trigger')
    .addEventListener('click', () => {
        const o = new Orchestrator;
        o.go();
    });

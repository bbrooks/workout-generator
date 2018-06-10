import * as React from 'react';
import './App.css';
import { Orchestrator } from './Orchestrator';
import PlayButton from './PlayButton';
import Settings, { IFormSettings } from './Settings';

interface IState {
  playing: boolean;
  rounds: number;
}

const DEFAULT_ROUNDS = 3;

class App extends React.Component {
  public state: IState
  private audioEl: HTMLAudioElement;
  private orchestrator: Orchestrator;

  constructor(props: any) {
    super(props);
    this.audioEl = new Audio();
    this.state = { 
      playing: false,
      rounds: DEFAULT_ROUNDS
    };
    this.orchestrator = new Orchestrator(this.audioEl);
    this.orchestrator.setRounds(this.state.rounds);
    this.handleClick = this.handleClick.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.setRounds = this.setRounds.bind(this);
    this.audioEl.onplay = this.handlePlay;
    this.audioEl.onpause = this.handlePause;
  }
  public render() {
    const formSettings: IFormSettings = {
      roundSetter: this.setRounds,
      rounds: this.state.rounds,
    };

    return (
      <>
        <Settings formSettings={formSettings} />
        <PlayButton onClick={this.handleClick} playing={this.state.playing} />
      </>
    );
  }

  public handlePlay() {
    this.setState({ playing: true })
  }
  public handlePause() {
    this.setState({ playing: false })
  }

  public handleClick() {
    if (!this.orchestrator.hasGone) {
      this.orchestrator.go();
    } else {
      if (this.audioEl.paused) {
        this.audioEl.play();
      } else {
        this.audioEl.pause();
      }
    }
  }
  
  public setRounds(n: number) {
    this.setState({rounds: n});
    this.orchestrator.setRounds(n);
  }
  
}


export default App;

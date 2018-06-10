import * as React from 'react';
import './App.css';
import { Orchestrator } from './Orchestrator';
import PlayButton from './PlayButton';

interface IState {
  playing: boolean
}

class App extends React.Component {
  public state: IState
  private audioEl: HTMLAudioElement;
  private orchestrator: Orchestrator;
  constructor(props: any) {
    super(props);
    this.audioEl = new Audio();
    this.orchestrator = new Orchestrator(this.audioEl);
    this.handleClick = this.handleClick.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.state = { playing: false }
    this.audioEl.onplay = this.handlePlay;
    this.audioEl.onpause = this.handlePause;
  }
  public render() {
    return (
      <PlayButton onClick={this.handleClick} playing={this.state.playing} />
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
}

export default App;

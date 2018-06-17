import * as React from 'react';
import './App.css';
import BasicSettings, { IFormSettings } from './BasicSettings';
import { Orchestrator } from './Orchestrator';
import PlayButton from './PlayButton';

interface IState {
  playing: boolean;
  rounds: number;
  exerciseLength: number,
  loading: boolean
}

export const DEFAULT_ROUNDS = 3;
export const DEFAULT_EXERCISE_LENGTH = 30;

class App extends React.Component {
  public state: IState
  private audioEl: HTMLAudioElement;
  private orchestrator: Orchestrator;

  constructor(props: any) {
    super(props);
    this.audioEl = new Audio();
    this.state = { 
      exerciseLength: DEFAULT_EXERCISE_LENGTH,
      playing: false,
      rounds: DEFAULT_ROUNDS,
      loading: false
    };

    this.bindFunctions();
    this.initAudioBindings(this.audioEl);

    this.orchestrator = this.initNewOrchestrator();
  }
  
  public render() {
    const formSettings: IFormSettings = {
      exerciseLength: this.state.exerciseLength,
      exerciseLengthSetter: this.handleExerciseLengthChange,
      roundSetter: this.handleRoundsChange,
      rounds: this.state.rounds,
    };

    return (
      <>
        {this.state.loading ||
          <>
            <PlayButton onClick={this.handlePlayControlClick} playing={this.state.playing} />
            <BasicSettings formSettings={formSettings} />
          </>
        }
        {this.state.loading && 
          <>
            <div className="loading-spinner" />
            <div>Loading Workout...</div>
          </>
        }
      </>
    );
  }

  public handlePlay() {
    this.setState({ playing: true })
  }
  public handlePause() {
    this.setState({ playing: false })
  }

  public async handlePlayControlClick() {
    if (!this.orchestrator.isPlaying) {
        this.setState({loading: true});
        const workoutSquence = await this.orchestrator.loadNewWorkoutSequence();
        this.setState({loading: false});
        this.orchestrator.go(workoutSquence);
    } else {
      if (this.audioEl.paused) {
        this.audioEl.play();
      } else {
        this.audioEl.pause();
      }
    }
  }

  public stop() {
    this.orchestrator.reset()
    this.setState({playing: false});
  }
  
  public setRounds(n: number) {
    this.setState({rounds: n});
    this.orchestrator.setRounds(n);
  }

  public handleRoundsChange(n: number) {
    this.setRounds(n);
    this.stop();
  }

  public setExerciseLength(n: number) {
    this.setState({exerciseLength: n});
    this.orchestrator.setExerciseLength(n);
  }
  
  public handleExerciseLengthChange(n: number) {
    this.setExerciseLength(n);
    this.stop();
  }

  private initNewOrchestrator() {
    const o = new Orchestrator(this.audioEl);
    o.setRounds(this.state.rounds);
    o.setExerciseLength(this.state.exerciseLength);
    return o;
  }

  private bindFunctions() {
    this.handlePlayControlClick = this.handlePlayControlClick.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleRoundsChange = this.handleRoundsChange.bind(this);
    this.handleExerciseLengthChange = this.handleExerciseLengthChange.bind(this);
  }

  private initAudioBindings(audioEl: HTMLAudioElement) {
    audioEl.onplay = this.handlePlay;
    audioEl.onpause = this.handlePause;
  }
}


export default App;

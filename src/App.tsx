import * as React from 'react';
import './App.css';
import BasicSettings, { IFormSettings } from './BasicSettings';
import { Orchestrator } from './Orchestrator';
import PlayButton from './PlayButton';

interface IState {
  playing: boolean;
  rounds: number;
  exerciseLength: number
}

export const DEFAULT_ROUNDS = 3;
export const DEFAULT_EXERCISE_LENGTH = 30;

class App extends React.Component {
  public state: IState
  private orchestrator: Orchestrator;

  constructor(props: any) {
    super(props);
    this.state = {
      exerciseLength: DEFAULT_EXERCISE_LENGTH,
      playing: false,
      rounds: DEFAULT_ROUNDS,
    };

    this.orchestrator = new Orchestrator();
    this.orchestrator.setRounds(this.state.rounds);
    this.orchestrator.setExerciseLength(this.state.exerciseLength);
    this.handleClick = this.handleClick.bind(this);
    this.setRounds = this.setRounds.bind(this);
    this.setExerciseLength = this.setExerciseLength.bind(this);
  }

  public render() {
    const formSettings: IFormSettings = {
      exerciseLength: this.state.exerciseLength,
      exerciseLengthSetter: this.setExerciseLength,
      roundSetter: this.setRounds,
      rounds: this.state.rounds,
    };

    return (
      <>
        <PlayButton onClick={this.handleClick} playing={this.state.playing} />
        <BasicSettings formSettings={formSettings} />
      </>
    );
  }

  public handleClick() {
    if (this.orchestrator.isMidSequence) {
      if (this.orchestrator.isPlaying) {
        this.orchestrator.pause();
        this.setState({ playing: false });
      } else {
        this.orchestrator.resume();
        this.setState({ playing: true });
      }
    } else {
      this.setState({ playing: true });
      this.orchestrator.go(() => {
        this.setState({ playing: false });
      });
      
    }
  }

  public setRounds(n: number) {
    this.setState({ rounds: n });
    this.orchestrator.setRounds(n);
  }

  public setExerciseLength(n: number) {
    this.setState({ exerciseLength: n });
    this.orchestrator.setExerciseLength(n);
  }

}

export default App;

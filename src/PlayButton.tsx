import * as React from 'react';
import pauseIcon from './img/pause.svg';
import playIcon from './img/play.svg';

interface IProps {
    playing: boolean
    onClick: any;
}

class PlayButton extends React.Component<IProps> {
    public render() {
        return (
            <button onClick={this.props.onClick}>
                {this.props.playing ? 
                    <img src={pauseIcon} width="120" alt="Pause" title="Pause" />
                    :
                    <img src={playIcon} width="120" alt="Play" title="Play" />
                }
            </button>
        );
    }
}

export default PlayButton;

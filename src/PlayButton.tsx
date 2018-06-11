import * as React from 'react';
import pauseIcon from './img/pause.svg';
import playIcon from './img/play.svg';

interface IProps {
    playing: boolean
    onClick: any;
}

const iconWidth = 120;

class PlayButton extends React.Component<IProps> {
    public render() {
        return (
            <button onClick={this.props.onClick}>
                {this.props.playing ? 
                    <img src={pauseIcon} width={iconWidth} alt="Pause" title="Pause" />
                    :
                    <img src={playIcon} width={iconWidth} alt="Play" title="Play" />
                }
            </button>
        );
    }
}

export default PlayButton;

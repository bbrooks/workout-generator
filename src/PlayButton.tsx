import * as React from 'react';
import { emojiEnabled } from './utils';

interface IProps {
    playing: boolean
    onClick: any;
}

const playText = emojiEnabled() ? "▶" : "Play"
const pauseText = emojiEnabled() ? "⏸" : "Pause"

class PlayButton extends React.Component<IProps> {
    public render() {
        return (
            <button style={{ fontSize: 120 }} onClick={this.props.onClick}>
                {this.props.playing ? pauseText : playText}
            </button>
        );
    }
}

export default PlayButton;

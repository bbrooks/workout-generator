import * as React from 'react';
import { FaPauseCircle, FaPlayCircle } from 'react-icons/lib/fa';

interface IProps {
    playing: boolean
    onClick: any;
}

class PlayButton extends React.Component<IProps> {
    public render() {
        return (
            <button style={{ fontSize: 120 }} onClick={this.props.onClick}>
                {this.props.playing ? <FaPauseCircle /> : <FaPlayCircle />}
            </button>
        );
    }
}

export default PlayButton;

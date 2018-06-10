import * as React from 'react';
import * as Modal from 'react-modal';
import SettingsForm from './SettingsForm';
import { emojiEnabled } from './utils';

interface IState {
    modalIsOpen: boolean;
}

export interface IFormSettings {
    rounds: number;
    roundSetter: any;
}

interface IProps {
    formSettings: IFormSettings
}

const customStyles: Modal.Styles = {
    content: {
        color: 'black',
        textAlign: 'left'
    }
};

const settingsIcon = emojiEnabled() ? "⚙️" : 'Settings';
const settingsIconStyle: React.CSSProperties = {
    fontSize: 60,
    position: 'absolute',
    right: 10,
    top: 10,
};

const closeBtnStyle: React.CSSProperties = {
    color: 'black',
    fontSize: 20,
    position: 'absolute',
    right: 10,
    top: 10,
}

Modal.setAppElement('#root')

class Settings extends React.Component<IProps> {
    public state: IState;

    constructor(props: IProps) {
        super(props);

        this.state = {
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    public openModal() {
        this.setState({ modalIsOpen: true });
    }

    public closeModal() {
        this.setState({ modalIsOpen: false });
    }

    public render() {
        return (
            <div>
                <button 
                    style={settingsIconStyle}
                    onClick={this.openModal}>{settingsIcon}
                </button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                >
                    <button 
                        style={closeBtnStyle}
                        onClick={this.closeModal}
                    >
                        𝕏
                    </button>
                    <h3>Settings</h3>
                    <SettingsForm {...this.props.formSettings} />
                </Modal>
            </div>
        );
    }
}

export default Settings;
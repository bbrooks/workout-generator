import * as React from 'react';
import { DEFAULT_EXERCISE_LENGTH, DEFAULT_ROUNDS } from './App';
import { intVal } from './utils';

export interface IFormSettings {
    rounds: number;
    roundSetter: any;
    exerciseLength: number;
    exerciseLengthSetter: any;
}

interface IProps {
    formSettings: IFormSettings
}

interface IOption {
    value: number;
    label: string;
}

const possibleRoundCounts = [1,2,3,4,5];
const roundCountOptions: IOption[] = possibleRoundCounts.map(n => {
    return {
        label: (n * 4) + " exercises",
        value: n,
    }
});

const possibleExcerciseLengths = [15,30,45,60];
const exerciseLengthOptions: IOption[] = possibleExcerciseLengths.map(n => {
    return {
        label: n + " seconds",
        value: n,
    }
});

const selectStyle: React.CSSProperties = {
    MozAppearance: 'none',
    WebkitAppearance: 'none',
    background: 'none',
    border: 'none',
    borderBottom: '1px dashed #EFEFEF',
    borderRadius: 0,
    boxShadow: 'none',
    color: "inherit",
    font: 'inherit',
    fontSize: 'inherit',
    textIndent: '0.01px',
    textOverflow: "",
    width: 'auto',
}

const textStyle: React.CSSProperties = {
    fontSize: 26,
    lineHeight: 1.5
};


class BasicSettings extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props);
        this.roundsChangeHandler = this.roundsChangeHandler.bind(this);
        this.exerciseLengthChangeHandler = this.exerciseLengthChangeHandler.bind(this);
    }

    public render() {
        return (
            <p style={textStyle}>
                <span>I want to do </span>
                <select 
                    style={selectStyle} 
                    onChange={this.roundsChangeHandler}
                    defaultValue={String(this.props.formSettings.rounds)}
                >
                    {
                        roundCountOptions.map(o => (
                            <option 
                                key={o.value}
                                value={o.value}
                            >
                                {o.label}
                            </option>
                        ))
                    }
                </select>
                <span><br />for </span>
                    <select 
                        style={selectStyle} 
                        onChange={this.exerciseLengthChangeHandler}
                        defaultValue={String(this.props.formSettings.exerciseLength)}
                    >
                        {
                            exerciseLengthOptions.map(o => (
                                <option 
                                    key={o.value}
                                    value={o.value}
                                >
                                    {o.label}
                                </option>
                            ))
                        }
                    </select>
                <span> each. </span>
            </p>
        );
    }

    public roundsChangeHandler(e: any) {
        this.props.formSettings.roundSetter(intVal(e.target.value, DEFAULT_ROUNDS));
    }

    public exerciseLengthChangeHandler(e: any) {
        this.props.formSettings.exerciseLengthSetter(intVal(e.target.value, DEFAULT_EXERCISE_LENGTH));
    }
}

export default BasicSettings;
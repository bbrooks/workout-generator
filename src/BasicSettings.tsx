import * as React from 'react';

export interface IFormSettings {
    rounds: number;
    roundSetter: any;
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
        label: n + " rounds",
        value: n,
    }
});

const selectStyle: React.CSSProperties = {
    MozAppearance: 'none',
    WebkitAppearance: 'none',
    background: 'none',
    border: 'none',
    borderBottom: '1px dashed #EFEFEF',
    boxShadow: 'none',
    color: "inherit",
    font: 'inherit',
    fontSize: 'inherit',
    textIndent: '0.01px',
    textOverflow: "",
    width: 'auto',
}


class BasicSettings extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props);
        this.roundsChangeHandler = this.roundsChangeHandler.bind(this);
    }

    public render() {
        return (
            <p>
                <span>I want to exercise for </span>
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
            </p>
        );
    }

    public roundsChangeHandler(e: any) {
        let value = parseInt(e.target.value, 10);
        value = isNaN(value) ? 3 : value;
        this.props.formSettings.roundSetter(value);
    }
}

export default BasicSettings;
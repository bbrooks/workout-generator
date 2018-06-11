// import * as React from 'react';
// import { IFormSettings } from './Settings';

// const inputStyle: React.CSSProperties = {
//     borderRadius: 4,
//     fontSize: 15,
//     fontWeight: 500,
//     padding: '5px 10px',
// }

// class SettingsForm extends React.Component<IFormSettings> {

//     constructor(props: IFormSettings) {
//         super(props);
//         this.onRoundsChange = this.onRoundsChange.bind(this);
//     }

//     public render() {
//         return (
//             <>
//                 <p>
//                     <label>Rounds</label>
//                 </p>
//                 <p>
//                     <input type="number" style={inputStyle} value={this.props.rounds} onChange={this.onRoundsChange} />
//                 </p>
//             </>
//         );
//     }

//     public onRoundsChange(e: any) {
//         let value = parseInt(e.target.value, 10);
//         value = isNaN(value) ? 0 : value;
//         this.props.roundSetter(value);
//     }
// }

// export default SettingsForm;
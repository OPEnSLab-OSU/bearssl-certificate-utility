import React from "react";

export interface IInputFieldsProps {
    inputs: { [label: string]: string };
    descriptions: string[];
    legend?: string;
    onChange: (input: { [label: string]: string }) => void;
}

export default class InputFields extends React.Component<IInputFieldsProps> {

    private handleChange = ((event: React.ChangeEvent<HTMLInputElement>) => {
        // return an object containing the label and new value to the callback
        let obj: { [label: string]: string } = {};
        obj[event.target.id] = event.target.value;
        this.props.onChange(obj);
    });

    render() {
        const inputElements = Object.entries(this.props.inputs).map((entry, index) => 
            <div key={entry[0]}>
                <label htmlFor={entry[0]}>{this.props.descriptions[index] || entry[0]}</label>
                <input id={entry[0]} type="text" value={entry[1]} onChange={this.handleChange}></input>
            </div>
        );

        if (!this.props.legend) return (
          <div>
            {inputElements}
          </div>
        );

        else return (
            <fieldset>
                <legend>{this.props.legend}</legend>
                {inputElements}
            </fieldset>
        );
     }
}
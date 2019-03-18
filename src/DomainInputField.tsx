import React, { SyntheticEvent } from "react";

export interface IDomainInputFieldProps {
    handleDomainInput: (valid_domains: string[], invalid_domains: string[]) => void;
}

interface IDomainInputFieldState {
    domain_input: string;
}

export default class DomainInputField extends React.Component<IDomainInputFieldProps, IDomainInputFieldState> {
    private readonly inputCallback: (valid_domains: string[], invalid_domains: string[]) => void;
    
    constructor(props: IDomainInputFieldProps) {
        super(props);
        this.inputCallback = props.handleDomainInput;
        this.state = {
            domain_input: "www.google.com, www.amazon.com"
        };
    }

    private static validateDomain(domain: string): boolean {
        const regex = /^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/
        return domain.length > 0 && domain.length <= 255 && !!regex.exec(domain);
    }

    private onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        // fix state
        this.setState({ domain_input: event.target.value });
        // split the domain list by commas, and strip whitespace
        const domains = event.target.value.replace(/\s+/g, "").split(",");
        // validate each one, and pass the output to our callback
        let inval = [];
        let val = [];
        for (const d of domains) DomainInputField.validateDomain(d) ? val.push(d) : inval.push(d);
        this.inputCallback(val, inval);
    }

    render() {
        return (
          <div>
            <label htmlFor="domain">Domains</label>
            <input id="domain" type="text" value={this.state.domain_input} onChange={this.onInputChange.bind(this)} />
          </div>
        );
    }
}
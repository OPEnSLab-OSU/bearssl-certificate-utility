import React from "react";
import { ISSLHelperOpts, ISSLHelperOut } from './App';

export interface ICertificateProps {
    domains: string[];
    options: ISSLHelperOpts;
    click_index: number;
}

export interface ICertificateState {
    header: ISSLHelperOut | null;
    error?: string | null;
};

export default class CertificateData extends React.Component<ICertificateProps, ICertificateState> {
    private click_index: number;
    private input_error: string | null;

    constructor(props: ICertificateProps) {
        super(props);
        this.state = {
            header: null,
            error: null,
        };
        this.click_index = this.props.click_index;
        this.input_error = null;
    }

    private fetchHeaderForDomains(): Promise<void> {
        // if there aren't any domains, return an error
        if (this.props.domains.length <= 0) return Promise.resolve();
        // calculate the url parameters by adding the domain options to the header options
        // should create ?domain=...&domain=...&array_name=... and so on
        const urlParams = this.props.domains.map((d) => `domain=${d}`).concat(Object.entries(this.props.options).map((o) => `${o[0]}=${o[1]}`)).join('&');
        const url = `https://certutil.prototypical.pro/getheader?${urlParams}`;
        // fetch the stuff from the url, returning null on error
        return fetch(url).then((res) => res.json()).catch((err) => {
            console.error(err);
            this.setState({
                header: null,
                error: err.message,
            });
        }).then((header) => {
            this.setState({
                header,
                error: null
            });
        });
    }

    private static msgDiv(msg: string) {
        return (
            <div> 
                <p className="msg">{msg}</p>
            </div>
        );
    }

    render() {
        // if we need to get a new certificate
        if (this.props.click_index !== this.click_index) {
            // update index
            this.click_index = this.props.click_index;
            // error check
            this.input_error = null;
            if (!this.props.domains || this.props.domains.length === 0) this.input_error = "Please add at least one valid domain!";
            if (!this.props.options || Object.values(this.props.options).some((p) => !p)) this.input_error = "Please input non-emptey header options.";
            if (Object.values(this.props.options).some((p: string) => !!p.match(/\s|-/))) this.input_error = "Varible names cannot contain dashes or spaces."

            if (!this.input_error) {
                // render the certificate!
                this.fetchHeaderForDomains();
                return CertificateData.msgDiv("Generating header...");
            }
        }
        if (this.input_error) return CertificateData.msgDiv(this.input_error);
        if (this.state.error) return CertificateData.msgDiv(`Error: ${this.state.error}`);
        if (this.state.header) return (
          <div>
              <p>{this.state.header.invalid_domains.length > 0 ? `Invalid Domains: ${this.state.header.invalid_domains.join(", ")}` : null}<br></br></p>
              <textarea rows={(this.state.header.header.match(/\n/g) || '').length + 5} cols={80} readOnly={true} value={this.state.header.header}></textarea>
          </div>  
        );
        return CertificateData.msgDiv("Please add some domains, and click submit!");
    }
}
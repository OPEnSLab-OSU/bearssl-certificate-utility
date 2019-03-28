import React, { Component, SyntheticEvent } from 'react';
import InputFields from './InputFields';
import CertificateData from './CertificateData';
import './App.css';

export interface ISSLHelperOut {
  header: string;
  valid_domains: string[];
  invalid_domains: string[];
}

export interface ISSLHelperOpts {
  array_name?: string;
  length_name?: string;
  guard_name?: string;
}

interface IAppState {
  domain_input: {
    domain: string;
  };
  valid_domains: string[];
  options: ISSLHelperOpts;
  submit_count: number;
}

class App extends React.Component<{}, IAppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      domain_input: {
        domain: "www.google.com, www.amazon.com",
      },
      valid_domains: ["www.google.com", "www.amazon.com"],
      options: {
        array_name: "TAs",
        length_name: "TAs_NUM",
        guard_name: "CERTIFICATES",
      },
      submit_count: 0,
    };
  }

  private static validateDomain(domain: string): boolean {
    const regex = /^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/;
    return domain.length > 0 && domain.length <= 255 && !!regex.exec(domain);
  }

  private onSubmit(event: SyntheticEvent) {
    this.setState((state) => { return { submit_count: state.submit_count + 1 } });
    event.preventDefault();
  }

  private onOptionsChange(input: { [label: string]: string }) {
    this.setState({ options: Object.assign({}, this.state.options, input) });
  }

  private onDomainChange(input: { [label: string]: string }) {
    this.setState({
      domain_input: input as { domain: string },
      valid_domains: input.domain.split(",").map((s) => s.trim()).filter((d) => App.validateDomain(d)),
    });
  }
  
  render() {
    return (
      <div className="App">
        <form onSubmit={this.onSubmit.bind(this)}>
          <InputFields inputs={this.state.domain_input as any} descriptions={["Domains To Include"]} onChange={this.onDomainChange.bind(this)}></InputFields>
          <InputFields legend="Header Customization Options" inputs={this.state.options as any} descriptions={[
            "Name For Trust Anchor Array Varible",
            "Name For Array Length Varible",
            "Name For The Header Guard (Usually Caps)",
          ]} onChange={this.onOptionsChange.bind(this)}></InputFields>
          <input type="submit" value="Submit" />
        </form>
        <p>{`Domains: ${this.state.valid_domains.join(", ")}`}</p>
        <CertificateData click_index={this.state.submit_count} domains={this.state.valid_domains} options={this.state.options}></CertificateData>
      </div>
    );
  }
}

export default App;

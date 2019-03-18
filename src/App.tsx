import React, { Component, SyntheticEvent } from 'react';
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
  domain_input: string;
  options: ISSLHelperOpts;
}

class App extends React.Component<{}, IAppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      domain_input: "",
      options: {
        array_name: "TAs",
        length_name: "TAs_NUM",
        guard_name: "CERTIFICATES",
      },
    };
  }

  private onSubmit(event: SyntheticEvent) {
    event.preventDefault();
  }
  
  render() {
    return (
      <div className="App">
        <form onSubmit={this.onSubmit.bind(this)}>
          <label htmlFor="domain">Domains</label>
          <input id="domain" type="text" value={this.state.domain_input} onChange={(e) => this.setState({ domain_input: e.target.value })} />
          <fieldset>
            <legend>Header Customization Options</legend>
            <label htmlFor="array_name">Name For Trust Anchor Array Varible</label>
            <input id="array_name" type="text" value={this.state.options.array_name} onChange={(e) => this.setState({ options: { array_name: e.target.value } })}></input>
            <br></br>
            <label htmlFor="length_name">Name For Array Length Varible</label>
            <input id="length_name" type="text" value={this.state.options.length_name} onChange={(e) => this.setState({ options: { length_name: e.target.value } })}></input>
            <br></br>
            <label htmlFor="guard_name">Name For The Header Guard (Usually Caps)</label>
            <input id="guard_name" type="text" value={this.state.options.guard_name} onChange={(e) => this.setState({ options: { guard_name: e.target.value } })}></input>
          </fieldset>
          <input type="submit" value="Submit" />
        </form>
        <p>{this.state}</p>
      </div>
    );
  }

  private static fetchHeaderForDomains(domains: string[], opts: ISSLHelperOpts): Promise<ISSLHelperOut | null> {
    // if there aren't any domains, return an error
    if (domains.length <= 0) return Promise.resolve(null);
    // calculate the url parameters by adding the domain options to the header options
    // should create ?domain=...&domain=...&array_name=... and so on
    const urlParams = domains.map((d) => `domain=${d}`).concat(Object.entries(opts).map((o) => `${o[0]}=${o[1]}`)).join('&');
    const url = `https://certutil.prototypical.pro/getheader?${urlParams}`;
    // fetch the stuff from the url, returning null on error
    return fetch(url).then((res) => res.json()).catch((err) => {
        console.error(err);
        return null;
    });
}
}

export default App;

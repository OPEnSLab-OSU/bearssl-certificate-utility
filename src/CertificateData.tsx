import React from "react";

export interface ICertificateProps {
    domains: string[];
}

export default class CertificateData extends React.Component<ICertificateProps> {
    private readonly domains: string[];

    constructor(props: ICertificateProps) {
        super(props);
        this.domains = props.domains;
    }

    render() {
        return (
            <div className="app">
                <h1>Hello World!</h1>
                <p>Foo to the barz</p>
                <img src={""} height="480"/>
            </div>
        );
    }
}
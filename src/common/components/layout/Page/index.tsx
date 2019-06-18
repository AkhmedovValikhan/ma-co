import React from 'react';
import './Page.scss';

export interface PageProps {
    className?: string;
}

export class Page extends React.PureComponent<PageProps> {
    public render() {
        let className = 'container page';
        if (this.props.className) {
            className += ' ' + this.props.className;
        }
        return <div className={className}>
            {this.props.children}
        </div>;
    }
}
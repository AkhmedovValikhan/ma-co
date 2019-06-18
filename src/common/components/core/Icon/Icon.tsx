import React from 'react';
import './Icon.scss';

export interface IconProps {
    inline: string;
    className?: string;
}

export class Icon extends React.PureComponent<IconProps> {
    public render() {
        const { className } = this.props;
        return <div className={'icon ' + (className ? className : '')} dangerouslySetInnerHTML={{ __html: this.props.inline }} />;
    }
}

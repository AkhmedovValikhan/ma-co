import classNames from 'classnames';
import * as React from 'react';
import { ButtonProps } from '.';
import './Button.scss';

export class Button extends React.PureComponent<ButtonProps> {
    public static defaultProps: Partial<ButtonProps> = {
        theme: 'primary',
        size: 'md',
        mode: 'normal',
    };

    public render() {
        const classes: Record<string, boolean> = {
            button: true,
            [`button--${this.props.theme}`]: true,
            [`button--${this.props.size}`]: true,
            [`button--${this.props.mode}`]: true,
            [`button--fluid`]: !!this.props.fluid,
        };
        if (this.props.className) {
            classes[this.props.className] = true;
        }
        const className = classNames(classes);
        return <div role='button' className={className} onClick={this.props.onClick}>
            {this.props.children}
        </div>;
    }
}

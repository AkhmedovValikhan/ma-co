import classNames from 'classnames';
import React from "react";
import { CheckboxProps } from ".";
import './Checkbox.scss';

export class Checkbox extends React.PureComponent<CheckboxProps, {}> {
    public static defaultProps: Partial<CheckboxProps> = {
        theme: 'primary',
    };

    private onClick = () => {
        if (this.props.onChange) {
            this.props.onChange(!this.props.checked);
        }
    }

    public render() {
        const classes: Record<string, boolean> = {
            'checkbox': true,
            'checkbox--checked': this.props.checked,
            ['checkbox--' + this.props.theme]: true,
        };
        const className = classNames(classes);
        return <div className={className} onClick={this.onClick}>
            <div className='checkbox__box'>
                <span className='checkbox__tick' />
            </div>
            <label className='checkbox__label'>{this.props.label}</label>
        </div>;
    }
}

import classNames from 'classnames';
import React from 'react';
import { CheckboxProps } from '.';
import { setFieldValue } from '../abstract';
import './Checkbox.scss';

export class Checkbox extends React.PureComponent<CheckboxProps, {}> {
    public static defaultProps: Partial<CheckboxProps> = {
        theme: 'primary',
    };

    private onClick = () => {
        const { disabled, value } = this.props.state;
        if (!this.props.onChange || disabled) { return; }
        this.props.onChange(setFieldValue(this.props.state, !value));
    }

    public render() {
        const { disabled, value } = this.props.state;
        const classes: Record<string, boolean> = {
            'checkbox': true,
            'checkbox--checked': value,
            'checkbox--disabled': disabled,
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

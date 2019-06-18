import React from "react";
import { RadioProps } from "./Radio.types";
import classNames from "classnames";
import './Radio.scss';

export class Radio extends React.PureComponent<RadioProps, {}> {
    public static defaultProps: Partial<RadioProps> = {
        theme: 'primary',
    };

    private onClick = () => {
        if (!this.props.checked) {
            if (this.props.onChange) {
                this.props.onChange(!this.props.checked);
            }
        }
    }

    public render() {
        const classes: Record<string, boolean> = {
            'radio': true,
            'radio--selected': this.props.checked,
            ['radio--' + this.props.theme]: true,
        };
        const className = classNames(classes);
        return <div className={className} onClick={this.onClick}>
            <div className='radio__circle'>
                {this.props.checked && <span className='radio__circle-inner' />}
            </div>
            <label className='radio__label'>{this.props.label}</label>
        </div>;
    }
}

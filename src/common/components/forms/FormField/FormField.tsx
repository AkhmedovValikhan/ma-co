import React from 'react';
import './FormField.scss';
import { FormFieldProps } from './FormField.types';

export class FormField extends React.PureComponent<FormFieldProps, {}> {
    public render() {
        return <div className='form-field'>
            <label className='form-field__label'>{this.props.label}</label>
            {this.props.children}
        </div>;
    }
}

import React from 'react';
import { FormModelFields, FormProps } from '.';
import { createInitialState, FieldState } from '../abstract';

interface State<TModel> {
    fields: FormModelFields<TModel>;
    isSubmitting: boolean;
}

export class Form<TModel> extends React.PureComponent<FormProps<TModel>, State<TModel>> {

    constructor(props: FormProps<TModel>) {
        super(props);

        const initialFields = Object.keys(this.props.initialValues).reduce((fields, field) => {
            const fieldName = field as any as keyof TModel;
            const value = this.props.initialValues[fieldName] as any as string;
            fields[fieldName] = createInitialState(value);
            return fields;
        }, {} as FormModelFields<TModel>);

        this.state = {
            fields: initialFields,
            isSubmitting: false,
        };
    }

    private getFormState() {
        const changed = Object.keys(this.state.fields).every((f: any) => this.state.fields[f as keyof TModel].changed);
        const valid = Object.keys(this.state.fields).every((f: any) => this.state.fields[f as keyof TModel].valid);
        return {
            changed,
            valid,
        } as FieldState<string>;
    }

    public render() {
        return this.props.render(this.state.fields, this.getFormState());
    }
}

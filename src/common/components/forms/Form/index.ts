import { FieldState } from '../abstract';

export { Form } from './Form';

export type FormRenderer<TModel> = (fields: FormModelFields<TModel>, formState: FieldState<string>) => React.ReactNode;

export type FormModelFields<TModel> = Record<keyof TModel, FieldState<string>>;

export interface FormProps<TModel = {}> {
    render: FormRenderer<TModel>;
    initialValues: TModel;
}

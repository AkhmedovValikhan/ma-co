
export const INITIAL_VALUE = Symbol('@@form_initial_value');

export interface FieldState<TValue> {
    value: TValue;
    valid: boolean;
    dirty: boolean;
    changed: boolean;
    [INITIAL_VALUE]: TValue;
}

export const createInitialState = <TValue>(value: TValue): FieldState<TValue> => {
    return {
        value,
        changed: false,
        dirty: false,
        valid: true,
        [INITIAL_VALUE]: value,
    };
};

export interface ValidationResult {
    message: string;
    type: string;
}
export type Validator<TValue> = (value: TValue) => ValidationResult | null;

export const composeValidators = (...validators: Validator<string>[]): Validator<string> => (value: string) => {
    for (const validator of validators) {
        const validationResult = validator(value);
        if (validationResult) {
            return validationResult;
        }
    }
    return null;
};

// tslint:disable-next-line:no-namespace
export namespace Validators {
    export const required: Validator<string> = (value: string) => {
        if (value) { return null; }
        return {
            message: 'This field is required',
            type: 'required',
        };
    };

    export const minLength = (length: number): Validator<string> => (value: string) => {
        if (value.length >= length) {
            return null;
        }
        return {
            message: `Minimum length is ${length}`,
            type: 'minLength',
        };
    };

    export const maxLength = (length: number): Validator<string> => (value: string) => {
        if (value.length < length) {
            return null;
        }
        return {
            message: `Maximum length is ${length}`,
            type: 'mxnLength',
        };
    };

    const NUMERIC_REGEX = /^\d*$/;
    export const numeric = (value: string) => {
        if (!value) {
            return null;
        }
        const valid = NUMERIC_REGEX.test(value);
        if (valid) { return null; }
        return {
            message: `The field can contain only numeric values`,
            type: 'numeric',
        };
    };
}
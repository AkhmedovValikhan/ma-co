
export const INITIAL_VALUE = Symbol('@@form_initial_value');

export interface FieldState<TValue> {
    value: TValue;
    valid: boolean;
    dirty: boolean;
    changed: boolean;
    disabled: boolean;
    [INITIAL_VALUE]: TValue;
}

export const createInitialState = <TValue>(value: TValue): FieldState<TValue> => {
    return {
        value,
        changed: false,
        dirty: false,
        valid: true,
        disabled: false,
        [INITIAL_VALUE]: value,
    };
};

export const changeDisableState = <TValue>(state: FieldState<TValue>, disabled: boolean): FieldState<TValue> => {
    return {
        ...state,
        disabled,
    };
};
export const disableField = <TValue>(state: FieldState<TValue>): FieldState<TValue> => changeDisableState(state, true);
export const enableField = <TValue>(state: FieldState<TValue>): FieldState<TValue> => changeDisableState(state, false);

export const setFieldValue = <TValue>(state: FieldState<TValue>, value: TValue): FieldState<TValue> => {
    return {
        ...state,
        value,
    };
};


import { createInitialState, FieldState } from '../../../common/components/forms/abstract';
export { setDisabledState } from './CreaditCardUtils';
export interface CreditCardFormState {
    cardNumberState: FieldState<string>;
    expirationState: FieldState<string>;
    cvnState: FieldState<string>;
    saveDetails: FieldState<boolean>;
}

export const createCreditCartState = (): CreditCardFormState => {
    return {
        cardNumberState: createInitialState(''),
        cvnState: createInitialState(''),
        expirationState: createInitialState(''),
        saveDetails: createInitialState(false),
    };
};

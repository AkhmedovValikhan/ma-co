import { createInitialState, FieldState } from "../../../common/components/forms/abstract";

export interface CreditCardFormState {
    cardNumberState: FieldState<string>;
    expirationState: FieldState<string>;
    cvnState: FieldState<string>;
}

export const createCreditCartState = (): CreditCardFormState => {
    return {
        cardNumberState: createInitialState(''),
        cvnState: createInitialState(''),
        expirationState: createInitialState(''),
    };
};

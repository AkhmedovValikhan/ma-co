import { FieldState } from '../../../common/components/forms/abstract';
export { extractCardInfo, createCreditCartState } from './CreaditCardUtils';
export { setDisabledState } from './CreaditCardUtils';
export interface CreditCardFormState {
    cardNumberState: FieldState<string>;
    expirationState: FieldState<string>;
    cvnState: FieldState<string>;
    saveDetails: FieldState<boolean>;
}

export interface CreditCardInfo {
    cardNumber: string;
    cvn: string;
    expirationMonth: number;
    expirationYear: number;
    saveDetails: boolean;
}


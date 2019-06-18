import { CreditCardFormState, CreditCardInfo } from '.';
import { allValid, anyDirty } from '../../../common/components/forms';
import { changeDisableState, createInitialState } from '../../../common/components/forms/abstract';

export const parseExpirationDate = (value: string): [number, number] | null => {
    if (value.length !== 4) { return null; }
    let month = 0;
    let year = 0;

    const monthStr = value.slice(0, 2);
    month = parseInt(monthStr, 10);
    if (month > 12 || month < 1) {
        return null;
    }
    const yearStr = value.slice(2, 4);
    year = parseInt(yearStr, 10);
    return [month, 2000 + year];
};

export const validateExpirationDate = (value: string): boolean => {
    const parsed = parseExpirationDate(value);
    if (!parsed) { return false; }

    const [month, year] = parsed;
    const date = new Date(year, month - 1);
    return date > new Date();
};

export const setDisabledState = (state: CreditCardFormState, disabled: boolean) => {
    const newState = { ...state };
    newState.cardNumberState = changeDisableState(newState.cardNumberState, disabled);
    newState.cvnState = changeDisableState(newState.cvnState, disabled);
    newState.expirationState = changeDisableState(newState.expirationState, disabled);
    newState.saveDetails = changeDisableState(newState.saveDetails, disabled);
    return newState;
};

export const createCreditCartState = (): CreditCardFormState => {
    return {
        cardNumberState: createInitialState(''),
        cvnState: createInitialState(''),
        expirationState: createInitialState(''),
        saveDetails: createInitialState(false),
    };
};

export const extractCardInfo = (cardState: CreditCardFormState): CreditCardInfo | null => {
    const isValid = isCreditCardStateValid(cardState);
    if (!isValid) { return null; }
    const [month, year] = parseExpirationDate(cardState.expirationState.value)!;
    return {
        cardNumber: cardState.cardNumberState.value,
        cvn: cardState.cvnState.value,
        expirationMonth: month,
        expirationYear: year,
        saveDetails: cardState.saveDetails.value,
    };
};

const getAllFields = (cardState: CreditCardFormState) => [cardState.saveDetails, cardState.expirationState, cardState.cvnState, cardState.cardNumberState];

export const isCreditCardStateValid = (cardState: CreditCardFormState): boolean => {
    const fields = getAllFields(cardState);
    const isValid = allValid(...fields);
    const isDirty = anyDirty(...fields);
    return isValid && isDirty;
};

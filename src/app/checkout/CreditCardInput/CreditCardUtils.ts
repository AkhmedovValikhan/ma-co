import { CreditCardFormState, CreditCardInfo } from '.';
import { allValid, anyDirty } from '../../../common/components/forms';
import { changeDisableState, createInitialState } from '../../../common/components/forms/abstract';

const CC_REGEX = /[^0-9-\s]+/;
const CC_MIN_LEN = 13;
const CC_MAX_LEN = 20;

/**
 * Validates credit card number using Luhn algorith (Taken from https://www.geeksforgeeks.org/luhn-algorithm/), also checks length.
 * @param cardNumber CC number
 */
export const validateCreditCard = (cardNumber: string) => {
    if (cardNumber.length < CC_MIN_LEN || cardNumber.length > CC_MAX_LEN) {
        return false;
    }

    if (CC_REGEX.test(cardNumber)) {
        return false;
    }

    const number = cardNumber.replace(/\D/g, '');

    let sum = 0;
    let isEven = false;
    for (let n = number.length - 1; n >= 0; n--) {
        const cDigit = number.charAt(n);
        let nDigit = parseInt(cDigit, 10);

        if (isEven) {
            nDigit *= 2;
            if (nDigit > 9) {
                nDigit -= 9;
            }
        }

        sum += nDigit;

        isEven = !isEven;
    }

    return (sum % 10) === 0;
};

// export const validateExo

export const parseExpirationDate = (value: string): [number, number] | null => {
    if (value.length !== 4) { return null; }
    let month = 0;
    let year = 0;

    const monthStr = value.slice(0, 2);
    month = parseInt(monthStr, 10);
    if (month > 12 || month < 2) {
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

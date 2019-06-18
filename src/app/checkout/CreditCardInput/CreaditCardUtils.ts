import { CreditCardFormState } from '.';
import { changeDisableState } from '../../../common/components/forms/abstract';

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

export const validateExpirationDate = (value: string): boolean => {
    if (value.length !== 4) { return false; }
    const monthStr = value.slice(0, 2);
    const month = parseInt(monthStr, 10);
    if (month > 12 || month < 2) {
        return false;
    }
    const yearStr = value.slice(2, 4);
    const year = parseInt(yearStr, 10);
    const date = new Date(2000 + year, month - 1);
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

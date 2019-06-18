import { InputProps } from '../../../common/components/forms';
import { composeValidators, Validator, Validators } from '../../../common/components/forms/abstract';
import { validateCreditCard, validateExpirationDate } from './CreaditCardUtils';

export const EXPIRY_DATE_CLEAVE: InputProps['cleaveOptions'] = {
    date: true,
    datePattern: ['m', 'y'],
};

export const CC_CLEAVE: InputProps['cleaveOptions'] = {
    blocks: [4, 4, 4, 4],
    numericOnly: true,
};

export const CVN_VALIDATOR = composeValidators(Validators.required, Validators.numeric, Validators.maxLength(4), Validators.minLength(3));
export const EXPIRY_DATE_VALIDATE = composeValidators(
    Validators.required,
    (value) => !validateExpirationDate(value) ? ({
        message: 'Expiry Date is invalid.',
        type: 'cc-expiry',
    }) : null,
);

export const CREDIT_CARD_VALIDATOR: Validator<string> = composeValidators(
    Validators.required,
    Validators.required,
    (card) => {
        const isValid = validateCreditCard(card);
        if (isValid) {
            return null;
        }
        return {
            message: 'Creadit Card nujmber is not validdfddfd',
            type: 'credit-card',
        };
    });

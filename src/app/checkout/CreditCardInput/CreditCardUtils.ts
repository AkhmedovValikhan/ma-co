const CC_REGEX = /[^0-9-\s]+/;

/**
 * Validates credit card number.
 * @param cardNumber CC number
 * @param supportedSchemes Supported Schemes
 */
export const validateCreditCard = (cardNumber: string, supportedSchemes: CardSchemeKey[]) => {
    if (!cardNumber || !cardNumber.length) {
        return false;
    }

    const issuer = identifyIssuer(cardNumber, supportedSchemes);
    if (!issuer) {
        return false;
    }
    const scheme = CARD_SCHEMES[issuer];

    if (cardNumber.length < scheme.minLength || cardNumber.length > scheme.maxLength) {
        return false;
    }

    if (CC_REGEX.test(cardNumber)) {
        return false;
    }

    const luhnValid = validateLuhn(cardNumber);

    return luhnValid;
};

/**
 * Validates credit card number using Luhn algorith (Taken from https://www.geeksforgeeks.org/luhn-algorithm/)
 * @param cardNumber CC number
 */
export const validateLuhn = (cardNumber: string) => {
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

export const identifyIssuer = (cardNumber: string, supportedSchemes: CardSchemeKey[]): CardSchemeKey | null => {
    for (const entry of Object.entries(CARD_SCHEMES)) {
        const [key, scheme] = entry;
        if (!supportedSchemes.some(s => s === key)) {
            return null;
        }
        const isScheme = scheme.begining.some(beg => cardNumber.startsWith(beg));
        if (isScheme) {
            return key as CardSchemeKey;
        }
    }
    return null;
};

interface CardScheame {
    title: string;
    minLength: number;
    maxLength: number;
    begining: string[];
}

export const CARD_SCHEMES = {
    ['visa']: {
        begining: ['4'],
        maxLength: 16,
        minLength: 13,
        title: 'Visa',
    } as CardScheame,
    ['mc']: {
        title: 'Master Card',
        begining: ['51', '52', '53', '54', '55', '22', '23', '24', '25', '26', '27'],
        maxLength: 16,
        minLength: 16,
    } as CardScheame,
};

export type CardSchemeKey = keyof typeof CARD_SCHEMES;

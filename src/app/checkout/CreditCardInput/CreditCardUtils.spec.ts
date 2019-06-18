import { validateCreditCard } from './CreaditCardUtils';

describe('CreditCardUtils', () => {
    describe('validateCreditCard', () => {
        it('should validate card numbers', () => {
            [...VALID_CARDS, ...INVALID_CARDS].forEach(([card, expected]) => {
                const isValid = validateCreditCard(card);
                expect(isValid).toBe(expected);
            });
        });
    });
});

type TestCase = [string, boolean];
const VALID_CARDS: TestCase[] = [
    '3467486400328176', // amex
    '3412142351474305', // amex
    '4305446332026987', // visa
    '4485184826045997', // visa
    '2350481712159825', // mcard
    '2228986333268292', // mcard
].map(s => [s, true] as TestCase);

const INVALID_CARDS: TestCase[] = [
    '12345', // amex
    '1B1B1B1B', // amex
    '4305446332026986', // visa
    '4485184826045995', // visa
    '2350481712159823', // mcard
    '2228986333268291', // mcard
].map(s => [s, false] as TestCase);

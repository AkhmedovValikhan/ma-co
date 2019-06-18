import { parseExpirationDate } from './CreditCardFormUtils';

describe('CreditCardUtils', () => {
    describe('parseExpirationDate', () => {
        it('should parse valid expiration date', () => {
            type TestCase = [string, number, number];
            const tesetCases: TestCase[] = [
                ['1122', 11, 2022],
                ['0110', 1, 2010],
            ];
            tesetCases.forEach(([input, expMonth, expYear]) => {
                const parsed = parseExpirationDate(input);
                expect(parsed).toBeDefined();
                expect(parsed).toHaveLength(2);
                expect(parsed![0]).toBe(expMonth);
                expect(parsed![1]).toBe(expYear);
            });
        });
    });
});

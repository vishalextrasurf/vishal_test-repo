const { calculateSum, processData, multiply } = require('./app');

describe('App Tests', () => {
    test('calculateSum should add two numbers', () => {
        expect(calculateSum(2, 3)).toBe(5);
        expect(calculateSum(-1, 1)).toBe(0);
    });

    test('processData should convert to uppercase', () => {
        const input = ['hello', 'world'];
        const expected = ['HELLO', 'WORLD'];
        expect(processData(input)).toEqual(expected);
    });

    test('multiply should multiply two numbers', () => {
        expect(multiply(3, 4)).toBe(12);
        expect(multiply(-2, 5)).toBe(-10);
        expect(multiply(0, 100)).toBe(0);
        expect(multiply(1, 1)).toBe(1);
        expect(multiply(-1, -1)).toBe(1);
    });
});

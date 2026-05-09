const { add, subtract, multiply, divide, modulo, power, squareRoot, compute, toNumber } = require('../calculator');

describe('calculator functions', () => {
  test('addition 2 + 3 => 5', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('subtraction 10 - 4 => 6', () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test('multiplication 45 * 2 => 90', () => {
    expect(multiply(45, 2)).toBe(90);
  });

  test('division 20 / 5 => 4', () => {
    expect(divide(20, 5)).toBe(4);
  });

  test('division by zero throws', () => {
    expect(() => divide(1, 0)).toThrow('Division by zero');
  });

  test('modulo 5 % 2 => 1', () => {
    expect(modulo(5, 2)).toBe(1);
  });

  test('modulo by zero throws', () => {
    expect(() => modulo(1, 0)).toThrow('Division by zero');
  });

  test('power 2 ^ 3 => 8', () => {
    expect(power(2, 3)).toBe(8);
  });

  test('power with negative exponent 2 ^ -2 => 0.25', () => {
    expect(power(2, -2)).toBeCloseTo(0.25);
  });

  test('squareRoot 16 => 4', () => {
    expect(squareRoot(16)).toBe(4);
  });

  test('squareRoot of negative throws', () => {
    expect(() => squareRoot(-4)).toThrow('Square root of negative number');
  });

  test('compute supports operator names and symbols', () => {
    expect(compute('add', 2, 3)).toBe(5);
    expect(compute('+', 2, 3)).toBe(5);
    expect(compute('subtract', 10, 4)).toBe(6);
    expect(compute('-', 10, 4)).toBe(6);
    expect(compute('multiply', 45, 2)).toBe(90);
    expect(compute('*', 45, 2)).toBe(90);
    expect(compute('divide', 20, 5)).toBe(4);
    expect(compute('/', 20, 5)).toBe(4);
    expect(compute('mod', 5, 2)).toBe(1);
    expect(compute('%', 5, 2)).toBe(1);
    expect(compute('power', 2, 3)).toBe(8);
    expect(compute('^', 2, 3)).toBe(8);
    expect(compute('sqrt', 16)).toBe(4);
  });

  test('toNumber throws on invalid input', () => {
    expect(() => toNumber('notanumber')).toThrow(/Invalid number/);
  });
});

#!/usr/bin/env node

// Supported operations:
// - addition
// - subtraction
// - multiplication
// - division

const readline = require('readline');

function toNumber(v) {
  const n = Number(v);
  if (Number.isNaN(n)) throw new Error(`Invalid number: ${v}`);
  return n;
}

function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
  if (b === 0) throw new Error('Division by zero');
  return a / b;
}

function modulo(a, b) {
  if (b === 0) throw new Error('Division by zero');
  return a % b;
}

function power(base, exponent) {
  return Math.pow(base, exponent);
}

function squareRoot(n) {
  if (n < 0) throw new Error('Square root of negative number');
  return Math.sqrt(n);
}

function compute(op, a, b) {
  const o = String(op).toLowerCase();
  switch (o) {
    case 'add':
    case '+':
      return add(a, b);
    case 'subtract':
    case 'sub':
    case '-':
      return subtract(a, b);
    case 'multiply':
    case 'mul':
    case '*':
    case 'x':
      return multiply(a, b);
    case 'divide':
    case 'div':
    case '/':
      return divide(a, b);
    case 'mod':
    case '%':
      return modulo(a, b);
    case 'power':
    case 'pow':
    case '^':
      return power(a, b);
    case 'sqrt':
      // unary operation, ignore b
      return squareRoot(a);
    default:
      throw new Error(`Unknown operation: ${op}`);
  }
}

function printUsage() {
  console.log('Usage: node src/calculator.js <operation> <a> <b>');
  console.log('Operations: add (+), subtract (-), multiply (*), divide (/)');
  console.log('Or run without args to start interactive mode. Type "exit" to quit.');
}

async function runInteractive() {
  console.log('Simple CLI Calculator — supported: add, subtract, multiply, divide');
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: 'calc> ' });
  rl.prompt();
  rl.on('line', (line) => {
    const input = line.trim();
    if (!input) { rl.prompt(); return; }
    if (['exit', 'quit', 'q'].includes(input.toLowerCase())) { rl.close(); return; }

    // Accept either: "add 2 3" or "2 + 3"
    const tokens = input.split(/\s+/);
    try {
      let op, aStr, bStr;
      if (tokens.length === 3 && ['+', '-', '*', '/', 'add', 'subtract', 'multiply', 'divide', 'sub', 'mul', 'div', 'x'].includes(tokens[1].toLowerCase())) {
        // e.g. "2 + 3"
        aStr = tokens[0];
        op = tokens[1];
        bStr = tokens[2];
      } else if (tokens.length === 3) {
        // e.g. "add 2 3"
        op = tokens[0];
        aStr = tokens[1];
        bStr = tokens[2];
      } else {
        console.error('Invalid input. Examples: "add 2 3" or "2 + 3"');
        rl.prompt();
        return;
      }

      const a = toNumber(aStr);
      const b = toNumber(bStr);
      const result = compute(op, a, b);
      console.log(result);
    } catch (err) {
      console.error('Error:', err.message);
    }
    rl.prompt();
  }).on('close', () => {
    console.log('Goodbye');
    process.exit(0);
  });
}

// CLI entry
async function main(argv = process.argv.slice(2)) {
  if (argv.length === 0) {
    await runInteractive();
    return;
  }

  const op = String(argv[0]).toLowerCase();

  // Support unary sqrt: node src/calculator.js sqrt <n>
  if (op === 'sqrt') {
    if (argv.length !== 2) {
      printUsage();
      process.exit(2);
    }
    try {
      const a = toNumber(argv[1]);
      const result = squareRoot(a);
      console.log(result);
      process.exit(0);
    } catch (err) {
      console.error('Error:', err.message);
      process.exit(1);
    }
  }

  if (argv.length !== 3) {
    printUsage();
    process.exit(2);
  }

  const [opRaw, aStr, bStr] = argv;
  try {
    const a = toNumber(aStr);
    const b = toNumber(bStr);
    const result = compute(opRaw, a, b);
    // Print numeric result only
    console.log(result);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

// Export functions for testing
module.exports = { add, subtract, multiply, divide, modulo, power, squareRoot, compute, toNumber };

// Run CLI only when executed directly
if (require.main === module) {
  main();
}

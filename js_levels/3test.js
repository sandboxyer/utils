/**
 * JAVASCRIPT CORE SYNTAX TEST SUITE - LEVEL 1
 * Testing fundamental language constructs and statements
 */

// ========== TEST RUNNER ==========
class SyntaxTest {
    constructor() {
        this.tests = new Map();
        this.results = { passed: 0, failed: 0 };
        this.currentSection = '';
    }

    section(name) {
        this.currentSection = name;
        this.tests.set(name, []);
        console.log(`\n📁 ${name.toUpperCase()}`);
        console.log('═'.repeat(name.length + 2));
    }

    test(description, testFn) {
        const testObj = { description, fn: testFn };
        this.tests.get(this.currentSection).push(testObj);
    }

    run() {
        console.log('🧪 JAVASCRIPT CORE SYNTAX TEST SUITE');
        console.log('='.repeat(40));

        for (const [section, sectionTests] of this.tests) {
            console.log(`\n📂 Testing: ${section}`);
            
            for (const test of sectionTests) {
                try {
                    test.fn();
                    console.log(`  ✅ ${test.description}`);
                    this.results.passed++;
                } catch (error) {
                    console.log(`  ❌ ${test.description}`);
                    console.log(`     ${error.message}`);
                    this.results.failed++;
                }
            }
        }

        this.report();
    }

    report() {
        console.log('\n' + '='.repeat(40));
        console.log('📊 FINAL RESULTS:');
        console.log(`✅ Passed: ${this.results.passed}`);
        console.log(`❌ Failed: ${this.results.failed}`);
        console.log(`📈 Total: ${this.results.passed + this.results.failed}`);
        console.log('='.repeat(40));
    }

    assert(condition, message) {
        if (!condition) throw new Error(message);
    }
}

const tester = new SyntaxTest();

// ========== 1. VARIABLE DECLARATIONS ==========
tester.section('variable declarations');

tester.test('var declaration and hoisting', () => {
    tester.assert(typeof x === 'undefined', 'var is hoisted but not initialized');
    var x = 10;
    tester.assert(x === 10, 'var can be reassigned');
});

tester.test('let block scoping', () => {
    if (true) {
        let y = 20;
        tester.assert(y === 20, 'let works in block scope');
    }
    tester.assert(typeof y === 'undefined', 'let is not accessible outside block');
});

tester.test('const immutability', () => {
    const z = 30;
    tester.assert(z === 30, 'const must be initialized');
    
    const obj = { a: 1 };
    obj.a = 2; // Allowed - mutating object property
    tester.assert(obj.a === 2, 'const only prevents reassignment, not mutation');
});

// ========== 2. PRIMITIVE TYPES ==========
tester.section('primitive types');

tester.test('number operations', () => {
    tester.assert(typeof 42 === 'number');
    tester.assert(typeof 3.14 === 'number');
    tester.assert(typeof NaN === 'number');
    tester.assert(typeof Infinity === 'number');
    
    // Special number behaviors
    tester.assert(0.1 + 0.2 !== 0.3, 'floating point precision issue');
    tester.assert(isNaN(Number('abc')), 'parsing non-numeric string');
});

tester.test('string operations', () => {
    const str = 'JavaScript';
    tester.assert(str.length === 10);
    tester.assert(str[0] === 'J');
    tester.assert(str.slice(0, 4) === 'Java');
    tester.assert('test'.toUpperCase() === 'TEST');
});

tester.test('boolean logic', () => {
    tester.assert(true === true);
    tester.assert(false === false);
    tester.assert(!true === false);
    tester.assert(!!'truthy' === true);
    tester.assert(!!0 === false);
    tester.assert(!!'' === false);
    tester.assert(!!null === false);
    tester.assert(!!undefined === false);
});

tester.test('null and undefined', () => {
    tester.assert(typeof undefined === 'undefined');
    tester.assert(typeof null === 'object');
    tester.assert(null == undefined); // true with loose equality
    tester.assert(null !== undefined); // false with strict equality
    tester.assert(!null === true);
    tester.assert(!undefined === true);
});

// ========== 3. OPERATORS ==========
tester.section('operators');

tester.test('arithmetic operators', () => {
    tester.assert(10 + 5 === 15);
    tester.assert(10 - 5 === 5);
    tester.assert(10 * 5 === 50);
    tester.assert(10 / 5 === 2);
    tester.assert(10 % 3 === 1);
    tester.assert(2 ** 3 === 8); // exponentiation
    
    // Increment/decrement
    let counter = 5;
    counter++;
    tester.assert(counter === 6);
    counter--;
    tester.assert(counter === 5);
});

tester.test('comparison operators', () => {
    // Strict equality
    tester.assert(5 === 5);
    tester.assert('5' !== 5);
    
    // Loose equality
    tester.assert('5' == 5);
    tester.assert(null == undefined);
    
    // Relational
    tester.assert(5 > 3);
    tester.assert(5 >= 5);
    tester.assert(3 < 5);
    tester.assert(5 <= 5);
});

tester.test('logical operators', () => {
    // AND returns first falsy or last truthy
    tester.assert((true && false) === false);
    tester.assert((1 && 2 && 3) === 3);
    tester.assert((0 && 2) === 0);
    
    // OR returns first truthy or last falsy
    tester.assert((true || false) === true);
    tester.assert((0 || null || 3) === 3);
    
    // NOT
    tester.assert(!true === false);
    tester.assert(!!'test' === true);
});

tester.test('assignment operators', () => {
    let x = 10;
    x += 5; tester.assert(x === 15);
    x -= 3; tester.assert(x === 12);
    x *= 2; tester.assert(x === 24);
    x /= 4; tester.assert(x === 6);
    x %= 4; tester.assert(x === 2);
});

// ========== 4. CONTROL FLOW ==========
tester.section('control flow');

tester.test('if-else statements', () => {
    let result = '';
    
    if (true) result = 'true';
    tester.assert(result === 'true');
    
    if (false) result = 'false';
    else result = 'else';
    tester.assert(result === 'else');
    
    // Ternary operator
    const value = 10 > 5 ? 'greater' : 'less';
    tester.assert(value === 'greater');
});

tester.test('switch statement', () => {
    let result = '';
    
    switch (2 + 2) {
        case 3:
            result = 'three';
            break;
        case 4:
            result = 'four';
            break;
        case 5:
            result = 'five';
            break;
        default:
            result = 'unknown';
    }
    
    tester.assert(result === 'four');
    
    // Fall-through behavior
    let count = 0;
    switch (1) {
        case 1:
            count++;
            // No break - fall through
        case 2:
            count++;
            // No break - fall through
        case 3:
            count++;
    }
    tester.assert(count === 3);
});

tester.test('loops', () => {
    // For loop
    let sum = 0;
    for (let i = 1; i <= 3; i++) {
        sum += i;
    }
    tester.assert(sum === 6);
    
    // While loop
    let whileCount = 3;
    while (whileCount > 0) {
        whileCount--;
    }
    tester.assert(whileCount === 0);
    
    // Do-while (executes at least once)
    let doCount = 0;
    do {
        doCount++;
    } while (false);
    tester.assert(doCount === 1);
    
    // For-in (object properties)
    const obj = { a: 1, b: 2 };
    const keys = [];
    for (const key in obj) {
        keys.push(key);
    }
    tester.assert(keys.length === 2);
    
    // For-of (iterables)
    const arr = [1, 2, 3];
    const values = [];
    for (const value of arr) {
        values.push(value);
    }
    tester.assert(values.length === 3);
    
    // Break and continue
    let breakCount = 0;
    for (let i = 0; i < 5; i++) {
        if (i === 3) break;
        breakCount++;
    }
    tester.assert(breakCount === 3);
    
    let continueCount = 0;
    for (let i = 0; i < 5; i++) {
        if (i % 2 === 0) continue;
        continueCount++;
    }
    tester.assert(continueCount === 2);
});

// ========== 5. FUNCTIONS ==========
tester.section('functions');

tester.test('function declarations', () => {
    // Function declaration (hoisted)
    tester.assert(typeof add === 'function');
    function add(a, b) { return a + b; }
    tester.assert(add(2, 3) === 5);
    
    // Function expression
    const multiply = function(a, b) { return a * b; };
    tester.assert(multiply(3, 4) === 12);
    
    // Arrow function
    const square = x => x * x;
    tester.assert(square(5) === 25);
    
    // Arrow function lexical this
    const obj = {
        value: 10,
        getValue: function() { return this.value; },
        getArrowValue: () => this.value
    };
    tester.assert(obj.getValue() === 10);
});

tester.test('parameters and arguments', () => {
    // Default parameters
    function greet(name = 'Guest') { return `Hello ${name}`; }
    tester.assert(greet('Alice') === 'Hello Alice');
    tester.assert(greet() === 'Hello Guest');
    
    // Rest parameters
    function sum(...numbers) {
        return numbers.reduce((acc, num) => acc + num, 0);
    }
    tester.assert(sum(1, 2, 3, 4) === 10);
    
    // Arguments object (in regular functions)
    function legacySum() {
        let total = 0;
        for (let i = 0; i < arguments.length; i++) {
            total += arguments[i];
        }
        return total;
    }
    tester.assert(legacySum(1, 2, 3) === 6);
});

tester.test('scope and closures', () => {
    // Global scope
    globalVar = 'global';
    tester.assert(globalVar === 'global');
    
    // Function scope
    function outer() {
        const outerVar = 'outer';
        
        function inner() {
            const innerVar = 'inner';
            return outerVar + innerVar; // closure captures outerVar
        }
        
        return inner;
    }
    
    const closureFn = outer();
    tester.assert(closureFn() === 'outerinner');
});

// ========== 6. ARRAYS ==========
tester.section('arrays');

tester.test('array basics', () => {
    const arr = [1, 2, 3];
    tester.assert(Array.isArray(arr));
    tester.assert(arr.length === 3);
    tester.assert(arr[0] === 1);
    tester.assert(arr[arr.length - 1] === 3);
});

tester.test('array methods', () => {
    const arr = [1, 2, 3];
    
    // Mutation methods
    arr.push(4); tester.assert(arr.length === 4);
    arr.pop(); tester.assert(arr.length === 3);
    arr.unshift(0); tester.assert(arr[0] === 0);
    arr.shift(); tester.assert(arr[0] === 1);
    
    // Non-mutating methods
    const doubled = arr.map(x => x * 2);
    tester.assert(doubled[0] === 2);
    
    const filtered = arr.filter(x => x > 1);
    tester.assert(filtered.length === 2);
    
    const reduced = arr.reduce((sum, x) => sum + x, 0);
    tester.assert(reduced === 6);
    
    // Iteration methods
    const found = arr.find(x => x > 2);
    tester.assert(found === 3);
    
    const hasTwo = arr.includes(2);
    tester.assert(hasTwo === true);
});

tester.test('array destructuring', () => {
    const [first, second, ...rest] = [1, 2, 3, 4, 5];
    tester.assert(first === 1);
    tester.assert(second === 2);
    tester.assert(rest.length === 3);
    
    // Swapping variables
    let a = 1, b = 2;
    [a, b] = [b, a];
    tester.assert(a === 2);
    tester.assert(b === 1);
});

// ========== 7. OBJECTS ==========
tester.section('objects');

tester.test('object basics', () => {
    const obj = {
        name: 'John',
        age: 30,
        greet() { return `Hello ${this.name}`; }
    };
    
    tester.assert(obj.name === 'John');
    tester.assert(obj['age'] === 30);
    tester.assert(obj.greet() === 'Hello John');
    
    // Property existence
    tester.assert('name' in obj);
    tester.assert(obj.hasOwnProperty('age'));
    tester.assert(!obj.hasOwnProperty('toString'));
});

tester.test('object manipulation', () => {
    const obj = { a: 1, b: 2 };
    
    // Adding properties
    obj.c = 3;
    tester.assert(obj.c === 3);
    
    // Deleting properties
    delete obj.b;
    tester.assert(!('b' in obj));
    
    // Property descriptors
    Object.defineProperty(obj, 'readOnly', {
        value: 42,
        writable: false,
        enumerable: true
    });
    
    obj.readOnly = 100; // Won't change
    tester.assert(obj.readOnly === 42);
});

tester.test('object destructuring', () => {
    const user = { name: 'Alice', age: 25, city: 'NYC' };
    
    const { name, age } = user;
    tester.assert(name === 'Alice');
    tester.assert(age === 25);
    
    // With renaming
    const { name: userName, city: userCity } = user;
    tester.assert(userName === 'Alice');
    tester.assert(userCity === 'NYC');
    
    // Default values
    const { country = 'USA' } = user;
    tester.assert(country === 'USA');
});

// ========== 8. ERROR HANDLING ==========
tester.section('error handling');

tester.test('try-catch-finally', () => {
    let finallyExecuted = false;
    let errorCaught = null;
    
    try {
        throw new Error('Test error');
    } catch (error) {
        errorCaught = error.message;
    } finally {
        finallyExecuted = true;
    }
    
    tester.assert(errorCaught === 'Test error');
    tester.assert(finallyExecuted === true);
});

tester.test('error types', () => {
    try {
        undefinedVariable; // ReferenceError
    } catch (error) {
        tester.assert(error instanceof ReferenceError);
    }
    
    try {
        null.f(); // TypeError
    } catch (error) {
        tester.assert(error instanceof TypeError);
    }
    
    try {
        decodeURIComponent('%'); // URIError
    } catch (error) {
        tester.assert(error instanceof URIError);
    }
    
    try {
        JSON.parse('invalid'); // SyntaxError
    } catch (error) {
        tester.assert(error instanceof SyntaxError);
    }
});

// ========== 9. TYPE CONVERSION ==========
tester.section('type conversion');

tester.test('explicit conversion', () => {
    // String conversion
    tester.assert(String(123) === '123');
    tester.assert(String(true) === 'true');
    tester.assert(String(null) === 'null');
    tester.assert(String(undefined) === 'undefined');
    
    // Number conversion
    tester.assert(Number('123') === 123);
    tester.assert(Number('123abc') === NaN);
    tester.assert(Number(true) === 1);
    tester.assert(Number(false) === 0);
    tester.assert(Number(null) === 0);
    tester.assert(Number(undefined) === NaN);
    
    // Boolean conversion
    tester.assert(Boolean(1) === true);
    tester.assert(Boolean(0) === false);
    tester.assert(Boolean('') === false);
    tester.assert(Boolean('text') === true);
    tester.assert(Boolean(null) === false);
    tester.assert(Boolean(undefined) === false);
    tester.assert(Boolean({}) === true);
    tester.assert(Boolean([]) === true);
});

tester.test('implicit conversion', () => {
    // Loose equality
    tester.assert('5' == 5);
    tester.assert(true == 1);
    tester.assert(false == 0);
    tester.assert(null == undefined);
    
    // Addition with strings
    tester.assert(1 + '2' === '12');
    tester.assert('3' + 4 + 5 === '345');
    tester.assert(3 + 4 + '5' === '75');
    
    // Other operators
    tester.assert('5' - 2 === 3);
    tester.assert('5' * '2' === 10);
    tester.assert('10' / '2' === 5);
});

// ========== 10. SPECIAL OPERATORS ==========
tester.section('special operators');

tester.test('typeof operator', () => {
    tester.assert(typeof 42 === 'number');
    tester.assert(typeof 'text' === 'string');
    tester.assert(typeof true === 'boolean');
    tester.assert(typeof undefined === 'undefined');
    tester.assert(typeof null === 'object'); // Known quirk
    tester.assert(typeof {} === 'object');
    tester.assert(typeof [] === 'object');
    tester.assert(typeof function() {} === 'function');
    tester.assert(typeof Symbol() === 'symbol');
    tester.assert(typeof 123n === 'bigint');
});

tester.test('instanceof operator', () => {
    tester.assert([] instanceof Array);
    tester.assert({} instanceof Object);
    tester.assert(new Date() instanceof Date);
    
    function Person() {}
    const john = new Person();
    tester.assert(john instanceof Person);
    tester.assert(john instanceof Object);
});

tester.test('in operator', () => {
    const obj = { a: 1, b: 2 };
    tester.assert('a' in obj);
    tester.assert('toString' in obj); // Inherited property
    
    const arr = [1, 2, 3];
    tester.assert(0 in arr); // Index exists
    tester.assert(!3 in arr); // Index doesn't exist
});

tester.test('optional chaining', () => {
    const obj = { user: { name: 'John' } };
    tester.assert(obj.user?.name === 'John');
    tester.assert(obj.address?.street === undefined);
    
    // With function calls
    const api = { getData: () => 'data' };
    tester.assert(api.getData?.() === 'data');
    tester.assert(api.nonExistentMethod?.() === undefined);
});

tester.test('nullish coalescing', () => {
    tester.assert((null ?? 'default') === 'default');
    tester.assert((undefined ?? 'default') === 'default');
    tester.assert((0 ?? 'default') === 0);
    tester.assert(('' ?? 'default') === '');
    tester.assert((false ?? 'default') === false);
});

// ========== RUN ALL TESTS ==========
tester.run();

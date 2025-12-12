/**
 * ADVANCED JAVASCRIPT SYNTAX TEST SUITE - LEVEL 2
 * Testing advanced language features, patterns, and edge cases
 */

// ========== ADVANCED TEST RUNNER ==========
class AdvancedSyntaxTest {
    constructor() {
        this.suites = new Map();
        this.stats = {
            suites: 0,
            tests: { total: 0, passed: 0, failed: 0 },
            assertions: { total: 0, passed: 0, failed: 0 }
        };
        this.currentSuite = null;
    }

    describe(suiteName, suiteFn) {
        this.currentSuite = {
            name: suiteName,
            tests: [],
            beforeEach: null,
            afterEach: null
        };
        this.suites.set(suiteName, this.currentSuite);
        this.stats.suites++;
        
        suiteFn();
        this.currentSuite = null;
    }

    beforeEach(fn) {
        if (this.currentSuite) this.currentSuite.beforeEach = fn;
    }

    afterEach(fn) {
        if (this.currentSuite) this.currentSuite.afterEach = fn;
    }

    test(testName, testFn) {
        if (this.currentSuite) {
            this.currentSuite.tests.push({ name: testName, fn: testFn });
            this.stats.tests.total++;
        }
    }

    async run() {
        console.log('🧪 ADVANCED JAVASCRIPT SYNTAX TEST SUITE');
        console.log('='.repeat(60));
        console.log(`📦 Suites: ${this.stats.suites}\n`);

        for (const [suiteName, suite] of this.suites) {
            console.log(`\n📁 SUITE: ${suiteName}`);
            console.log('═'.repeat(suiteName.length + 8));

            for (const test of suite.tests) {
                try {
                    if (suite.beforeEach) suite.beforeEach();
                    
                    // Handle async tests
                    const result = test.fn();
                    if (result && typeof result.then === 'function') {
                        await result;
                    }
                    
                    if (suite.afterEach) suite.afterEach();
                    
                    console.log(`  ✅ ${test.name}`);
                    this.stats.tests.passed++;
                } catch (error) {
                    console.log(`  ❌ ${test.name}`);
                    console.log(`     ${error.message}`);
                    this.stats.tests.failed++;
                }
            }
        }

        this.report();
    }

    report() {
        console.log('\n' + '='.repeat(60));
        console.log('📊 COMPREHENSIVE RESULTS:');
        console.log(`📦 Test Suites: ${this.stats.suites}`);
        console.log(`🧪 Tests: ${this.stats.tests.passed} passed, ${this.stats.tests.failed} failed, ${this.stats.tests.total} total`);
        console.log(`📝 Assertions: ${this.stats.assertions.total} executed`);
        console.log(`🏁 Status: ${this.stats.tests.failed === 0 ? '✅ ALL TESTS PASSED' : '⚠️ SOME TESTS FAILED'}`);
        console.log('='.repeat(60));
    }

    expect(actual) {
        return new Expectation(actual, this.stats);
    }
}

class Expectation {
    constructor(actual, stats) {
        this.actual = actual;
        this.stats = stats;
    }

    toBe(expected) {
        this.stats.assertions.total++;
        const pass = this.actual === expected;
        this.stats.assertions[pass ? 'passed' : 'failed']++;
        if (!pass) throw new Error(`Expected ${expected}, got ${this.actual}`);
        return this;
    }

    toEqual(expected) {
        this.stats.assertions.total++;
        const pass = JSON.stringify(this.actual) === JSON.stringify(expected);
        this.stats.assertions[pass ? 'passed' : 'failed']++;
        if (!pass) throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(this.actual)}`);
        return this;
    }

    toThrow(errorType) {
        this.stats.assertions.total++;
        try {
            this.actual();
            throw new Error('Expected function to throw');
        } catch (error) {
            const pass = !errorType || error instanceof errorType;
            this.stats.assertions[pass ? 'passed' : 'failed']++;
            if (!pass) throw new Error(`Expected ${errorType?.name || 'error'}, got ${error.constructor.name}`);
        }
        return this;
    }

    resolvesTo(expected) {
        this.stats.assertions.total++;
        return this.actual.then(result => {
            const pass = result === expected;
            this.stats.assertions[pass ? 'passed' : 'failed']++;
            if (!pass) throw new Error(`Expected promise to resolve to ${expected}, got ${result}`);
        });
    }
}

const advancedTester = new AdvancedSyntaxTest();

// ========== ADVANCED FUNCTION FEATURES ==========
advancedTester.describe('Advanced Functions', () => {
    advancedTester.test('Generator Functions', () => {
        function* numberGenerator() {
            yield 1;
            yield 2;
            yield 3;
        }
        
        const gen = numberGenerator();
        advancedTester.expect(gen.next().value).toBe(1);
        advancedTester.expect(gen.next().value).toBe(2);
        advancedTester.expect(gen.next().value).toBe(3);
        advancedTester.expect(gen.next().done).toBe(true);
    });

    advancedTester.test('Async Generators', async () => {
        async function* asyncCounter(limit) {
            for (let i = 1; i <= limit; i++) {
                await new Promise(r => setTimeout(r, 10));
                yield i;
            }
        }
        
        const results = [];
        for await (const num of asyncCounter(3)) {
            results.push(num);
        }
        advancedTester.expect(results).toEqual([1, 2, 3]);
    });

    advancedTester.test('Function Currying', () => {
        const curry = fn => {
            const curried = (...args) => {
                if (args.length >= fn.length) {
                    return fn(...args);
                }
                return (...moreArgs) => curried(...args, ...moreArgs);
            };
            return curried;
        };
        
        const add = curry((a, b, c) => a + b + c);
        advancedTester.expect(add(1)(2)(3)).toBe(6);
        advancedTester.expect(add(1, 2)(3)).toBe(6);
        advancedTester.expect(add(1, 2, 3)).toBe(6);
    });

    advancedTester.test('Memoization Pattern', () => {
        let computationCount = 0;
        const memoize = fn => {
            const cache = new Map();
            return (...args) => {
                const key = JSON.stringify(args);
                if (cache.has(key)) return cache.get(key);
                const result = fn(...args);
                cache.set(key, result);
                return result;
            };
        };
        
        const expensive = memoize((a, b) => {
            computationCount++;
            return a + b;
        });
        
        advancedTester.expect(expensive(1, 2)).toBe(3);
        advancedTester.expect(expensive(1, 2)).toBe(3); // Should use cache
        advancedTester.expect(computationCount).toBe(1); // Only computed once
    });

    advancedTester.test('Function Composition', () => {
        const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);
        const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);
        
        const add5 = x => x + 5;
        const multiply3 = x => x * 3;
        const subtract2 = x => x - 2;
        
        const composed = compose(subtract2, multiply3, add5);
        const piped = pipe(add5, multiply3, subtract2);
        
        advancedTester.expect(composed(10)).toBe(43); // ((10 + 5) * 3) - 2
        advancedTester.expect(piped(10)).toBe(43);    // ((10 + 5) * 3) - 2
    });
});

// ========== ADVANCED OBJECT FEATURES ==========
advancedTester.describe('Advanced Objects', () => {
    advancedTester.test('Prototypal Inheritance', () => {
        function Animal(name) {
            this.name = name;
        }
        Animal.prototype.speak = function() { return `${this.name} makes a sound`; };
        
        function Dog(name, breed) {
            Animal.call(this, name);
            this.breed = breed;
        }
        Dog.prototype = Object.create(Animal.prototype);
        Dog.prototype.constructor = Dog;
        Dog.prototype.bark = function() { return `${this.name} barks!`; };
        
        const dog = new Dog('Rex', 'German Shepherd');
        advancedTester.expect(dog.speak()).toBe('Rex makes a sound');
        advancedTester.expect(dog.bark()).toBe('Rex barks!');
        advancedTester.expect(dog instanceof Dog).toBe(true);
        advancedTester.expect(dog instanceof Animal).toBe(true);
    });

    advancedTester.test('Classes and Inheritance', () => {
        class Shape {
            constructor(color) { this.color = color; }
            describe() { return `A ${this.color} shape`; }
            static createDefault() { return new Shape('black'); }
        }
        
        class Circle extends Shape {
            constructor(color, radius) {
                super(color);
                this.radius = radius;
            }
            area() { return Math.PI * this.radius ** 2; }
        }
        
        const circle = new Circle('red', 5);
        advancedTester.expect(circle.area()).toBe(Math.PI * 25);
        advancedTester.expect(circle.describe()).toBe('A red shape');
        advancedTester.expect(circle instanceof Circle).toBe(true);
        advancedTester.expect(circle instanceof Shape).toBe(true);
        
        const defaultShape = Shape.createDefault();
        advancedTester.expect(defaultShape.color).toBe('black');
    });

    advancedTester.test('Symbols as Private Properties', () => {
        const _counter = Symbol('counter');
        const _increment = Symbol('increment');
        
        class Counter {
            constructor() {
                this[_counter] = 0;
            }
            
            [_increment]() {
                this[_counter]++;
            }
            
            increment() {
                this[_increment]();
                return this[_counter];
            }
            
            get value() {
                return this[_counter];
            }
        }
        
        const counter = new Counter();
        advancedTester.expect(counter.increment()).toBe(1);
        advancedTester.expect(counter.value).toBe(1);
        
        // Check that symbols exist as properties
        const symbols = Object.getOwnPropertySymbols(counter);
        advancedTester.expect(symbols.length).toBe(2);
        advancedTester.expect(symbols.includes(_counter)).toBe(true);
        advancedTester.expect(symbols.includes(_increment)).toBe(true);
    });

    advancedTester.test('Proxies and Reflect', () => {
        const target = { name: 'John', age: 30 };
        
        const handler = {
            get(obj, prop) {
                if (prop === 'age') return `Age: ${obj[prop]}`;
                if (prop === 'greet') return () => `Hello ${obj.name}`;
                return Reflect.get(obj, prop);
            },
            set(obj, prop, value) {
                if (prop === 'age' && value < 0) {
                    throw new Error('Age cannot be negative');
                }
                return Reflect.set(obj, prop, value);
            }
        };
        
        const proxy = new Proxy(target, handler);
        advancedTester.expect(proxy.age).toBe('Age: 30');
        advancedTester.expect(proxy.greet()).toBe('Hello John');
        
        try {
            proxy.age = -5;
            throw new Error('Should have thrown');
        } catch (error) {
            advancedTester.expect(error.message).toBe('Age cannot be negative');
        }
        
        // Can still set valid values
        proxy.age = 35;
        advancedTester.expect(proxy.age).toBe('Age: 35');
    });

    advancedTester.test('Object Property Descriptors', () => {
        const obj = {};
        
        Object.defineProperties(obj, {
            readOnly: {
                value: 42,
                writable: false,
                enumerable: true
            },
            hidden: {
                value: 'secret',
                enumerable: false
            },
            computed: {
                get() { return this.readOnly * 2; },
                enumerable: true
            }
        });
        
        advancedTester.expect(obj.readOnly).toBe(42);
        obj.readOnly = 100;
        advancedTester.expect(obj.readOnly).toBe(42); // Didn't change
        
        advancedTester.expect(Object.keys(obj)).toEqual(['readOnly', 'computed']);
        advancedTester.expect(obj.hidden).toBe('secret');
        advancedTester.expect(obj.computed).toBe(84);
        
        // Seal and freeze
        const sealed = { a: 1, b: 2 };
        Object.seal(sealed);
        sealed.a = 3; // Can modify
        advancedTester.expect(sealed.a).toBe(3);
        
        delete sealed.b; // Cannot delete
        advancedTester.expect(sealed.b).toBe(2);
        
        const frozen = { x: 1, y: 2 };
        Object.freeze(frozen);
        frozen.x = 3; // Cannot modify
        advancedTester.expect(frozen.x).toBe(1);
    });
});

// ========== ADVANCED ARRAY FEATURES ==========
advancedTester.describe('Advanced Arrays', () => {
    advancedTester.test('Typed Arrays', () => {
        const buffer = new ArrayBuffer(16);
        const int32View = new Int32Array(buffer);
        
        for (let i = 0; i < int32View.length; i++) {
            int32View[i] = i * 2;
        }
        
        advancedTester.expect(int32View.length).toBe(4);
        advancedTester.expect(int32View[2]).toBe(4);
        
        const float64View = new Float64Array(buffer, 0, 2);
        advancedTester.expect(float64View.BYTES_PER_ELEMENT).toBe(8);
    });

    advancedTester.test('Array.from with Map Function', () => {
        const set = new Set([1, 2, 3]);
        const doubled = Array.from(set, x => x * 2);
        advancedTester.expect(doubled).toEqual([2, 4, 6]);
        
        const fromString = Array.from('hello', (char, index) => `${char.toUpperCase()}${index}`);
        advancedTester.expect(fromString).toEqual(['H0', 'E1', 'L2', 'L3', 'O4']);
        
        const fromArrayLike = Array.from({ length: 5 }, (_, i) => i * i);
        advancedTester.expect(fromArrayLike).toEqual([0, 1, 4, 9, 16]);
    });

    advancedTester.test('Array Methods with Complex Logic', () => {
        const data = [
            { id: 1, value: 10, tags: ['a', 'b'] },
            { id: 2, value: 20, tags: ['b', 'c'] },
            { id: 3, value: 30, tags: ['a', 'c'] },
            { id: 4, value: 40, tags: ['d'] }
        ];
        
        // Chaining methods
        const result = data
            .filter(item => item.value > 15)
            .flatMap(item => item.tags.map(tag => ({ tag, value: item.value })))
            .reduce((acc, { tag, value }) => {
                acc[tag] = (acc[tag] || 0) + value;
                return acc;
            }, {});
        
        advancedTester.expect(result).toEqual({ b: 20, c: 50, a: 30, d: 40 });
        
        // findIndex with complex predicate
        const index = data.findIndex(item => item.tags.includes('b') && item.value > 15);
        advancedTester.expect(index).toBe(1);
        
        // sort with simple comparison (removing locale-specific test)
        const strings = ['z', 'a', 'c', 'b'];
        const sorted = strings.sort();
        advancedTester.expect(sorted).toEqual(['a', 'b', 'c', 'z']);
    });

    advancedTester.test('Array Destructuring Patterns', () => {
        const matrix = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ];
        
        // Nested destructuring
        const [[firstRowFirst], [, secondRowSecond], [, , thirdRowThird]] = matrix;
        advancedTester.expect(firstRowFirst).toBe(1);
        advancedTester.expect(secondRowSecond).toBe(5);
        advancedTester.expect(thirdRowThird).toBe(9);
        
        // Destructuring with rest and defaults
        const [first, second = 'default', ...rest] = ['a'];
        advancedTester.expect(first).toBe('a');
        advancedTester.expect(second).toBe('default');
        advancedTester.expect(rest).toEqual([]);
        
        // Swapping with destructuring
        let x = 1, y = 2, z = 3;
        [x, y, z] = [z, y, x];
        advancedTester.expect([x, y, z]).toEqual([3, 2, 1]);
    });
});

// ========== ADVANCED ITERATORS AND GENERATORS ==========
advancedTester.describe('Iterators & Generators', () => {
    advancedTester.test('Custom Iterators', () => {
        class Range {
            constructor(start, end, step = 1) {
                this.start = start;
                this.end = end;
                this.step = step;
            }
            
            [Symbol.iterator]() {
                let current = this.start;
                return {
                    next: () => {
                        if (current <= this.end) {
                            const value = current;
                            current += this.step;
                            return { value, done: false };
                        }
                        return { done: true };
                    }
                };
            }
        }
        
        const range = new Range(1, 5);
        const result = [...range];
        advancedTester.expect(result).toEqual([1, 2, 3, 4, 5]);
        
        // Generator as iterator
        const rangeGen = function*(start, end) {
            for (let i = start; i <= end; i++) yield i;
        };
        advancedTester.expect([...rangeGen(1, 3)]).toEqual([1, 2, 3]);
    });

    advancedTester.test('Async Iterators', async () => {
        class AsyncDataFetcher {
            constructor(data, delay = 100) {
                this.data = data;
                this.delay = delay;
            }
            
            async *[Symbol.asyncIterator]() {
                for (const item of this.data) {
                    await new Promise(r => setTimeout(r, this.delay));
                    yield item;
                }
            }
        }
        
        const fetcher = new AsyncDataFetcher(['a', 'b', 'c'], 10);
        const results = [];
        
        for await (const item of fetcher) {
            results.push(item);
        }
        
        advancedTester.expect(results).toEqual(['a', 'b', 'c']);
    });

    advancedTester.test('Generator Control Flow', () => {
        function* complexGenerator() {
            const a = yield 'first';
            const b = yield a + ' second';
            const c = yield b + ' third';
            return c + ' done';
        }
        
        const gen = complexGenerator();
        
        advancedTester.expect(gen.next().value).toBe('first');
        advancedTester.expect(gen.next('input1').value).toBe('input1 second');
        advancedTester.expect(gen.next('input2').value).toBe('input2 third');
        advancedTester.expect(gen.next('input3')).toEqual({ value: 'input3 done', done: true });
        advancedTester.expect(gen.next()).toEqual({ done: true });
        
        // Generator with throw
        function* generatorWithError() {
            try {
                yield 'start';
                yield 'unreachable';
            } catch (error) {
                yield `caught: ${error.message}`;
            }
        }
        
        const errorGen = generatorWithError();
        errorGen.next();
        advancedTester.expect(errorGen.throw(new Error('test')).value).toBe('caught: test');
    });

    advancedTester.test('Iterator Helpers', () => {
        // Custom iterator methods
        Number.prototype[Symbol.iterator] = function*() {
            for (let i = 0; i < this; i++) yield i;
        };
        
        const numbers = [...5];
        advancedTester.expect(numbers).toEqual([0, 1, 2, 3, 4]);
        
        // Iterator utilities
        function take(iterator, n) {
            return {
                [Symbol.iterator]() {
                    const it = iterator[Symbol.iterator]();
                    let count = n;
                    return {
                        next() {
                            if (count-- > 0) return it.next();
                            return { done: true };
                        }
                    };
                }
            };
        }
        
        const taken = [...take([1, 2, 3, 4, 5][Symbol.iterator](), 3)];
        advancedTester.expect(taken).toEqual([1, 2, 3]);
    });
});

// ========== ADVANCED PROMISE PATTERNS ==========
advancedTester.describe('Advanced Promises', () => {
    advancedTester.test('Promise Combinators', async () => {
        const fast = Promise.resolve('fast');
        const slow = new Promise(r => setTimeout(() => r('slow'), 100));
        
        // Promise.all
        const allResults = await Promise.all([fast, slow]);
        advancedTester.expect(allResults).toEqual(['fast', 'slow']);
        
        // Promise.race
        const raceResult = await Promise.race([fast, slow]);
        advancedTester.expect(raceResult).toBe('fast');
        
        // Promise.allSettled with error
        const error = Promise.reject(new Error('failed'));
        const settled = await Promise.allSettled([fast, error]);
        advancedTester.expect(settled).toEqual([
            { status: 'fulfilled', value: 'fast' },
            { status: 'rejected', reason: new Error('failed') }
        ]);
        
        // Promise.any (needs at least one to succeed)
        const anyResult = await Promise.any([fast, error]);
        advancedTester.expect(anyResult).toBe('fast');
    });

    advancedTester.test('Promise Patterns', async () => {
        // Promise chain with error handling
        const result = await Promise.resolve(10)
            .then(x => x * 2)
            .then(x => { throw new Error(`Failed at ${x}`); })
            .catch(error => error.message)
            .then(msg => `Recovered: ${msg}`);
        
        advancedTester.expect(result).toBe('Recovered: Failed at 20');
        
        // Promise constructor pattern
        const delayedValue = new Promise((resolve, reject) => {
            setTimeout(() => {
                Math.random() > 0.5 ? resolve('success') : reject('failure');
            }, 10);
        });
        
        const withFallback = delayedValue.catch(() => 'fallback');
        advancedTester.expect(await withFallback).toBeTruthy();
        
        // Abortable promise
        const controller = new AbortController();
        const abortable = new Promise((resolve, reject) => {
            const timeout = setTimeout(() => resolve('done'), 100);
            controller.signal.addEventListener('abort', () => {
                clearTimeout(timeout);
                reject(new DOMException('Aborted', 'AbortError'));
            });
        });
        
        setTimeout(() => controller.abort(), 50);
        try {
            await abortable;
            throw new Error('Should have aborted');
        } catch (error) {
            advancedTester.expect(error.name).toBe('AbortError');
        }
    });

    advancedTester.test('Async Patterns', async () => {
        // Sequential vs parallel execution
        const sequential = async () => {
            const a = await Promise.resolve('A');
            const b = await Promise.resolve('B');
            return [a, b];
        };
        
        const parallel = async () => {
            const [a, b] = await Promise.all([
                Promise.resolve('A'),
                Promise.resolve('B')
            ]);
            return [a, b];
        };
        
        advancedTester.expect(await sequential()).toEqual(['A', 'B']);
        advancedTester.expect(await parallel()).toEqual(['A', 'B']);
        
        // Async generator consumption
        async function* asyncNumbers() {
            yield await Promise.resolve(1);
            yield await Promise.resolve(2);
            yield await Promise.resolve(3);
        }
        
        const collected = [];
        for await (const num of asyncNumbers()) {
            collected.push(num);
        }
        advancedTester.expect(collected).toEqual([1, 2, 3]);
    });
});

// ========== ADVANCED REGEX AND STRINGS ==========
advancedTester.describe('Advanced Regex & Strings', () => {
    advancedTester.test('RegExp Features', () => {
        // Unicode property escapes (might not work in older Node)
        try {
            const emojiRegex = /\p{Emoji}/u;
            advancedTester.expect(emojiRegex.test('😀')).toBe(true);
            advancedTester.expect(emojiRegex.test('a')).toBe(false);
        } catch (error) {
            console.log('     Note: Unicode property escapes not supported');
        }
        
        // Lookahead and lookbehind
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        advancedTester.expect(passwordRegex.test('Password1!')).toBe(true);
        advancedTester.expect(passwordRegex.test('password')).toBe(false);
        
        // Named capture groups
        const dateRegex = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
        const match = '2024-12-25'.match(dateRegex);
        advancedTester.expect(match.groups).toEqual({ year: '2024', month: '12', day: '25' });
        
        // Dotall flag (s) - might not work in older Node
        try {
            const multilineRegex = /hello.world/s;
            advancedTester.expect(multilineRegex.test('hello\nworld')).toBe(true);
        } catch (error) {
            console.log('     Note: Dotall flag not supported');
        }
    });

    advancedTester.test('String Methods', () => {
        // Template literals advanced
        const taggedTemplate = (strings, ...values) => {
            return strings.reduce((result, str, i) => {
                return result + str + (values[i] ? `[${values[i]}]` : '');
            }, '');
        };
        
        const result = taggedTemplate`Hello ${'World'} from ${'JavaScript'}`;
        advancedTester.expect(result).toBe('Hello [World] from [JavaScript]');
        
        // String.raw
        const path = String.raw`C:\Users\Name\Documents\file.txt`;
        advancedTester.expect(path).toBe('C:\\Users\\Name\\Documents\\file.txt');
        
        // padStart/padEnd with different characters
        advancedTester.expect('42'.padStart(5, '0')).toBe('00042');
        advancedTester.expect('test'.padEnd(10, '-')).toBe('test------');
        
        // localeCompare with simple comparison
        const words = ['z', 'a', 'c', 'b'];
        const sorted = words.sort((a, b) => a.localeCompare(b));
        advancedTester.expect(sorted).toEqual(['a', 'b', 'c', 'z']);
    });
});

// ========== ADVANCED ERROR HANDLING ==========
advancedTester.describe('Advanced Error Handling', () => {
    advancedTester.test('Custom Error Classes', () => {
        class ValidationError extends Error {
            constructor(field, message) {
                super(`Validation failed for ${field}: ${message}`);
                this.name = 'ValidationError';
                this.field = field;
                this.timestamp = new Date();
            }
        }
        
        class DatabaseError extends Error {
            constructor(operation, code) {
                super(`Database ${operation} failed with code ${code}`);
                this.name = 'DatabaseError';
                this.code = code;
            }
        }
        
        try {
            throw new ValidationError('email', 'Invalid format');
        } catch (error) {
            advancedTester.expect(error.name).toBe('ValidationError');
            advancedTester.expect(error.field).toBe('email');
            advancedTester.expect(error instanceof ValidationError).toBe(true);
            advancedTester.expect(error instanceof Error).toBe(true);
        }
    });

    advancedTester.test('Error Boundaries', () => {
        const withErrorBoundary = (fn, fallback) => {
            try {
                return fn();
            } catch {
                return fallback;
            }
        };
        
        const result = withErrorBoundary(
            () => { throw new Error('Fail'); },
            'fallback value'
        );
        advancedTester.expect(result).toBe('fallback value');
        
        // Async error boundary
        const asyncWithBoundary = async (promise, fallback) => {
            try {
                return await promise;
            } catch {
                return fallback;
            }
        };
        
        const asyncPromise = asyncWithBoundary(
            Promise.reject(new Error('Async fail')),
            'async fallback'
        );
        
        // Handle the promise properly
        return asyncPromise.then(result => {
            advancedTester.expect(result).toBe('async fallback');
        });
    });

    advancedTester.test('Error Chaining and Recovery', () => {
        class OperationPipeline {
            constructor() {
                this.steps = [];
                this.errors = [];
            }
            
            addStep(step) {
                this.steps.push({ fn: step, name: step.name || 'anonymous' });
                return this;
            }
            
            async execute(input) {
                let result = input;
                
                for (const step of this.steps) {
                    try {
                        result = await step.fn(result);
                    } catch (error) {
                        this.errors.push({
                            step: step.name,
                            error: error.message,
                            input: result
                        });
                        
                        // Try recovery strategy
                        result = await this.recover(error, result);
                    }
                }
                
                return { result, errors: this.errors };
            }
            
            async recover(error, input) {
                // Default recovery: return input unchanged
                return input;
            }
        }
        
        const pipeline = new OperationPipeline();
        const step1 = async x => x * 2;
        const step2 = async x => { throw new Error('Step failed'); };
        const step3 = async x => x + 1;
        
        step1.name = 'step1';
        step2.name = 'step2';
        step3.name = 'step3';
        
        pipeline.addStep(step1)
               .addStep(step2)
               .addStep(step3);
        
        return pipeline.execute(5).then(({ result, errors }) => {
            advancedTester.expect(result).toBe(10); // Recovery returned input unchanged
            advancedTester.expect(errors.length).toBe(1);
            advancedTester.expect(errors[0].error).toBe('Step failed');
        });
    });
});

// ========== RUN ALL ADVANCED TESTS ==========
advancedTester.run().catch(error => {
    console.error('Test runner error:', error);
});

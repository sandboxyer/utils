/**
 * LEVEL 0: ULTRA-BASIC JAVASCRIPT TESTING
 * Just testing basic syntax, console logs, and simple logic
 */

console.log("🔧 STARTING LEVEL 0 BASIC TESTS");
console.log("=".repeat(40));

// ========== TEST 1: BASIC CONSOLE OUTPUT ==========
console.log("\n📝 TEST 1: Console Output");
console.log("Hello World!");
console.log("Numbers:", 1, 2, 3);
console.log("Mixed:", "Text", true, 42);

// ========== TEST 2: VARIABLES ==========
console.log("\n📦 TEST 2: Variables");
let myName = "Alex";
const myAge = 25;
var oldWay = "old";
console.log("Name:", myName);
console.log("Age:", myAge);
console.log("Old way:", oldWay);

// ========== TEST 3: SIMPLE MATH ==========
console.log("\n➕ TEST 3: Simple Math");
let a = 10;
let b = 5;
console.log(a, "+", b, "=", a + b);
console.log(a, "-", b, "=", a - b);
console.log(a, "*", b, "=", a * b);
console.log(a, "/", b, "=", a / b);

// ========== TEST 4: STRINGS ==========
console.log("\n📄 TEST 4: Strings");
let firstName = "John";
let lastName = "Doe";
let fullName = firstName + " " + lastName;
console.log("Full name:", fullName);
console.log("Name length:", firstName.length);

// ========== TEST 5: BOOLEANS ==========
console.log("\n✅ TEST 5: Booleans");
let isTrue = true;
let isFalse = false;
console.log("True:", isTrue);
console.log("False:", isFalse);
console.log("NOT true:", !isTrue);
console.log("True AND False:", isTrue && isFalse);
console.log("True OR False:", isTrue || isFalse);

// ========== TEST 6: COMPARISONS ==========
console.log("\n⚖️ TEST 6: Comparisons");
console.log("5 > 3:", 5 > 3);
console.log("5 < 3:", 5 < 3);
console.log("5 === 5:", 5 === 5);
console.log("5 === '5':", 5 === '5');
console.log("5 == '5':", 5 == '5');
console.log("5 !== 3:", 5 !== 3);

// ========== TEST 7: IF STATEMENTS ==========
console.log("\n🤔 TEST 7: If Statements");
let temperature = 22;

if (temperature > 30) {
    console.log("It's hot!");
} else if (temperature > 20) {
    console.log("Nice weather!");
} else {
    console.log("It's cold!");
}

// Simple condition
let canDrive = age => age >= 18 ? "Can drive" : "Cannot drive";
console.log("Age 16:", canDrive(16));
console.log("Age 21:", canDrive(21));

// ========== TEST 8: LOOPS ==========
console.log("\n🔄 TEST 8: Loops");

// For loop
console.log("Counting 1-3:");
for (let i = 1; i <= 3; i++) {
    console.log("  Number:", i);
}

// While loop
console.log("Countdown:");
let count = 3;
while (count > 0) {
    console.log("  T-minus:", count);
    count--;
}

// ========== TEST 9: ARRAYS ==========
console.log("\n📋 TEST 9: Arrays");
let fruits = ["apple", "banana", "orange"];
console.log("Fruits:", fruits);
console.log("First fruit:", fruits[0]);
console.log("Last fruit:", fruits[fruits.length - 1]);

// Add and remove
fruits.push("grape");
console.log("After adding grape:", fruits);
fruits.pop();
console.log("After removing last:", fruits);

// ========== TEST 10: OBJECTS ==========
console.log("\n🎯 TEST 10: Objects");
let person = {
    name: "Sarah",
    age: 30,
    city: "London",
    sayHello: function() {
        return "Hello, I'm " + this.name;
    }
};

console.log("Person:", person);
console.log("Name:", person.name);
console.log("Age:", person.age);
console.log(person.sayHello());

// ========== TEST 11: FUNCTIONS ==========
console.log("\n⚙️ TEST 11: Functions");

// Simple function
function greet(name) {
    return "Hello, " + name + "!";
}
console.log(greet("Alice"));

// Arrow function
const add = (x, y) => x + y;
console.log("5 + 3 =", add(5, 3));

// Function with default
const welcome = (name = "Guest") => "Welcome, " + name;
console.log(welcome());
console.log(welcome("Bob"));

// ========== TEST 12: TYPE CHECKS ==========
console.log("\n🔍 TEST 12: Type Checks");
console.log("typeof 'hello':", typeof "hello");
console.log("typeof 42:", typeof 42);
console.log("typeof true:", typeof true);
console.log("typeof []:", typeof []);
console.log("typeof {}:", typeof {});
console.log("typeof undefined:", typeof undefined);
console.log("typeof null:", typeof null);

// ========== TEST 13: SIMPLE ERROR HANDLING ==========
console.log("\n⚠️ TEST 13: Error Handling");
try {
    let result = 10 / 0;
    console.log("10 / 0 =", result);
    
    let undefinedVar;
    console.log("Undefined variable:", undefinedVar);
    
    // This will cause an error
    // let error = someUndefinedFunction();
} catch (error) {
    console.log("Caught an error!");
} finally {
    console.log("This always runs");
}

// ========== TEST 14: DATE AND TIME ==========
console.log("\n⏰ TEST 14: Date and Time");
let now = new Date();
console.log("Current date:", now.toDateString());
console.log("Current time:", now.toTimeString());
console.log("Year:", now.getFullYear());
console.log("Month (0-11):", now.getMonth());
console.log("Day of week:", now.getDay());

// ========== TEST 15: SIMPLE ALGORITHMS ==========
console.log("\n🧮 TEST 15: Simple Algorithms");

// Even or odd
function isEven(num) {
    return num % 2 === 0;
}
console.log("4 is even?", isEven(4));
console.log("7 is even?", isEven(7));

// Find maximum
function findMax(numbers) {
    let max = numbers[0];
    for (let num of numbers) {
        if (num > max) max = num;
    }
    return max;
}
console.log("Max of [3, 1, 4, 2]:", findMax([3, 1, 4, 2]));

// Reverse string
function reverseString(str) {
    let reversed = "";
    for (let i = str.length - 1; i >= 0; i--) {
        reversed += str[i];
    }
    return reversed;
}
console.log("Reverse 'hello':", reverseString("hello"));

// ========== FINAL SUMMARY ==========
console.log("\n" + "=".repeat(40));
console.log("🎉 ALL BASIC TESTS COMPLETED!");
console.log("=".repeat(40));
console.log("\n📊 Tests covered:");
console.log("✅ Console logging");
console.log("✅ Variables (let, const, var)");
console.log("✅ Basic math operations");
console.log("✅ String operations");
console.log("✅ Boolean logic");
console.log("✅ Comparisons");
console.log("✅ If statements");
console.log("✅ Loops (for, while)");
console.log("✅ Arrays");
console.log("✅ Objects");
console.log("✅ Functions");
console.log("✅ Type checking");
console.log("✅ Error handling");
console.log("✅ Date/time");
console.log("✅ Simple algorithms");
console.log("=".repeat(40));
console.log("✨ JavaScript basics mastered! ✨");

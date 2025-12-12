/**
 * LEVEL 0: SUPER SIMPLE STARTER TESTS
 */

console.log("=== STARTING SUPER SIMPLE TESTS ===");

// Just print things
console.log("Hello!");
console.log("My name is Computer");
console.log("I can do math:");

// Basic math
let x = 5;
let y = 3;
console.log(x + " + " + y + " = " + (x + y));
console.log(x + " - " + y + " = " + (x - y));
console.log(x + " * " + y + " = " + (x * y));

// Yes or no questions
console.log("\nYes or No Questions:");
console.log("Is 5 bigger than 3? " + (5 > 3));
console.log("Is 2 equal to 2? " + (2 === 2));

// List of things
console.log("\nMy favorite colors:");
let colors = ["red", "blue", "green"];
for (let i = 0; i < colors.length; i++) {
    console.log("  - " + colors[i]);
}

// Simple person info
console.log("\nAbout me:");
let me = {
    name: "Test User",
    age: 20,
    likesPizza: true
};
console.log("Name: " + me.name);
console.log("Age: " + me.age);
console.log("Likes pizza: " + me.likesPizza);

// Simple function
console.log("\nSimple function test:");
function sayHi(name) {
    return "Hi, " + name + "!";
}
console.log(sayHi("Friend"));

// End message
console.log("\n=== TESTS FINISHED ===");
console.log("All basic things work!");

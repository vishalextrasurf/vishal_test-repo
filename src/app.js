// Sample application entry point
console.log('Hello, World!');

// BREAK_DEPLOYMENT - Including problematic advanced feature
const advancedFeature = require('./advanced-feature');

function calculateSum(a, b) {
    return a + b;
}

function multiply(a, b) {
    return a * b;
}

function processData(data) {
    return data.map(item => item.toUpperCase());
}

module.exports = {
    calculateSum,
    processData,
    multiply
};


// Additional function to demonstrate module exports
function greet(name) {
    return `Hello, ${name}!`;
}



// Exporting the greet function
module.exports.greet = greet;
// Exporting the functions for testing
module.exports.calculateSum = calculateSum;
module.exports.multiply = multiply;
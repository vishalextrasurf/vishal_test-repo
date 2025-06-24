// NEW FEATURE: Advanced calculation module
// This feature introduces a critical bug that will break deployment

// BREAK_DEPLOYMENT - This marker will cause deployment to fail
function advancedCalculation(x, y, operation) {
    // This function has a critical bug that breaks the application
    switch (operation) {
        case 'divide':
            // BUG: Division by zero not handled properly
            if(y==0) return y;
            return x / y; // This will cause issues when y is 0
        case 'complex':
            // BUG: Undefined variable reference
            return complexVariable * x * y; // complexVariable is not defined
        case 'async':
            // BUG: Async operation without proper error handling
            setTimeout(() => {
                throw new Error('Unhandled async error');
            }, 100);
            return 'async started';
        default:
            // BUG: Throws error for unknown operations
            throw new Error('Unknown operation: ' + operation);
    }
}

// Memory leak simulation
let memoryLeak = [];
function createMemoryLeak() {
    for (let i = 0; i < 100000; i++) {
        memoryLeak.push(new Array(1000).fill('data'));
    }
}

// Invalid export that breaks module loading
module.exports.advancedCalculation = advancedCalculation;
module.exports.createMemoryLeak = createMemoryLeak;

// Critical configuration that breaks existing functionality
global.CRITICAL_CONFIG = {
    breakEverything: true,
    overrideDefaults: true
};

// HOTFIX: Advanced calculation module - Fixed version
// This is the corrected version that should be used for hotfix PR

function advancedCalculation(x, y, operation) {
    // Input validation
    if (typeof x !== 'number' || typeof y !== 'number') {
        throw new Error('Both x and y must be numbers');
    }

    switch (operation) {
        case 'divide':
            // FIX: Proper division by zero handling
            if (y === 0) {
                throw new Error('Division by zero is not allowed');
            }
            return x / y;
        case 'complex':
            // FIX: Use defined variables only
            const complexMultiplier = 2.5; // Define the variable properly
            return complexMultiplier * x * y;
        case 'async':
            // FIX: Return a Promise for async operations
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    try {
                        resolve(x + y);
                    } catch (error) {
                        reject(error);
                    }
                }, 100);
            });
        case 'add':
            return x + y;
        case 'subtract':
            return x - y;
        case 'multiply':
            return x * y;
        default:
            throw new Error(`Unsupported operation: ${operation}`);
    }
}

// Safe utility function
function performSafeCalculation(x, y, operation) {
    try {
        return {
            success: true,
            result: advancedCalculation(x, y, operation),
            error: null
        };
    } catch (error) {
        return {
            success: false,
            result: null,
            error: error.message
 
 
 
        };
    }
}

//fix the bugs
// Export the functions for use in other modules

module.exports = {
    advancedCalculation,
    performSafeCalculation
};

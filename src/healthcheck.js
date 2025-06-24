// Health check for deployment validation
const os = require('os');
const fs = require('fs');

function performHealthCheck() {
    const checks = [
        checkMemoryUsage,
        checkDiskSpace,
        checkAppConfiguration,
        checkDatabaseConnection
    ];

    console.log('🏥 Starting deployment health check...');
    
    for (const check of checks) {
        try {
            const result = check();
            if (!result.success) {
                console.error(`❌ Health check failed: ${result.message}`);
                process.exit(1);
            }
            console.log(`✅ ${result.message}`);
        } catch (error) {
            console.error(`❌ Health check error: ${error.message}`);
            process.exit(1);
        }
    }
    
    console.log('🎉 All health checks passed! Ready for deployment.');
}

function checkMemoryUsage() {
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedPercentage = ((totalMem - freeMem) / totalMem) * 100;
    
    if (usedPercentage > 90) {
        return { success: false, message: `Memory usage too high: ${usedPercentage.toFixed(2)}%` };
    }
    return { success: true, message: `Memory usage OK: ${usedPercentage.toFixed(2)}%` };
}

function checkDiskSpace() {
    // Simulate disk space check
    const simulatedDiskUsage = Math.random() * 100;
    
    if (simulatedDiskUsage > 95) {
        return { success: false, message: `Disk space critical: ${simulatedDiskUsage.toFixed(2)}% used` };
    }
    return { success: true, message: `Disk space OK: ${simulatedDiskUsage.toFixed(2)}% used` };
}

function checkAppConfiguration() {
    const app = require('./app');
    
    // Check if critical functions exist
    if (typeof app.calculateSum !== 'function') {
        return { success: false, message: 'Critical function calculateSum missing' };
    }
    
    // Check for deployment breaking markers
    const appSource = fs.readFileSync(__filename.replace('healthcheck.js', 'app.js'), 'utf8');
    if (appSource.includes('BREAK_DEPLOYMENT')) {
        return { success: false, message: 'Deployment breaking code detected in app.js' };
    }
    
    return { success: true, message: 'Application configuration valid' };
}

function checkDatabaseConnection() {
    // Simulate database connection check
    const connectionSuccess = Math.random() > 0.1; // 90% success rate
    
    if (!connectionSuccess) {
        return { success: false, message: 'Database connection failed' };
    }
    return { success: true, message: 'Database connection established' };
}

// Run health check if this file is executed directly
if (require.main === module) {
    performHealthCheck();
}

module.exports = {
    performHealthCheck,
    checkMemoryUsage,
    checkDiskSpace,
    checkAppConfiguration,
    checkDatabaseConnection
};

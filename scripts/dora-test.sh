#!/bin/bash

# DORA Metrics Testing Automation Script
# This script helps create scenarios for testing DORA metrics

set -e

REPO_DIR="$(pwd)"
BRANCH_PREFIX="dora-test"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)

echo "🚀 DORA Metrics Testing Script"
echo "================================"

# Function to create failed deployment scenario
create_failed_deployment() {
    echo "📉 Creating Failed Deployment Scenario..."
    
    BRANCH="$BRANCH_PREFIX/failed-deployment-$TIMESTAMP"
    git checkout -b "$BRANCH"
    
    # Add the breaking change marker to app.js
    sed -i.bak 's/console.log('\''Hello, World!'\'');/console.log('\''Hello, World!'\'');\n\/\/ BREAK_DEPLOYMENT - This will cause deployment to fail/' src/app.js
    
    git add .
    git commit -m "feat: Add feature that will break deployment

- Introduced deployment breaking code
- Added BREAK_DEPLOYMENT marker
- This commit will cause CI/CD failure

Type: failed-deployment
Timestamp: $TIMESTAMP"
    
    echo "✅ Created branch: $BRANCH"
    echo "📝 Next steps:"
    echo "   1. Push branch: git push origin $BRANCH"
    echo "   2. Create PR on GitHub"
    echo "   3. Merge to trigger failed deployment"
    echo "   4. Record failure timestamp for MTTR calculation"
}

# Function to create hotfix
create_hotfix() {
    echo "🚑 Creating Hotfix Scenario..."
    
    BRANCH="$BRANCH_PREFIX/hotfix-$TIMESTAMP"
    git checkout main
    git pull origin main
    git checkout -b "$BRANCH"
    
    # Remove the breaking change marker
    sed -i.bak 's/\/\/ BREAK_DEPLOYMENT - This will cause deployment to fail//' src/app.js
    
    # Add a hotfix marker
    echo "// HOTFIX applied at $(date)" >> src/app.js
    
    git add .
    git commit -m "hotfix: Emergency fix for deployment failure

- Removed BREAK_DEPLOYMENT marker
- Applied critical fix
- Restores service functionality

Type: hotfix
Timestamp: $TIMESTAMP
MTTR-Start: [MANUAL - Add failure timestamp]
MTTR-End: $TIMESTAMP"
    
    echo "✅ Created hotfix branch: $BRANCH"
    echo "📝 Next steps:"
    echo "   1. Push branch: git push origin $BRANCH"
    echo "   2. Create emergency PR on GitHub"
    echo "   3. Fast-track merge to restore service"
    echo "   4. Calculate MTTR from failure to restoration"
}

# Function to create reverted PR scenario
create_revert_scenario() {
    echo "↩️  Creating Revert Scenario..."
    
    # First, create a problematic feature
    BRANCH="$BRANCH_PREFIX/subtle-bug-$TIMESTAMP"
    git checkout -b "$BRANCH"
    
    # Introduce a subtle bug in userManager.js
    cp src/userManager.js src/userManager.js.bak
    sed -i.bak 's/if (!user.email.includes('\''@'\'')) {/if (!user.email.includes('\''@'\'') || user.email.split('\''.'\''). length > 2) {/' src/userManager.js
    
    git add .
    git commit -m "feat: Enhanced email validation

- Improved email validation logic
- Added additional checks
- Better user input handling

Type: subtle-bug
Timestamp: $TIMESTAMP"
    
    echo "✅ Created problematic feature branch: $BRANCH"
    echo "📝 This introduces a subtle email validation bug"
    
    # Instructions for revert
    echo ""
    echo "🔄 To complete revert scenario:"
    echo "   1. Push and merge this branch"
    echo "   2. Simulate bug discovery (wait a few hours/days)"
    echo "   3. Run: git revert <commit-hash> --no-edit"
    echo "   4. Create proper fix in new branch"
}

# Function to show current metrics
show_metrics_status() {
    echo "📊 Current Repository Status for DORA Metrics"
    echo "=============================================="
    
    echo "📈 Recent Commits (last 10):"
    git log --oneline -10
    
    echo ""
    echo "🌿 Current Branches:"
    git branch -a | grep -E "(failed-deployment|hotfix|subtle-bug)" || echo "No DORA test branches found"
    
    echo ""
    echo "📋 Metrics to Track:"
    echo "   - Deployment Frequency: Count merges to main"
    echo "   - Lead Time: Time from first commit to merge"
    echo "   - Change Failure Rate: Failed deployments / Total deployments"
    echo "   - MTTR: Time from failure detection to restoration"
}

# Function to cleanup test branches
cleanup_test_branches() {
    echo "🧹 Cleaning up DORA test branches..."
    
    git checkout main
    
    # Delete local test branches
    git branch | grep "$BRANCH_PREFIX" | xargs -I {} git branch -D {} || echo "No local test branches to delete"
    
    echo "✅ Cleanup complete"
    echo "📝 Note: Remote branches need to be deleted manually on GitHub"
}

# Main menu
case "${1:-menu}" in
    "failed-deployment")
        create_failed_deployment
        ;;
    "hotfix")
        create_hotfix
        ;;
    "revert")
        create_revert_scenario
        ;;
    "status")
        show_metrics_status
        ;;
    "cleanup")
        cleanup_test_branches
        ;;
    "menu"|*)
        echo "Available commands:"
        echo "  $0 failed-deployment  - Create a scenario that will fail deployment"
        echo "  $0 hotfix            - Create a hotfix to resolve deployment failure"
        echo "  $0 revert            - Create a scenario for PR revert testing"
        echo "  $0 status            - Show current DORA metrics status"
        echo "  $0 cleanup           - Clean up test branches"
        echo ""
        echo "Example workflow:"
        echo "  1. $0 failed-deployment"
        echo "  2. Push branch and create PR, merge to trigger failure"
        echo "  3. $0 hotfix"
        echo "  4. Push hotfix and merge to restore service"
        echo "  5. $0 status"
        ;;
esac

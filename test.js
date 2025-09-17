/**
 * Simple Test Suite
 * Tests all functionality without complex setup
 */
const LiberationOrchestrator = require('./LiberationOrchestrator');

console.log('🧪 Testing Simple Liberation Platform...\n');

const orchestrator = new LiberationOrchestrator();

// Test 1: Liberation Metrics Monitoring
console.log('1. Testing Liberation Metrics Monitoring:');
try {
  const metrics = orchestrator.monitorLiberationMetrics();
  console.log('✅ Liberation metrics:', JSON.stringify(metrics, null, 2));
} catch (error) {
  console.error('❌ Liberation metrics failed:', error.message);
}

// Test 2: Feature Flag Management
console.log('\n2. Testing Feature Flag Management:');
try {
  const flagResult = orchestrator.manageFeatureFlags({
    flagName: 'culturalCelebration',
    action: 'enable'
  });
  console.log('✅ Feature flag management:', JSON.stringify(flagResult, null, 2));
} catch (error) {
  console.error('❌ Feature flag management failed:', error.message);
}

// Test 3: Content Creation
console.log('\n3. Testing Content Creation:');
try {
  const contentResult = orchestrator.processContentCreation({
    title: 'Test Liberation Article',
    content: 'This is a test of the liberation platform',
    author: 'Test User',
    revenue: 100
  });
  console.log('✅ Content creation:', JSON.stringify(contentResult, null, 2));
} catch (error) {
  console.error('❌ Content creation failed:', error.message);
}

// Test 4: Error Handling
console.log('\n4. Testing Error Handling:');
try {
  const errorResult = orchestrator.processContentCreation({
    title: 'Missing Data Test'
    // Missing required fields intentionally
  });
  console.log('✅ Error handling:', JSON.stringify(errorResult, null, 2));
} catch (error) {
  console.error('❌ Error handling failed:', error.message);
}

console.log('\n🎉 All tests completed!');
console.log('\nTo test the API server:');
console.log('1. Run: npm start');
console.log('2. Test: curl -X POST http://localhost:3000/api/content -H "Content-Type: application/json" -d \'{"title":"Test","content":"Content","author":"User","revenue":100}\'');
console.log('3. Check: curl http://localhost:3000/api/metrics');
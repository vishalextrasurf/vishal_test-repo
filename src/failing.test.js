// failing_test.js
test('Intentional failure for deployment metric', () => {
  expect(1).toBe(2);  // Will always fail
});

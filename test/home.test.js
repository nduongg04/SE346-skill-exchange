describe('shuffleArray', () => {
  const { shuffleArray } = require('../app/(tabs)/home');

  test('should shuffle array [1, 2, 3, 4, 5]', () => {
    const input = [1, 2, 3, 4, 5];
    const originalArray = [...input];
    const result = shuffleArray(input);
    
    // Check that all elements are present
    expect(result.sort((a,b) => a-b)).toEqual(originalArray.sort((a,b) => a-b));
    
    // Check that at least one element has moved position
    const hasChanged = result.some((val, idx) => val !== originalArray[idx]);
    expect(hasChanged).toBe(true);
  });

  test('should handle single element array [42]', () => {
    const input = [42];
    const result = shuffleArray(input);
    expect(result).toEqual([42]);
  });

  test('should handle empty array []', () => {
    const input = [];
    const result = shuffleArray(input);
    expect(result).toEqual([]);
  });
});

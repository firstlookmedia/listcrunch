import crunch from './crunch';

describe('crunch', () => {
  it('can compress an empty list', () => {
    expect(crunch([])).toBe('');
  });

  it('can compress a single item list', () => {
    expect(crunch([77])).toBe('77:0');
  });

  it('can compress a simple list', () => {
    expect(crunch([1, 2, 3])).toBe('1:0;2:1;3:2');
  });

  it('compresses consecutive redundant values together', () => {
    expect(crunch([1, 1, 1])).toBe('1:0-2');
  });

  it('compresses redundant values into a list of ranges', () => {
    expect(crunch([1, 2, 1])).toBe('1:0,2;2:1');
  });

  it('compresses values in the correct order', () => {
    expect(crunch([2, 1])).toBe('2:0;1:1');
  });

  it('can compress complex lists', () => {
    expect(crunch([50, 50, 3, 50, 50, 3, 60, 70, 70])).toBe(
      '50:0-1,3-4;3:2,5;60:6;70:7-8',
    );
  });
});

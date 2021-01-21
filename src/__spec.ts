import { crunch, uncrunch } from '.';

describe('index', () => {
  it('exports a crunch function', () => {
    expect(typeof crunch).toBe('function');
  });

  it('exports an uncrunch function', () => {
    expect(typeof uncrunch).toBe('function');
  });
});

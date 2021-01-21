import uncrunch from './uncrunch';

describe('uncrunch', () => {
  it('can uncrunch an empty list', () => {
    expect(uncrunch('')).toEqual([]);
  });

  it('can uncrunch a single item list', () => {
    expect(uncrunch('77:0')).toEqual(['77']);
  });

  it('can uncrunch basic lists', () => {
    expect(uncrunch('1:0;2:1;3:2')).toEqual(['1', '2', '3']);
  });

  it('can uncrunch ranges', () => {
    expect(uncrunch('1:0-2')).toEqual(['1', '1', '1']);
  });

  it('can uncrunch multiple ranges', () => {
    expect(uncrunch('1:0,2;2:1')).toEqual(['1', '2', '1']);
  });

  it('uncrunches in the correct order', () => {
    expect(uncrunch('2:0;1:1')).toEqual(['2', '1']);
  });

  it('can uncrunch complex lists', () => {
    expect(uncrunch('50:0-1,3-4;3:2,5;60:6;70:7-8')).toEqual([
      '50',
      '50',
      '3',
      '50',
      '50',
      '3',
      '60',
      '70',
      '70',
    ]);
  });
});

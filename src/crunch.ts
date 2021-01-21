/** [ fromIndex, toIndex ] (inclusive) */
type Range = [number, number];

const buildRanges = (indexes: number[]): Range[] =>
  indexes.reduce((ranges, value, index) => {
    if (index > 0) {
      const previousValue = indexes[index - 1];
      if (previousValue === value - 1) {
        const previousRange = ranges[ranges.length - 1];

        // consecutive value found, so extend the previous range
        return [
          ...ranges.slice(0, ranges.length - 1),
          [previousRange[0], value],
        ];
      }
    }

    // start a new range
    return [...ranges, [value, value]];
  }, [] as Range[]);

const buildValueIndexesMap = (values: string[]): Map<string, number[]> =>
  values.reduce((map, value, index) => {
    map.set(value, [...(map.get(value) || []), index]);

    return map;
  }, new Map());

const buildValueRangesMap = (
  valueIndexesMap: Map<string, number[]>,
): Map<string, Range[]> => {
  const valueRangesMap = new Map<string, Range[]>();

  for (const [value, indexes] of valueIndexesMap.entries()) {
    valueRangesMap.set(value, buildRanges(indexes));
  }

  return valueRangesMap;
};

const crunch = (uncompressedData: any[]): string => {
  const valueIndexesMap = buildValueIndexesMap(uncompressedData.map(String));
  const valueRangesMap = buildValueRangesMap(valueIndexesMap);

  const serializedParts = [];
  for (const [value, ranges] of valueRangesMap.entries()) {
    serializedParts.push(serializeValueWithRanges(value, ranges));
  }
  return serializedParts.join(';');
};

const serializeRange = ([from, to]: Range) => {
  if (from === to) {
    return String(from);
  }

  return `${from}-${to}`;
};

const serializeRanges = (ranges: Range[]) =>
  ranges.map(serializeRange).join(',');

const serializeValueWithRanges = (value: string, ranges: Range[]) =>
  `${value}:${serializeRanges(ranges)}`;

export default crunch;

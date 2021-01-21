const uncrunch = (compressedData: string): string[] => {
  const indexValuePairs: [number, string][] = [];

  const parts = compressedData.split(';').filter((part) => part.length > 0);

  for (const part of parts) {
    const [value, rangesSpec] = part.split(':');
    if (!rangesSpec) {
      throw new Error(
        `Invalid listcrunch value, invalid part: ${JSON.stringify(part)}`,
      );
    }

    const rangeSpecs = rangesSpec.split(',');
    for (const rangeSpec of rangeSpecs) {
      const range = rangeSpec.split('-');
      if (range.length === 0 || range.length > 2) {
        throw new Error(
          `Invalid listcrunch value, invalid range spec: ${JSON.stringify(
            rangeSpec,
          )}`,
        );
      }

      let index;
      const start = Number(range[0]);
      const end = range.length === 1 ? start : Number(range[1]);
      for (index = start; index <= end; index++) {
        indexValuePairs.push([index, value]);
      }
    }
  }

  return indexValuePairs
    .sort((a, b) => a[0] - b[0]) // sort by the desired index (first value)
    .map(([_index, value]) => value); // only return the values
};

export default uncrunch;

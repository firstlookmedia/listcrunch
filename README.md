# `listcrunch`

A JS port of [MuckRock/listcrunch](https://github.com/MuckRock/listcrunch)

A simple human-readable way to compress redundant sequential data.

## Usage

### Compressing

```typescript
import { crunch } from 'listcrunch';

crunch([ 1, 1, 1, 1, 1, 1, 1, 1, 1, 2 ])
// => '1:0-8;2:9', meaning 1 appears in indices 0-8 (inclusive) and 2 occurs at index 9.
```

### Uncompressing

```typescript
import { uncrunch } from 'listcrunch';

uncrunch('50:0-1,3-4;3:2,5;60:6;70:7-8');
// => [ '50', '50', '3', '50', '50', '3', '60', '70', '70' ]
```

> Note: the returned data is always an array of strings, even if the original
array contained other item types

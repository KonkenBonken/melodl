import React from 'react';
import { distance } from 'fastest-levenshtein';

import raw from './dataset';

export default function Datalist({ input }: { input: string }) {
  return <datalist id="songs">
    {!input || raw
      .sort((a, b) => distance(input, a[0].substring(0, input.length)) - distance(input, b[0].substring(0, input.length)))
      .slice(0, 4)
      .map(([name]) => (
        <option value={name} key={name} />
      ))}
  </datalist>;
}

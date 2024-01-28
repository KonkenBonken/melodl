import React from 'react';
import { distance } from 'fastest-levenshtein';

import Song from './';

export default function Datalist({ input }: { input: string }) {
  return <datalist id="songs">
    {!input || Song.songs
      .sort((a, b) => distance(input, a.name.substring(0, input.length)) - distance(input, b.name.substring(0, input.length)))
      .slice(0, 4)
      .map(({ name }) => (
        <option value={name} key={name} />
      ))}
  </datalist>;
}

import React from 'react';

import raw from './dataset';

export default function Datalist() {
  return <datalist id="songs">
    {raw.map(([name]) => (
      <option value={name} key={name} />
    ))}
  </datalist>;
}

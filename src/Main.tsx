import React, { useMemo } from 'react';

import scss from './styles/_main.module.scss';

import data from './data';

const { floor, random } = Math;

export default function Main() {
  const Goal = useMemo(() => data[floor(random() * data.length)], []);
  console.log(Goal);

  return (<main>
    <h1 className={scss.header}>
      Melodl 2023
    </h1>
    <div className={scss.shares}>
      <Goal.Shares />
    </div>
  </main>);
}

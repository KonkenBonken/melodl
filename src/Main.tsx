import React, { useMemo } from 'react';

import scss from './styles/_main.module.scss';

import data from './data';

const { floor, random } = Math;

export default function Main() {
  const Goal = useMemo(() => data[floor(random() * data.length)], []);
  console.log(Goal);

  return (
    <h1 className={scss.header}>
      Hello World
    </h1>
  );
}

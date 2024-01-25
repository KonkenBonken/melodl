import React from 'react';

import scss from './styles/_main.module.scss';

import data from './data';

export default function Main() {
  console.log(data);

  return (
    <h1 className={scss.header}>
      Hello World
    </h1>
  );
}

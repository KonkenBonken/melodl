import React, { useMemo } from 'react';
import useArrayState from 'use-array-state'

import scss from './styles/_main.module.scss';

import data, { type Song } from './data';

const { floor, random } = Math;

export default function Main() {
  const Goal = useMemo(() => data[floor(random() * data.length)], []);
  const [guesses, guessActions] = useArrayState<Song>();

  return (<main>
    <h1 className={scss.header}>
      Melodl 2023
    </h1>
    <div className={scss.goal}>
      <Goal.Shares />
    </div>
    <div className={scss.guesses}>
      {guesses.map(guess => guess.Shares())}
      <input onKeyDown={(e) => {
        if (e.key === 'Enter') {
          const guess = e.currentTarget.value,
            song = data.find(song => song.name.toLowerCase() === guess.toLowerCase());
          if (song && !guesses.includes(song))
            guessActions.push(song);
        }
      }} />
    </div>
  </main>);
}

import React, { useMemo } from 'react';
import useArrayState from 'use-array-state';

import scss from './styles/_main.module.scss';

import songs, { type Song } from './data';

const { floor, random } = Math;

export default function Main() {
  const Goal = useMemo(() => songs[floor(random() * songs.length)], []);
  const [guesses, guessActions] = useArrayState<Song>();

  return (<main>
    <h1 className={scss.header}>
      Melodl 2023
    </h1>
    <div className={scss.goal}>
      <Goal.Shares />
    </div>
    <div className={scss.guesses}>
      {guesses.map(Guess => (
        <div key={Guess.name}>
          <h3>{Guess.name} <i>{Guess.totalPoints} points</i></h3>
          <Guess.Shares />
        </div>
      ))}
      <input onKeyDown={(e) => {
        if (e.key === 'Enter') {
          const guess = e.currentTarget.value,
            song = songs.find(song => song.name.toLowerCase() === guess.toLowerCase());
          if (song && !guesses.includes(song))
            guessActions.push(song);
        }
      }} />
    </div>
  </main>);
}

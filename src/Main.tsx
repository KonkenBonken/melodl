import React, { useMemo, useState } from 'react';
import useArrayState from 'use-array-state';

import scss from './styles/_main.module.scss';

import Song from './data';

const { floor, random } = Math;
const maxGuesses = 6;

export default function Main() {
  const Goal = useMemo(() => Song.songs[floor(random() * Song.songs.length)], []);
  const [guesses, guessActions] = useArrayState<Song>();
  const [input, setInput] = useState('');

  return (<main>
    <Song.Datalist input={input} />
    <h1 className={scss.header}>
      Melodl 2023
    </h1>
    <div className={scss.goal}>
      <Goal.Shares />
    </div>
    <div className={scss.guesses}>
      {guesses.map(Guess => <Guess.Guess key={Guess.name} />)}
      {Array.from({ length: maxGuesses - guesses.length }, (_, i) => <div key={i} />).reverse()}
      <input
        placeholder="Guess any 2023 Melodifestivalen song"
        list="songs"
        value={input}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            const guess = e.currentTarget.value,
              song = Song.songs.find(song => song.name.toLowerCase() === guess.toLowerCase());
            if (song && !guesses.includes(song)) {
              guessActions.push(song);
              setInput('');
            }
          }
        }}
        onChange={e => {
          setInput(e.currentTarget.value);
        }}
      />
    </div>
  </main>);
}

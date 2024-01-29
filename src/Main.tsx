import React, { useMemo, useState } from 'react';
import useArrayState from 'use-array-state';

import scss from './styles/_main.module.scss';

import Song from './data';
import Endscreen from './endscreen';

const { floor, random } = Math;
const maxGuesses = 6;

export default function Main() {
  const Goal = useMemo(() => Song.songs[floor(random() * Song.songs.length)], []);
  const [guesses, guessActions] = useArrayState<Song>();
  const [input, setInput] = useState('');

  const win = guesses.at(-1) === Goal,
    lost = !win && guesses.length === maxGuesses,
    ended = win || lost;

  return (<main>
    <Song.Datalist input={input} />
    <h1 className={scss.header}>
      Melodl
    </h1>
    <div className={scss.goal}>
      <Goal.Shares />
    </div>
    <div className={scss.guesses}>
      {guesses.map(Guess => <Guess.Guess key={Guess.name} />)}
      {Array.from({ length: maxGuesses - guesses.length }, (_, i) => <div key={i} />).reverse()}
      <input
        placeholder="Guess any 2019-2023 Melodifestivalen song"
        list="songs" autoFocus
        value={input} disabled={ended}
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
          if (!ended)
            setInput(e.currentTarget.value);
        }}
      />
    </div>
    {ended && <Endscreen win={win} guesses={guesses} Goal={Goal} maxGuesses={maxGuesses} />}
  </main>);
}

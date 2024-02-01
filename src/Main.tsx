import { useMemo, useState } from 'react';
import hasch from 'hasch';

import scss from './styles/_main.module.scss';

import useDailySongStorage from './utils/useDailyStorage';
import Song from './data';
import Endscreen from './endscreen';
import Infoscreen from './infoscreen';

export default function Main() {
  const day = Math.floor(Date.now() / 864e5),
    Goal = useMemo(() => hasch(day, { choose: Song.songs }), [day]);

  const [guesses, setGuesses] = useDailySongStorage('guesses', []);
  const [input, setInput] = useState('');

  const win = guesses.at(-1) === Goal,
    lost = !win && guesses.length === 6,
    ended = win || lost;

  return (<main>
    <Song.Datalist input={input} />
    <h1 className={scss.header}>
      Melodl
    </h1>
    <Infoscreen />
    <div className={scss.goal}>
      <Goal.Shares />
    </div>
    <div className={scss.guesses}>
      {guesses.map(Guess => <Guess.Guess goal={Goal} key={Guess.name} />)}
      {Array.from({ length: 6 - guesses.length }, (_, i) => <div key={i} />).reverse()}
      <input
        placeholder="Guess any 2019-2023 Melodifestivalen song"
        list="songs" autoFocus
        value={input} disabled={ended}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            const guess = e.currentTarget.value,
              song = Song.songs.find(song => song.name.toLowerCase() === guess.toLowerCase());
            if (song && !guesses.includes(song)) {
              setGuesses([...guesses, song]);
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
    {ended && <Endscreen win={win} guesses={guesses} Goal={Goal} />}
  </main>);
}

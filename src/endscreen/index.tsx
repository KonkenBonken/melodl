import React from 'react';
import Countdown from 'react-countdown';

import scss from '../styles/_endscreen.module.scss';

import type Song from '../data';

export default function Endscreen({ win, guesses, Goal }: { win: boolean, guesses: Song[], Goal: Song }) {
  const next = new Date();
  next.setHours(24, 0, 0, 0);

  return <dialog
    className={scss.endscreen}
    ref={el => el?.showModal()}
    onKeyDownCapture={e => {
      if (e.key === 'Escape')
        e.preventDefault();
    }}
  >{win ? <>
    <h2>Congratulations!</h2>
    <h3>Guess the next song in <Countdown date={next} daysInHours /></h3>
    {guesses.map(Guess => <Guess.Guess goal={Goal} key={Guess.name} />)}
    {Array.from({ length: 6 - guesses.length }, (_, i) => <div key={i} />).reverse()}
  </> : <>
    <h2>Better luck next time!</h2>
    <h3>The answer was:</h3>
    <Goal.Guess goal={Goal} />
    <h3>Guess the next song in <Countdown date={next} daysInHours /></h3>
    {guesses.map(Guess => <Guess.Guess goal={Goal} key={Guess.name} />)}
  </>}
  </dialog>;
}

import { useState } from 'react';

import Heart from './heart';
import scss from '../styles/_infoscreen.module.scss';

export default function Infoscreen({ maxGuesses }: { maxGuesses: number }) {
  const [showInfo, setShowInfo] = useState(true);

  if (!showInfo)
    return null;

  return <dialog
    className={scss.infoscreen}
    ref={el => el?.showModal()}
    onClose={() => setShowInfo(false)}
  >
    <h2>Welcome to Melodl!</h2>
    <h3>How to Play:</h3>

    <h4>Today's song is shown as a diagram representing the votes from each age group:</h4>
    <div className={scss.groups} >
      {Array.from({ length: 8 }, Age)}
    </div>

    <ul>
      <li>Guess the song in {maxGuesses} guesses</li>
      <li>Each guess must be a Melodifestivalen song that competed 2019 - 2023</li>
      <li>After guessing you'll get to see
        <ul>
          <li>how the age groups voted on your guessed song</li>
          <li>if you've guessed a song from the correct year, showing in green.
            If your guess is 1 year away, you'll get a yellow color instead</li>
        </ul>
      </li>
    </ul>
    <ul>
      <li>All voting data refers to the heat the song got voted out in, or the grand final</li>
      <li>Due to technical difficulties during Heat 1 2022,
        the songs <i>Bananas</i>, <i>Let There Be Angels</i>, and <i>Moving Like That </i>
        are not included in Melodl</li>
    </ul>
  </dialog>;
}

const ageGroups = [
  ['76C043', '3-9 år'],
  ['55C09A', '10-15 år'],
  ['0DA8E1', '16-29 år'],
  ['804E9F', '30-44 år'],
  ['DA4597', '45-59 år'],
  ['EE3E23', '60-74 år'],
  ['F6921E', '75+ år'],
  ['000000', 'Telefon'],
] satisfies [string, string][];

function Age(_: unknown, i: number) {
  const [color, group] = ageGroups[i];
  return <div className={scss.group} key={i} >
    <Heart color={color} />
    <h4>{group}</h4>
  </div>;
}

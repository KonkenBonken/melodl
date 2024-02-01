import { useState } from 'react';

import Heart from './heart';
import scss from '../styles/_infoscreen.module.scss';

export default function Infoscreen() {
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

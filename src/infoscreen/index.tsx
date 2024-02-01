import { useState } from 'react';

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
  </dialog>;
}

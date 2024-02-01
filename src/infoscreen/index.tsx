import scss from '../styles/_infoscreen.module.scss';

export default function Infoscreen({ onClose }: { onClose(): void }) {
  return <dialog
    className={scss.infoscreen}
    ref={el => el?.showModal()}
    onClose={onClose}
  >
    <h2>Welcome to Melodl!</h2>
    <h3>How to Play:</h3>
  </dialog>;

}
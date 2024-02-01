import scss from '../styles/_infoscreen.module.scss';

export default function HelpButton({ setShow }: { setShow(v: boolean): void }) {
  return <button className={scss.help} onClick={() => setShow(true)}>?</button>;
}

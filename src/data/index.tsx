import raw from './dataset';
import Datalist from './Datalist';

import scss from '../styles/_song.module.scss';

const { abs } = Math;
type rawType = typeof raw;

export default class Song {
  static get rawSongs() {
    return Object.entries(raw).flatMap(([year, rawSongs]) => rawSongs.map(song => [+year, song] as const));
  }

  static get maxPoints() {
    return Math.max(...Song.songs.map(song => song.totalPoints));
  }

  static songs = Song.rawSongs.map(([year, song]) => new Song(year, song));
  static Datalist = Datalist;

  readonly name: string;
  readonly totalVotes: number;
  readonly groups: number[];

  constructor(readonly year: number, [name, totalVotes, ...groups]: rawType[keyof rawType][number]) {
    this.name = name;
    this.totalVotes = totalVotes;
    this.groups = groups;
  }

  get totalPoints() {
    return this.groups.reduce((a, b) => a + b);
  }

  get shares() {
    return this.groups.map(points => points / (12 * 8));
  }

  get Shares() {
    return (() => <div
      className={scss.shares}
      data-points={this.totalPoints}
    >
      {this.shares.map((share, i) => (<div key={i}
        style={{
          width: (share * 100).toFixed(3) + '%'
        }}
      />))}
    </div>).bind(this);
  }

  get Guess() {
    return (({ goal }: { goal: Song }) => <div>
      <h3>{this.name} <i>{this.totalPoints} points</i></h3>
      <section className={scss.hints}>
        {this.YearHint(goal)}
      </section>
      {this.Shares()}
    </div>).bind(this);
  }

  get YearHint() {
    return ((goal: Song) => {
      const diff = abs(goal.year - this.year);
      let className = scss.gray;

      if (diff === 0)
        className = scss.green;
      else if (diff === 1)
        className = scss.yellow;

      return <div className={className}>{this.year}</div>;
    }).bind(this);
  }
}

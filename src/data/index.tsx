import raw from './dataset';
import Datalist from './Datalist';

import scss from '../styles/_song.module.scss';

const { abs } = Math;
type rawType = typeof raw;

export default class Song {
  static get rawSongs() {
    return Object.entries(raw)
      .flatMap(([year, rawSongs]) => rawSongs
        .map((songs, i) => songs.map(song => [i, song] as const))
        .flat().map(([lost, song]) => [+year, lost, song] as const)
      );
  }

  static get maxPoints() {
    return Math.max(...Song.songs.map(song => song.totalPoints));
  }

  static songs = Song.rawSongs.map(([year, lost, song]) => new Song(year, lost, song));
  static Datalist = Datalist;

  readonly name: string;
  readonly totalVotes: number;
  readonly groups: number[];

  constructor(
    readonly year: number, readonly loseEpisode: number,
    [name, totalVotes, ...groups]: rawType[keyof rawType][number][number]
  ) {
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
        {this.LostHint(goal)}
      </section>
      {this.Shares()}
    </div>).bind(this);
  }

  get YearHint() {
    return ((goal: Song) => {
      switch (abs(goal.year - this.year)) {
        case 0: return <div className={scss.green}>{this.year}</div>;
        case 1: return <div className={scss.yellow}>{this.year}</div>;
        default: return <div className={scss.gray}>{this.year}</div>;
      }
    }).bind(this);
  }

  get LostHint() {
    return ((goal: Song) => {
      if (goal.loseEpisode === this.loseEpisode)
        return <div className={scss.green}>{this.loseEpisode}</div>;
      else
        return <div className={scss.gray}>{this.loseEpisode}</div>;
    }).bind(this);
  }
}
console.log(Song.songs)
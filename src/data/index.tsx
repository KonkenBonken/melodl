import raw from './dataset';
import Datalist from './Datalist';

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
    return (() => <div data-points={this.totalPoints}>
      {this.shares.map((share, i) => (<div key={i}
        style={{
          width: (share * 100).toFixed(3) + '%'
        }}
      />))}
    </div>).bind(this);
  }
}

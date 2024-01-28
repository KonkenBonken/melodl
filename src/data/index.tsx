import raw from './dataset';
import Datalist from './Datalist';

export class Song {
  static get maxPoints() {
    return Math.max(...songs.map(song => song.totalPoints));
  }

  static Datalist = Datalist;

  readonly name: string;
  readonly totalVotes: number;
  readonly groups: number[];

  constructor([name, totalVotes, ...groups]: (typeof raw)[number]) {
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

const songs = raw.map(song => new Song(song));
export default songs;

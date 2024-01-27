import raw from './dataset';

export class Song {
  static get maxPoints() {
    return Math.max(...songs.map(song => song.totalPoints));
  }

  readonly groups: number[];

  constructor(
    readonly name: string,
    readonly totalVotes: number,
    ...groups: number[]
  ) {
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

const songs = raw.map(song => new Song(...song));
export default songs;

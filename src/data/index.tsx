import scss from '../styles/_main.module.scss';

const raw = [
  ['Where You Are (Sávežan)', 2017718, 6, 5, 5, 7, 7, 10, 10, 8],
  ['Rhythm of My Show', 1241991, 3, 1, 1, 0, 0, 0, 0, 0],
  ['One Day', 1194378, 0, 0, 0, 1, 3, 6, 4, 2],
  ['Air', 2565958, 10, 10, 10, 8, 8, 7, 7, 7],
  ['On My Way', 1837663, 5, 7, 6, 3, 1, 0, 2, 1],
  ['Never Give Up', 1786719, 4, 6, 2, 2, 4, 5, 8, 6],
  ['Six Feet Under', 2431405, 8, 4, 8, 10, 10, 8, 1, 10],
  ['Where Did You Go', 1841580, 7, 8, 3, 4, 5, 3, 6, 3],
  ['Släpp alla sorger', 1854602, 2, 2, 7, 5, 6, 4, 5, 5],
  ['Tattoo', 3783148, 1, 12, 12, 12, 12, 12, 12, 12],
  ['Mer av dig', 1915643, 12, 3, 4, 6, 2, 2, 3, 4],
  ['Royals', 1060383, 0, 0, 0, 0, 0, 1, 0, 0],
] as [string, number, ...number[]][];

class Song {
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
    return this.groups.map(points => points / this.totalPoints);
  }

  get Shares() {
    return (() => <div>
      {this.shares.map((share, i) => (<div key={i}
        style={{
          width: (share * 100).toFixed(3) + '%'
        }}
      />))}
    </div>).bind(this);
  }
}

export default raw.map(song => new Song(...song));

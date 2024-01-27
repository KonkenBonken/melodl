const raw = [
  ['Inga sorger', 754498 + 363254, 1, 1, 1, 5, 8, 8, 5, 3],
  ['Haunted', 884660 + 460003, 5, 8, 10, 3, 3, 1, 1, 1],
  ['Länge leve livet', 788433 + 430366, 3, 5, 5, 1, 1, 3, 8, 5],

  ['All My Life(Where Have You Been)', 1057852 + 520646, 8, 8, 8, 5, 5, 5, 5, 3],
  ['Comfortable', 608948 + 218298, 3, 3, 1, 1, 1, 1, 1, 1],
  ['Grytan', 585684 + 277599, 1, 1, 3, 3, 3, 3, 3, 5],

  ['Så kommer känslorna tillbaka', 647419 + 290521, 1, 1, 3, 1, 3, 5, 5, 10],
  ['Sober', 750918 + 391744, 10, 8, 1, 5, 1, 3, 1, 1],
  ['Låt hela stan se på', 792432 + 450391, 3, 5, 8, 3, 5, 1, 3, 8],

  ['Edelweiss', 744902 + 328700, 5, 1, 1, 3, 3, 3, 8, 3],
  ['Mera mera mera', 760793 + 382224, 8, 10, 3, 1, 1, 1, 1, 1],
  ['Gorgeous', 861688 + 483061, 3, 5, 8, 8, 8, 8, 5, 10],

  ['Diamonds', 784142 + 441472, 6, 7, 2, 2, 2, 4, 4, 1],
  ['Now I Know', 842495 + 550613, 4, 2, 6, 7, 8, 10, 8, 10],
  ['Raggen går', 668125 + 415799, 7, 1, 1, 4, 1, 1, 1, 2],
  ['For the Show', 683230 + 423494, 1, 4, 4, 1, 4, 2, 2, 4],

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
    return this.groups.map(points => points / Song.maxPoints);
  }

  get Shares() {
    return (() => <div>
      {this.shares.map((share, i) => share > 0 && (<div key={i}
        style={{
          width: (share * 100).toFixed(3) + '%'
        }}
      />))}
    </div>).bind(this);
  }
}

const songs = raw.map(song => new Song(...song));
export default songs;

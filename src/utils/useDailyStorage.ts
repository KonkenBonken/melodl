import useLocalStorage from 'use-local-storage';
import hasch from 'hasch';

import Song from '../data';


const useDailySongStorage: typeof useLocalStorage<Song[]> = (key, value) => {
  const day = Math.floor(Date.now() / 864e5),
    hash = hasch(day + key, { base: 36 });

  return useLocalStorage(hash, value,
    {
      serializer(arr) {
        return JSON.stringify(arr?.map(song => 'song:' + song.name));
      },
      parser(str) {
        const arr = JSON.parse(str) as string[];

        return arr.map(name =>
          Song.songs.find(song => song.name === name.substring(5))
        ).filter(Boolean) as Song[];
      }
    });
};

export default useDailySongStorage;

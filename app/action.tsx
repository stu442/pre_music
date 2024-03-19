'use server'

import { getPlaiceholder } from "plaiceholder";

export async function imgTobase64(src:string) {
    try {
      const buffer = await fetch(src).then(async (res) =>
        Buffer.from(await res.arrayBuffer())
      );
      const { base64 } = await getPlaiceholder(buffer);
      return base64
    } catch (err) {
      throw new Error("이미지를 불러오는 중 에러가 발생했습니다.")
    }
  }

export async function imgTobase64s(musicList : SpotifyTrack[]) {
  try {
    const imgUrls = musicList.map(music => music.album.images[0].url);
    const promises = imgUrls.map(imgUrl => imgTobase64(imgUrl));
    const base64s = await Promise.all(promises);
    return base64s;
  } catch (err) {
    throw new Error("이미지를 불러오는 중 에러가 발생했습니다.")
  }
}
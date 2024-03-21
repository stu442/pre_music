'use server'

import { errorToast } from "@/components/ui/use-toast";
import { getPlaiceholder } from "plaiceholder";

export async function imgTobase64s(musicList : SpotifyTrack[]) {
  try {
    if (!Array.isArray(musicList)) {
      throw new Error("유효하지 않은 musicList입니다.");
    }

    const base64s = await Promise.all(
      musicList.map(async (music) => {
        const src = music.album.images[0].url;
        const response = await fetch(src);
        const buffer = Buffer.from(await response.arrayBuffer());
        const { base64 } = await getPlaiceholder(buffer);
        return base64;
      })
    );
    return base64s;
  } catch (err) {
    throw errorToast(err);
  }
}

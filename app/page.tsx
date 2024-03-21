'use client'

import HomeMuisicList from "@/components/HomeMusicList";
import Spinner from "@/components/Spinner";
import { useFetchTrackData } from "@/hooks/useFetchTrackData";


export default function Home() {
  const { track: adminMusic } = useFetchTrackData("ADMIN");
  const { track: mostLikedMusic } = useFetchTrackData("MOSTLIKED");
  const { track: recentMusic } = useFetchTrackData("RECENT");

  return (
    <>
      {!adminMusic?.length && !mostLikedMusic?.length && !recentMusic?.length && (
        <Spinner />
      )}
      {<HomeMuisicList title="주인장 추천 음악" contents_id={adminMusic} />}
      {<HomeMuisicList title="회원님들의 픽" contents_id={mostLikedMusic} />}
      {<HomeMuisicList title="최근 좋아요 받은 음악" contents_id={recentMusic} />}
    </>
  )
}
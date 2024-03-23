'use client'

import HomeMuisicList from "@/components/HomeMusicList";
import Spinner from "@/components/Spinner";
import { useFetchContentsId } from "@/hooks/useFetchContentsId";


export default function Home() {
  const { contentsId: adminMusic } = useFetchContentsId("ADMIN");
  const { contentsId: mostLikedMusic } = useFetchContentsId("MOSTLIKED");
  const { contentsId: recentMusic } = useFetchContentsId("RECENT");

  return (
    <>
      {!adminMusic?.length && !mostLikedMusic?.length && !recentMusic?.length && (
        <Spinner />
      )}
      {<HomeMuisicList title="주인장 추천 음악" contentsId={adminMusic} />}
      {<HomeMuisicList title="회원님들의 픽" contentsId={mostLikedMusic} />}
      {<HomeMuisicList title="최근 좋아요 받은 음악" contentsId={recentMusic} />}
    </>
  )
}
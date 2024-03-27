'use client'

import HomeMuisicList from "@/components/HomeMusicList";
import { useFetchContentsId } from "@/hooks/useFetchContentsId";
import Spinner from "@/components/Spinner";

export default function Home() {
  const { contentsId: adminMusic } = useFetchContentsId("ADMIN");
  const { contentsId: mostLikedMusic } = useFetchContentsId("MOSTLIKED");
  const { contentsId: recentMusic } = useFetchContentsId("RECENT");

  return (
    <>
    {/* TODO : Loading 제대로 다시 구현해보기 */}
    {/* HomeMusicList에서 로딩 중에도 로딩이 나오도록... */}
    {/* 아니면 스켈레톤 UI를 추가하는 방식으로 가도 너무 좋을 것 같다. */}
    {/* Loading State를 추가하고, */}
      {!(adminMusic?.length || mostLikedMusic?.length || recentMusic?.length) && <Spinner />}
        <HomeMuisicList title="주인장 추천 음악" contentsId={adminMusic} />
        <HomeMuisicList title="회원님들의 픽" contentsId={mostLikedMusic} />
        <HomeMuisicList title="최근 좋아요 받은 음악" contentsId={recentMusic} />
    </>
  )
}
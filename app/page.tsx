'use client'

import HomeMuisicList from "@/components/HomeMusicList";
import { supabase } from "@/lib/utils";
import { useEffect, useState } from "react";

interface ContentsItem {
  contents_id: string
}

export default function Home() {

  const [mostLikedMusic, setMostLikedMusic] = useState<ContentsItem[] | null>([])
  const [recentMusic, setRecentMusic] = useState<ContentsItem[] | null>([])

  useEffect(() => {
    (async () => {
      await fetchMostLikedMusic()
      await fetchRecentMusic()
    })()
  }, [])

  async function fetchMostLikedMusic() {
    let { data , error } = await supabase
    .from('LIKES')
    .select('contents_id')
    .order('liked_at', { ascending: false })
    .limit(10)
    setMostLikedMusic(data);
  }

  async function fetchRecentMusic() {
    const { data, error } = await supabase
    .from('LIKES')
    .select('contents_id')
    .order('liked_at', { ascending: false })
    .limit(10)
    setRecentMusic(data)
  }

  return (
    <>
      <HomeMuisicList title="주인장 추천 음악" contents_id={mostLikedMusic} />
      {/* 위에 ADMIN 계정으로 테이블 하나 만들어서 하기!! */}
      <HomeMuisicList title="회원님들의 픽" contents_id={mostLikedMusic} />
      <HomeMuisicList title="최근 좋아요 받은 음악" contents_id={recentMusic} />
    </>
  )
}
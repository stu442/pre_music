'use client'

import { AccessTokenProps, getAccessToken } from "@/api/getAceessToken";
import HomeMuisicList from "@/components/HomeMusicList";
import { supabase } from "@/lib/utils";
import { useEffect, useState } from "react";

interface ContentsItem {
  contents_id: string
}

export default function Home() {

  const [mostLikedMusic, setMostLikedMusic] = useState<ContentsItem[] | null>([])
  const [recentMusic, setRecentMusic] = useState<ContentsItem[] | null>([])
  const [adminMusic, setAdminMusic] = useState<ContentsItem[] | null>([])

  useEffect(() => {
    (async () => {
      await initAccessToken()
      await fetchMostLikedMusic()
      await fetchRecentMusic()
      await fetchAdminMusic()
    })()
  }, [])

  async function initAccessToken() {
    let accessToken: AccessTokenProps | null = JSON.parse(localStorage.getItem('spotifyAccessToken') || 'null');
    if(accessToken === null) {
      accessToken = await getAccessToken();
      localStorage.setItem('spotifyAccessToken', JSON.stringify(accessToken));
    }
  }

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

  async function fetchAdminMusic() {
    const { data, error } = await supabase
    .from('ADMIN_LIKES')
    .select('contents_id')
    .order('liked_at', { ascending: false })
    .limit(10)
    setAdminMusic(data)
  }

  return (
    <>
      <HomeMuisicList title="주인장 추천 음악" contents_id={adminMusic} />
      <HomeMuisicList title="회원님들의 픽" contents_id={mostLikedMusic} />
      <HomeMuisicList title="최근 좋아요 받은 음악" contents_id={recentMusic} />
    </>
  )
}
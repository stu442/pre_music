'use client'

import { AccessTokenProps, getAccessToken } from "@/api/getAceessToken";
import HomeMuisicList from "@/components/HomeMusicList";
import Spinner from "@/components/Spinner";
import { supabase } from "@/lib/utils";
import { useEffect, useState } from "react";

interface ContentsItem {
  contents_id: string
}

export default function Home() {

  const [mostLikedMusic, setMostLikedMusic] = useState<string[] | null>([])
  const [recentMusic, setRecentMusic] = useState<string[] | null>([])
  const [adminMusic, setAdminMusic] = useState<string[] | null>([])

  const FETCHNUM = 10

  useEffect(() => {

    // TODO : COUNT 함수 잘 쓰기 
    // https://supabase.com/docs/reference/javascript/insert?example=querying-with-count-option

    async function fetchMostLikedMusic() {
      let { data , error } = await supabase
      .from('LIKES')
      .select('contents_id')
      .order('liked_at', { ascending: false })
      .limit(FETCHNUM)
      setMostLikedMusic(extractedIds(data));
    }

    async function fetchRecentMusic() {
      const { data, error } = await supabase
      .from('LIKES')
      .select('contents_id')
      .order('liked_at', { ascending: false })
      .limit(FETCHNUM)
      setRecentMusic(extractedIds(data))
    }
  
    async function fetchAdminMusic() {
      const { data, error } = await supabase
      .from('ADMIN_LIKES')
      .select('contents_id')
      .order('liked_at', { ascending: false })
      .limit(FETCHNUM)
      setAdminMusic(extractedIds(data))
    }
    
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

  function extractedIds(data : ContentsItem[] | null) {
    // TODO : 이것도 괜찮을까??
    const extractedData = data!.map(item => item.contents_id);
    return extractedData
  }


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
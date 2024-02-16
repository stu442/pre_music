'use client'

import { AccessTokenProps, getAccessToken } from "@/api/getAceessToken";
import HomeMuisicList from "@/components/HomeMusicList";
import Spinner from "@/components/Spinner";
import { supabase } from "@/lib/utils";
import { useEffect, useState } from "react";

interface ContentsItem {
  contents_id: string
}

interface GroupedContents {
  [key: string]: number
}

export default function Home() {

  const [mostLikedMusic, setMostLikedMusic] = useState<string[] | null>([])
  const [recentMusic, setRecentMusic] = useState<string[] | null>([])
  const [adminMusic, setAdminMusic] = useState<string[] | null>([])

  const FETCHNUM = 10

  useEffect(() => {

    function sortLikedMusic(data : ContentsItem[] | null) {
      if(data === null) {
        setMostLikedMusic(data)
      } else {
      const groupedContents:GroupedContents = {};
        data.forEach((item) => {
          if (!groupedContents[item.contents_id]) {
            groupedContents[item.contents_id] = 0;
          }
          groupedContents[item.contents_id]++;
        });
        const sortedContents = (Object.entries(groupedContents))
        .sort((a, b) => b[1] - a[1])
        .slice(0, FETCHNUM)
        .map(([contentsId]) => contentsId);
        setMostLikedMusic(sortedContents);
      }
    }

    // TODO : fetch 3종 세트 정리하기
    // TODO : fetch 3종 세트 NULL 체크하고, 오류 내보내기

    async function fetchSortedMostLikedMusic() {
      let { data , error } = await supabase
      .from('LIKES')
      .select('contents_id')
      .order('liked_at', { ascending: false })
      .limit(FETCHNUM)
      sortLikedMusic(data)
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
      await fetchSortedMostLikedMusic()
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
    // TODO : 이거 생각해보기
    // Fetch 단에서 NULL 체크 할 예정 (매개변수에 null 이 있을 필요가 없음)
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
'use client'

import { AccessTokenProps, getAccessToken } from "@/api/getAceessToken";
import HomeMuisicList from "@/components/HomeMusicList";
import Spinner from "@/components/Spinner";
import { errorToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/utils";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

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
        setMostLikedMusic(null)
        return
      } 
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
    async function fetchMusicFromTable(tableName: string, setMusicCallback: Dispatch<SetStateAction<string[] | null>>) {
      try {
        const { data, error } = await supabase
          .from(tableName)
          .select('contents_id')
          .order('liked_at', { ascending: false })
          .limit(FETCHNUM);
        if (error) {
          throw new Error('음악을 불러오는데 실패했습니다.');
        }
        setMusicCallback(extractedIds(data));
      } catch (error) {
        errorToast(error);
      }
    }
    async function fetchSortedMostLikedMusic() {
      try {
        const { data, error } = await supabase
          .from('LIKES')
          .select('contents_id')
          .order('liked_at', { ascending: false })
          .limit(FETCHNUM);
    
        if (error) {
          throw new Error('음악을 불러오는데 실패했습니다.');
        }
        sortLikedMusic(data);
      } catch (error) {
        errorToast(error);
      }
    }
    
    async function fetchRecentMusic() {
      await fetchMusicFromTable('LIKES', setRecentMusic);
    }
    
    async function fetchAdminMusic() {
      await fetchMusicFromTable('ADMIN_LIKES', setAdminMusic);
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
    if(data === null) {
      return null
    }
    const extractedData = data.map(item => item.contents_id);
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
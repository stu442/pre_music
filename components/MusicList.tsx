'use client'

import { fetchSearchData } from '@/api/fetchSearchData';
import { useEffect } from 'react'
import MusicCardOnClient from './MusicCardOnClient';
import IntersectionObserverComponent from './IntersectionObserverComponents';
import { atom, useRecoilState } from 'recoil';
import Spinner from './Spinner';

interface MusicListProps {
    keyword: string
}

export const musicListState = atom({
    key: "musicListState",
    default: []
})

export const nextLinkState = atom({
    key: "nextLinkState",
    default: null
})

export const loadingState = atom({
    key: "loadingState",
    default: true
})

export default function MusicList({keyword} : MusicListProps) {
    const [musicList, setMusicList] = useRecoilState(musicListState);
    const [nextLink, setNextLink] = useRecoilState(nextLinkState);
    const [isLoading, setIsLoading] = useRecoilState(loadingState);
    
    useEffect(() => {
        (async () => {
            const { tracks } = await fetchSearchData(keyword, 'track');
            setMusicList(tracks.items);
            setNextLink(tracks.next);
            setIsLoading(false);
        })();
    }, [keyword, setMusicList, setNextLink, setIsLoading])

    return (
        <>
            {isLoading && <Spinner />}
            {!isLoading && musicList.length === 0 && "검색결과가 없습니다."}
            {musicList.length > 0 && (
            <>
                {musicList.map((item: SpotifyTrack, id: number) => (
                <MusicCardOnClient
                    key={`music_card_${id}`}
                    title={item.name}
                    artist={item.album.artists[0].name}
                    imgUrl={item.album.images[0].url}
                    musicUrl={item.preview_url}
                    id={item.id}
                />
                ))}
                <IntersectionObserverComponent />
            </>
            )}
        </>
    )
}
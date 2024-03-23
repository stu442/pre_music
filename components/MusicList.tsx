'use client'

import { fetchSearchData } from '@/api/fetchSearchData';
import { useEffect } from 'react'
import MusicCardOnClient from './MusicCardOnClient';
import IntersectionObserverComponent from './IntersectionObserverComponents';
import { useRecoilState } from 'recoil';
import Spinner from './Spinner';
import { imgTobase64s } from '@/app/action';
import { base64State, loadingState, musicListState, nextLinkState } from '@/atom/musicListAtom';

interface MusicListProps {
    keyword: string
}

export default function MusicList({keyword} : MusicListProps) {
    const [musicList, setMusicList] = useRecoilState<SpotifyTrack[]>(musicListState);
    const [nextLink, setNextLink] = useRecoilState<string | null>(nextLinkState);
    const [isLoading, setIsLoading] = useRecoilState<boolean>(loadingState);
    const [base64, setBase64] = useRecoilState<(string | undefined)[]>(base64State);
    
    useEffect(() => {
        (async () => {
            const { tracks } = await fetchSearchData(keyword, 'track');
            setMusicList(tracks.items);
            setNextLink(tracks.next);
            setIsLoading(false);
            const base64s = await imgTobase64s(tracks.items);
            setBase64(base64s)
        })();
    }, [keyword, setMusicList, setNextLink, setIsLoading, setBase64])

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
                    base64={base64[id]}
                    id={item.id}
                />
                ))}
                <IntersectionObserverComponent />
            </>
            )}
        </>
    )
}
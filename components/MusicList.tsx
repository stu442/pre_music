'use client'

import MusicCardOnClient from './MusicCardOnClient';
import IntersectionObserverComponent from './IntersectionObserverComponents';
import Spinner from './Spinner';
import { useFetchMusicList } from '@/hooks/useFetchMusicList';

interface MusicListProps {
    keyword: string
}

export default function MusicList({keyword} : MusicListProps) {
    const { musicList, isLoading, base64 } = useFetchMusicList(keyword)

    return (
        <>
            {isLoading && <Spinner />}
            {!isLoading && musicList.length === 0 && "검색결과가 없습니다."}
            {musicList.length > 0 && (
            <>
                {musicList.map((item: SpotifyTrack, id: number) => (
                <MusicCardOnClient
                    key={`music_card_${item.id}`}
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
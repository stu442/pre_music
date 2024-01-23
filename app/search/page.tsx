import { fetchSearchData } from "@/api/fetchSearchData"
import MusicCard from "@/components/MusicCard"
import Spinner from "@/components/Spinner";
import { Suspense } from "react";

export default async function Page({searchParams} : {searchParams : {keyword:string}}) {
    const searchData = await fetchSearchData(searchParams.keyword, 'track');

    return (
        <>
        <h2 className="text-lg mt-8">&apos;{searchParams.keyword}&apos;에 관한 음악</h2>
        <Suspense fallback={<Spinner />}>
            <main className="grid grid-cols-4 gap-3 mt-4">
                {searchData.tracks?.items.length === 0 ? "검색결과가 없습니다." : null}
                {searchData.tracks?.items.map((item:SpotifyTrack, id:number) => (
                    <MusicCard 
                    key={`music_card_${id}`} 
                    title={item.name} 
                    artist={item.album.artists[0].name} 
                    imgUrl={item.album.images[0].url} 
                    musicUrl={item.preview_url}
                    />
                    ))}
            </main>
        </Suspense>
        </>
    )
}
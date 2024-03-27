import { fetchSearchData } from "@/api/fetchSearchData";
import { imgTobase64s } from "@/app/action";
import { base64State, loadingState, musicListState, nextLinkState } from "@/atom/musicListAtom";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export function useFetchMusicList(keyword : string) {
    const [musicList, setMusicList] = useRecoilState<SpotifyTrack[]>(musicListState);
    const [nextLink, setNextLink] = useRecoilState<string | null>(nextLinkState);
    const [isLoading, setIsLoading] = useRecoilState<boolean>(loadingState);
    const [base64, setBase64] = useRecoilState<(string | undefined)[]>(base64State);

    useEffect(() => {
        async function fetchMusicList() {
            const { tracks } = await fetchSearchData(keyword, 'track');
            setMusicList(pre => pre.concat(tracks.items));
            setNextLink(tracks.next);
            setIsLoading(false);
            const base64s = await imgTobase64s(tracks.items);
            setBase64(pre => pre.concat(base64s));
        }
        fetchMusicList();
    }, [keyword, setMusicList, setNextLink, setIsLoading, setBase64]);

    return {
        musicList,
        isLoading,
        base64
    }
}

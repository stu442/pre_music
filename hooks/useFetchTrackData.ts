import { fetchTrackData } from "@/api/fetchTrackData";
import { errorToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

export function useFetchTrackData(contentsId : string[] | null) {
    const [trackData, setTrackData] = useState<SpotifyTracks>();

    useEffect(() => {
        if(contentsId && contentsId.length > 0) {
            const fetchData = async () => {
                try {
                    const data = await fetchTrackData(contentsId);
                    setTrackData(data);
                } catch (error) {
                    errorToast(error)
                }
            }
            fetchData();
        }
    }, [contentsId])
    return trackData
}
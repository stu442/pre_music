import {
    Carousel,
    CarouselContent,
    CarouselItem,
  } from "@/components/ui/carousel"
import MusicCardOnClient from "./MusicCardOnClient"
import { fetchTrackData } from "@/api/fetchTrackData"
import { useEffect, useState } from "react"
import { errorToast } from "./ui/use-toast"
import { imgTobase64s } from "@/app/action"

interface HomeMusicListProps {
    title: string
    contents_id: string[] | null
}

export default function HomeMuisicList({title, contents_id} : HomeMusicListProps) {

    const [trackData, setTrackData] = useState<SpotifyTracks>()
    const [base64, setBase64] = useState<(string | undefined)[]>([])

    useEffect(() => {
      if (contents_id && contents_id.length > 0) {
        const fetchData = async () => {
          try {
            const data = await fetchTrackData(contents_id);
            setTrackData(data);
          } catch (error) {
            errorToast(error)
          }
        };

        const fetchBase64s = async () => {
          try {
            if(trackData) {
              const base64s = await imgTobase64s(trackData.tracks);
              setBase64(base64s);
            }
          } catch(error) {
            errorToast(error)
          }
        };
        
        fetchData();
        fetchBase64s();
      }
    }, [contents_id]);
    
    return (
        <>
            <h2 className="text-lg mt-8 mb-4 font-medium">{title}</h2>
            <Carousel>
            <CarouselContent>
                {trackData?.tracks?.map((item, idx) => (
                    <CarouselItem key={`${title}${idx}`} className="basis-1/2 lg:basis-1/4 md:basis-1/3 sm:basis-1/2">
                        <MusicCardOnClient
                            title={item?.name}
                            artist={item?.album?.artists[0].name}
                            imgUrl={item?.album?.images[0].url}
                            musicUrl={item?.preview_url}
                            base64={base64[idx]}
                            id={item?.id}
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
            </Carousel>
        </>
    )
}
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import MusicCardOnClient from "./MusicCardOnClient"
import { fetchTrackData } from "@/api/fetchTrackData"
import { useEffect, useState } from "react"

interface HomeMusicListProps {
    title: string
    contents_id: ContentsItem[] | null
}

interface ContentsItem {
    contents_id: string
  }

export default function HomeMuisicList({title, contents_id} : HomeMusicListProps) {

    const [trackData, setTrackData] = useState<SpotifyTrack[]>([])

    useEffect(() => {
        const fetchData = async () => {
          try {
            const promises = contents_id!.map(item => fetchTrackData(item.contents_id));
            const data = await Promise.all(promises);
            setTrackData(data);
          } catch (error) {
            console.error('Error fetching track data:', error);
          }
        };
        fetchData();
      }, [contents_id]);


    return (
        <>
            <h2 className="text-lg mt-8 mb-4 font-medium">{title}</h2>
            <Carousel>
            <CarouselContent className="-ml-4">
                {trackData?.map((item, idx) => (
                    <CarouselItem key={`${title}${idx}`} className="basis-1/4 pl-4">
                        <MusicCardOnClient
                            title={item?.name}
                            artist={item.album?.artists[0].name}
                            imgUrl={item.album?.images[0].url}
                            musicUrl={item?.preview_url}
                            id={item?.id}
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            </Carousel>
        </>
    )
}
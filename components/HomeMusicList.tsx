// TODO : contents_id 가 NULL 일 경우 처리를 해줘야함

import {
    Carousel,
    CarouselContent,
    CarouselItem,
  } from "@/components/ui/carousel"
import MusicCardOnClient from "./MusicCardOnClient"
import { fetchTrackData } from "@/api/fetchTrackData"
import { useEffect, useState } from "react"
import { toast } from "./ui/use-toast"

interface HomeMusicListProps {
    title: string
    contents_id: string[] | null
}

export default function HomeMuisicList({title, contents_id} : HomeMusicListProps) {

    const [trackData, setTrackData] = useState<SpotifyTracks>()

    useEffect(() => {
      if (contents_id && contents_id.length > 0) {
        const fetchData = async () => {
          try {
            const data = await fetchTrackData(contents_id);
            setTrackData(data);
          } catch (error) {
            toast({
              title: "에러",
              description: "트랙 데이터를 불러오는 중 에러가 발생했습니다.",
              variant: "destructive",
            });
          }
        };
        
        fetchData();
      }
    }, [contents_id]);
    
    return (
        <>
            <h2 className="text-lg mt-8 mb-4 font-medium">{title}</h2>
            <Carousel>
            <CarouselContent>
              {/* TODO : trackData 가 없을 수 있다. */}

              {/* 로딩이 끝난 후, 오류 렌더링을 해야함 */}

              {/* 1. contents_id 가 안들어온 경우 (undefined) */}
              {/* 2. 트랙 데이터를 불러오는 중 에러가 발생한 경우 (undefined) */}
              {/* 3. 트랙 데이터가 없는 경우 (null) */}

                {trackData?.tracks?.map((item, idx) => (
                    <CarouselItem key={`${title}${idx}`} className="basis-1/2 lg:basis-1/4 md:basis-1/3 sm:basis-1/2">
                        <MusicCardOnClient
                            title={item?.name}
                            artist={item?.album?.artists[0].name}
                            imgUrl={item?.album?.images[0].url}
                            musicUrl={item?.preview_url}
                            id={item?.id}
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
            </Carousel>
        </>
    )
}
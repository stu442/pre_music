import {
    Carousel,
    CarouselContent,
    CarouselItem,
  } from "@/components/ui/carousel"
import MusicCardOnClient from "./MusicCardOnClient"
import { useFetchBase64s } from "@/hooks/useFetchBase64"
import { useFetchTrackData } from "@/hooks/useFetchTrackData"

interface HomeMusicListProps {
    title: string
    contentsId: string[] | null
}

export default function HomeMuisicList({title, contentsId} : HomeMusicListProps) {
    const trackData = useFetchTrackData(contentsId)
    const base64 = useFetchBase64s(trackData)
    
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
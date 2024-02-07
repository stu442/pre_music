import Image from 'next/image'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
  } from "@/components/ui/dialog"
import AudioPlayer from './AudioPlayer'
import Likes from './Likes'

interface MusicCardProps {
    title : string,
    artist : string | string[],
    imgUrl : string
    musicUrl : string | null
    id : string
}

export default function MusicCardOnClient({title, artist, imgUrl, musicUrl, id} : MusicCardProps) {

    return (
        <Dialog>
            <DialogTrigger className='flex flex-col items-center cursor-pointer'>
                <Image 
                width={320} height={320} 
                className='aspect-square'
                src={imgUrl} alt='music_img' 
                placeholder='blur' 
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII="
                />
                <h3 className='mt-2'>{title}</h3>
                <p className='text-sm text-black/70'>{artist}</p>
            </DialogTrigger>
            <DialogContent className='w-[420px] h-[420px] md:w-[640px] md:h-[640px]'>
                <Image 
                className='aspect-square brightness-50'
                fill={true}
                src={imgUrl} alt='music_img' 
                placeholder='blur' 
                blurDataURL="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII="
                />
                <AudioPlayer musicUrl={musicUrl} />
                <div className='flex flex-col items-center fixed left-[50%] top-[45%] translate-x-[-50%] translate-y-[-50%] gap-4'>
                    <h3 className='text-white text-3xl text-center'>{title}</h3>
                    <p className='text-white/70 text-xl text-center'>{artist}</p>
                    <Likes musicId={id} />
                </div>
            </DialogContent>
        </Dialog>
    )
}
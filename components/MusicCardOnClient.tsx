import Image from 'next/image'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
  } from "@/components/ui/dialog"
import AudioPlayer from './AudioPlayer'
import { getPlaiceholder } from 'plaiceholder'
// import { imgToBase64 } from '@/lib/imgToBase64'

interface MusicCardProps {
    title : string,
    artist : string | string[],
    imgUrl : string
    musicUrl : string | null
}

export default function MusicCardOnClient({title, artist, imgUrl, musicUrl} : MusicCardProps) {

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
            <DialogContent>
                <Image 
                className='aspect-square brightness-50'
                width={640} height={640} 
                src={imgUrl} alt='music_img' 
                placeholder='blur' 
                blurDataURL="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII="
                />
                <div className='flex flex-col items-center fixed left-[50%] top-[45%] translate-x-[-50%] translate-y-[-50%] gap-4'>
                    <h3 className='text-white text-3xl text-center'>{title}</h3>
                    <p className='text-white/70 text-xl text-center'>{artist}</p>
                </div>
                <AudioPlayer musicUrl={musicUrl} />
            </DialogContent>
        </Dialog>
    )
}
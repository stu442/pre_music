import Image from 'next/image'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
  } from "@/components/ui/dialog"
import AudioPlayer from './AudioPlayer'

interface MusicCardProps {
    title : string,
    artist : string | string[],
    imgUrl : string
    musicUrl : string | null
}

export default function MusicCard({title, artist, imgUrl, musicUrl} : MusicCardProps) {
    return (
        <Dialog>
            <DialogTrigger className='flex flex-col items-center cursor-pointer'>
                {/* TODO : Image 크기 다 맞추기 (정사각형으로) (반례 : beenzino 검색해봐) */}
                <Image 
                width={320} height={320} 
                src={imgUrl} alt='music_img' 
                placeholder='blur' 
                blurDataURL='data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkkAQAAB8AG7jymN8AAAAASUVORK5CYII='
                />
                <h3 className='mt-2'>{title}</h3>
                <p className='text-sm text-black/70'>{artist}</p>
            </DialogTrigger>
            <DialogContent>
                <Image 
                width={640} height={640} 
                src={imgUrl} alt='music_img' 
                placeholder='blur' 
                blurDataURL='data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkkAQAAB8AG7jymN8AAAAASUVORK5CYII='
                />
                <AudioPlayer musicUrl={musicUrl} />
            </DialogContent>
        </Dialog>
    )
}
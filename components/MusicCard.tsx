import Image from 'next/image'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
  } from "@/components/ui/dialog"

interface MusicCardProps {
    title : string,
    artist : string | string[],
    img : string
}

export default function MusicCard({title, artist, img} : MusicCardProps) {
    return (
        <Dialog>
            <DialogTrigger className='flex flex-col items-center cursor-pointer'>
                <Image 
                width={320} height={320} 
                src={img} alt='music_img' 
                placeholder='blur' 
                blurDataURL='data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkkAQAAB8AG7jymN8AAAAASUVORK5CYII='
                />
                <h3 className='mt-2'>{title}</h3>
                <p className='text-sm text-black/70'>{artist}</p>
            </DialogTrigger>
            <DialogContent>
                <Image 
                width={640} height={640} 
                src={img} alt='music_img' 
                placeholder='blur' 
                blurDataURL='data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkkAQAAB8AG7jymN8AAAAASUVORK5CYII='
                />
            </DialogContent>
        </Dialog>
    )
}
import Image from 'next/image'
import { useLikes } from '@/hooks/useLikes';

interface LikesProps {
    musicId: string;
}

export default function Likes({musicId} : LikesProps) {

const { isLike, likeCount, handleLike } = useLikes({musicId})    

    return (
        <div onClick={handleLike} className='flex gap-2 items-center text-white mt-2 cursor-pointer' data-cy={`likeBtn_${musicId}`}>
            {!isLike ? (
                <Image 
                src="/icons/heart_stroke.svg" 
                alt="heart_icon"
                width={30}
                height={30}
                />
            ) : (
                <Image 
                src="/icons/heart_fill.svg" 
                alt="heart_icon"
                width={30}
                height={30}
                />
            )}
            <p className='hover:underline'>{likeCount}</p>
        </div>
    )
}
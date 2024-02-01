import { supabase } from '@/lib/utils';
import { User } from '@supabase/supabase-js';
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { useToast } from './ui/use-toast';

interface LikesProps {
    musicId: string;
}

export default function Likes({musicId} : LikesProps) {

    const [userData, setUserData] = useState<User | null>(null);
    const [isLike, setIsLike] = useState(false);
    const [likeCount, setLikeCount] = useState<number | null>(0);
    const { toast } = useToast()
    
    useEffect(() => {
        async function fetchUserData() {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                setUserData(user)
                return user
            } catch (error) {
                console.error(error)
            }
        }
        
        async function checkLikes(user : User | null | undefined) {
            try {
                if (!user) {
                    return;
                }
                const { data } = await supabase
                    .from('LIKES')
                    .select('like_id')
                    .eq('user_id', user?.id)
                    .eq('contents_id', musicId);
                    
                if (data?.length) {
                    setIsLike(true)
                }
            } catch (error) {
                console.error("Error checking likes:", error);
            }
        }

        async function fetchLikesInfo() {
            let { count, error } = await supabase
            .from('LIKES')
            .select('*', {count: 'exact'})
            .eq('contents_id', musicId)
            setLikeCount(count);
        }

        fetchUserData().then((userData) => checkLikes(userData))
        fetchLikesInfo()
    }, [musicId])

    async function handleLike() {
        if (!userData) {
            toast({
                variant: "destructive",
                description: "좋아요를 누르려면 로그인 해주세요.",
              })
            return;
        }
        setIsLike(!isLike);
        await storeLikeData();
        if(likeCount !== null) {
            setLikeCount(isLike ? likeCount - 1 : likeCount + 1);
        }
    }

    async function storeLikeData() {
        if(!isLike) {
            const { data, error } = await supabase
            .from('LIKES')
            .insert([
            { contents_id: musicId, user_id: userData?.id },
            ])
            .select()
            console.log("store!!", data)
        } else {
            const { data, error } = await supabase
            .from('LIKES')
            .delete()
            .eq('contents_id', musicId)
            console.log("delete!!", data)
        }
    }

    return (
        <div onClick={handleLike} className='flex gap-2 items-center text-white mt-2 cursor-pointer'>
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
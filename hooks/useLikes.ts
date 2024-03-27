import { errorToast, useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/utils";
import { User } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";

interface LikesProps {
    musicId: string;
}

export function useLikes({musicId} : LikesProps) {
    const [userData, setUserData] = useState<User | null>(null);
    const [isLike, setIsLike] = useState(false);
    const [likeCount, setLikeCount] = useState<number | null>(0);
    const { toast } = useToast()

    useEffect(() => {
        async function fetchUserData() {
            try {
                const { data, error } = await supabase.auth.getSession()
                if (error) {
                    throw new Error("유저 데이터를 가져오는 중 에러가 발생했습니다.");
                }
                if(data.session === null) {
                    return null;
                } else {
                    setUserData(data.session.user);
                    return data.session.user;
                }
            } catch (error) {
                errorToast(error)
                return null;
            }
        }
        
        async function isUserLikes(user: User | null | undefined) {
            try {
                if (!user) {
                    return;
                }
                const { data, error } = await supabase
                    .from('LIKES')
                    .select('like_id')
                    .eq('user_id', user?.id)
                    .eq('contents_id', musicId);
                if (error) {
                    throw new Error("좋아요 정보를 가져오는 중 에러가 발생했습니다.");
                }
                if (data?.length) {
                    setIsLike(true);
                }
            } catch (error) {
                errorToast(error)
            }
        }
    
        async function fetchLikesInfo() {
            try {
                const { count, error } = await supabase
                    .from('LIKES')
                    .select('*', { count: 'exact' })
                    .eq('contents_id', musicId);
                if (error) {
                    throw new Error("좋아요 정보를 가져오는 중 에러가 발생했습니다.");
                }
                setLikeCount(count);
            } catch (error) {
                errorToast(error)
            }
        }
    
        fetchUserData().then(userData => isUserLikes(userData));
        fetchLikesInfo();
    }, [musicId, toast]);

    const storeLikeData = useCallback(async () => {
        try {
            if(!isLike) {
                const { data, error } = await supabase
                    .from('LIKES')
                    .insert([
                        { contents_id: musicId, user_id: userData?.id },
                    ])
                    .select();
                if (error) {
                    throw new Error("좋아요 정보를 업데이트 하는 중 오류가 발생했습니다.");
                }
            } else {
                const { data, error } = await supabase
                    .from('LIKES')
                    .delete()
                    .eq('contents_id', musicId);
                    
                if (error) {
                    throw new Error("좋아요 정보를 업데이트 하는 중 오류가 발생했습니다.");
                }
            }
        } catch (error) {
            errorToast(error)
        }
    }, [isLike, userData, musicId])

    const handleLike = useCallback(async () => {
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
    }, [userData, isLike, likeCount, toast, storeLikeData])

    return { isLike, likeCount, handleLike }
}
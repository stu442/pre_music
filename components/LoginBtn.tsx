'use client'

import { supabase } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import { errorToast } from './ui/use-toast';

export default function LoginBtn() {
  
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.auth.getSession()
      data.session ? setIsLogin(true) : setIsLogin(false)
    })()
  }, [])

  async function signInWithKakao() {
    try {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'kakao',
        });
        if (error) {
            throw new Error("로그인 중 에러가 발생했습니다.");
        }
    } catch (error) {
      errorToast(error)
    }
}

async function signOut() {
  try {
      const { error } = await supabase.auth.signOut();
      if (error) {
          throw new Error("로그아웃 중 에러가 발생했습니다.");
      }
      setIsLogin(false);
  } catch (error) {
    errorToast(error)
  }
}

    return (
        <div className='flex flex-row-reverse mb-4'>
            {!isLogin ? 
              <Button style={{backgroundColor: "#FEE500", color : "#000000 85%"}} onClick={signInWithKakao} size={'lg'} variant="secondary" >카카오 로그인</Button>
            : <Button size={'lg'} variant="secondary" onClick={signOut}>로그아웃</Button>
            
            }
        </div>
    )
}
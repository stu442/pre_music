'use client'

import { supabase } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"

export default function LoginBtn() {
  
  const [isLogin, setIsLogin] = useState(false);
  // TODO : 에러처리 하기

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.auth.getSession()
      data.session ? setIsLogin(true) : setIsLogin(false)
    })()
  }, [])

    async function signInWithKakao() {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'kakao',
        })
        console.error(error)
      }

      async function signOut() {
        const { error } = await supabase.auth.signOut();
        setIsLogin(false)
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
'use client'

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useToast } from './ui/use-toast';

interface AudioPlayerProps {
  musicUrl : string | null
}

export default function AudioPlayer({ musicUrl } : AudioPlayerProps) {
    const [volume, setVolume] = useState(0.4);
    const [isVisible, setIsVisible] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const timerId = useRef<NodeJS.Timeout | null>(null);
    const { toast } = useToast()

    useEffect(() => {
        if(audioRef.current) {
            audioRef.current.volume = volume
        }
    }, [volume])

    const playPauseToggle = () => {

      if (musicUrl === null) {
        toast({
          title: 'Error',
          description: '음악이 존재하지 않습니다.',
          variant: 'destructive',
        })
      }
      console.log(timerId.current)
      if(timerId.current) {
        clearTimeout(timerId.current);
      }
      
      setIsVisible(true);
      timerId.current = setTimeout(() => {
        setIsVisible(false);
      }, 1000);

      setVolume((prevVolume) => (prevVolume === 0 ? 0.4 : 0));
    };
    
    return (
        <>
              <button className='flex justify-center items-center w-full h-full fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]' onClick={playPauseToggle}>
                {volume === 0 ? (
                  isVisible && <Image className='bg-white/10 p-2 rounded-full transition duration-500 ease-linear' src="/icons/speaker_off.svg" alt="음소거" width={120} height={120} />
                ) : (
                  isVisible && <Image className='bg-white/10 p-2 rounded-full' src="/icons/speaker_on.svg" alt="음량 켜짐" width={120} height={120} />
                )}
              </button>
            {musicUrl && <audio
            ref={audioRef} 
            className='hidden' 
            autoPlay loop controls 
            src={musicUrl}
             />}
        </>
    )
}
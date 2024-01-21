'use client'

import React, { useEffect, useRef } from 'react';
import { useToast } from './ui/use-toast';

interface AudioPlayerProps {
  musicUrl : string | null
}

export default function AudioPlayer({ musicUrl } : AudioPlayerProps) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const { toast } = useToast()

    useEffect(() => {
        if(audioRef.current) {
            audioRef.current.volume = 0.4
        }
    }, [])

    const playPauseToggle = () => {
      if (musicUrl === null) {
        toast({
          title: 'Error',
          description: '음악이 존재하지 않습니다.',
          variant: 'destructive',
        })
      }
      if (audioRef.current?.paused) {
        audioRef.current.play();
      } else {
        audioRef.current?.pause();
      }
    };
    
    return (
        <>
        {/* TODO: button style 입히기 */}
            <button onClick={playPauseToggle}>
                {audioRef.current && audioRef.current.paused ? 'Play' : 'Pause'}
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
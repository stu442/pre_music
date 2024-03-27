'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useToast } from './ui/use-toast';

interface AudioPlayerProps {
  musicUrl : string | null
  testId : string
}

export default function AudioPlayer({ musicUrl, testId } : AudioPlayerProps) {
    const DEFAULT_VOLUME = 0.4;
    const SPEAKER_DURATION = 1000;

    const [volume, setVolume] = useState(DEFAULT_VOLUME);
    const [isVisible, setIsVisible] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const timerId = useRef<NodeJS.Timeout | null>(null);
    const { toast } = useToast()

    const handleMusicUrlError = useCallback(() => {
      if (musicUrl === null) {
        toast({
          title: 'Error',
          description: '음악이 존재하지 않습니다.',
          variant: 'destructive',
        })
      }
    }, [musicUrl, toast]);
    
    useEffect(() => {
        if(audioRef.current) {
            audioRef.current.volume = volume
        }

        handleMusicUrlError();

    }, [volume, handleMusicUrlError])

    const playPauseToggle = (e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
      if ('touches' in e) {
        e.preventDefault();
      }
      handleMusicUrlError();
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
      setIsVisible(true);
      timerId.current = setTimeout(() => {
        setIsVisible(false);
      }, SPEAKER_DURATION);
      setVolume((prevVolume) => (prevVolume === 0 ? DEFAULT_VOLUME : 0));
    };
    
    
    return (
        <>
              <button className='flex justify-center items-center w-full h-full fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]' onClick={playPauseToggle} onTouchEnd={e => playPauseToggle(e)} data-cy={`audio-btn-${testId}`}>
              </button>
                {volume === 0 ? (
                  isVisible && <Image style={{zIndex:1000, pointerEvents:'none'}} className='bg-white/10 p-2 rounded-full transition duration-500 ease-linear fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]' src="/icons/speaker_off.svg" alt="음소거" width={120} height={120} data-cy={`audio-off-${testId}`} />
                ) : (
                  isVisible && <Image style={{zIndex:1000, pointerEvents:'none'}} className='bg-white/10 p-2 rounded-full fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]' src="/icons/speaker_on.svg" alt="음량 켜짐" width={120} height={120} data-cy={`audio-on-${testId}`} />
                )}
            {musicUrl && <audio
            ref={audioRef} 
            className='hidden' 
            autoPlay loop controls 
            src={musicUrl}
             />}
        </>
    )
}
'use client';

import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';

interface RadioContextType {
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  isBuffering: boolean;
  togglePlay: () => void;
  setVolume: (val: number) => void;
  toggleMute: () => void;
}

const RadioContext = createContext<RadioContextType | undefined>(undefined);

export function RadioProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const STREAM_URL = 'https://stream.zeno.fm/5xp6jnfnmiouv';

  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: 'Radio El Designado',
        artist: 'Señal Central 24/7',
        album: 'Transmisión en Vivo',
        artwork: [
          { src: '/DH LOGO fondo blanco.jpeg', sizes: '96x96', type: 'image/jpeg' },
          { src: '/DH LOGO fondo blanco.jpeg', sizes: '128x128', type: 'image/jpeg' },
          { src: '/DH LOGO fondo blanco.jpeg', sizes: '192x192', type: 'image/jpeg' },
          { src: '/DH LOGO fondo blanco.jpeg', sizes: '256x256', type: 'image/jpeg' },
          { src: '/DH LOGO fondo blanco.jpeg', sizes: '384x384', type: 'image/jpeg' },
          { src: '/DH LOGO fondo blanco.jpeg', sizes: '512x512', type: 'image/jpeg' },
        ]
      });

      navigator.mediaSession.setActionHandler('play', () => {
        togglePlay();
      });
      navigator.mediaSession.setActionHandler('pause', () => {
        togglePlay();
      });
    }
  }, [isPlaying]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'paused';
      }
    } else {
      setIsBuffering(true);
      audioRef.current.src = STREAM_URL;
      audioRef.current.load();
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsBuffering(false);
          if ('mediaSession' in navigator) {
            navigator.mediaSession.playbackState = 'playing';
          }
        })
        .catch((error) => {
          console.error('Error playing audio:', error);
          setIsBuffering(false);
          setIsPlaying(false);
          if ('mediaSession' in navigator) {
            navigator.mediaSession.playbackState = 'none';
          }
        });
    }
  };

  const setVolume = (val: number) => {
    setVolumeState(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
    if (val === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;

    if (isMuted) {
      audioRef.current.volume = volume === 0 ? 0.5 : volume;
      setVolumeState(volume === 0 ? 0.5 : volume);
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  return (
    <RadioContext.Provider
      value={{
        isPlaying,
        volume,
        isMuted,
        isBuffering,
        togglePlay,
        setVolume,
        toggleMute,
      }}
    >
      {children}
      {/* Audio Element (Hidden & Persistent) */}
      <audio ref={audioRef} preload="none">
        <source src={STREAM_URL} type="audio/mpeg" />
      </audio>
    </RadioContext.Provider>
  );
}

export function useRadio() {
  const context = useContext(RadioContext);
  if (context === undefined) {
    throw new Error('useRadio must be used within a RadioProvider');
  }
  return context;
}

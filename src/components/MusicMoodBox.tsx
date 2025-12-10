import { Music, Music2, Music3, Music4, Play, Pause, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';

interface MusicMoodBoxProps {
  selectedMood: string | null;
}

const moodMusic: Record<string, { 
  genres: string[]; 
  color: string; 
  emoji: string;
  youtubeId: string;
  title: string;
}> = {
  happy: { 
    genres: ['Pop', 'Dance', 'K-pop'], 
    color: 'from-yellow-400 to-orange-400', 
    emoji: '🎉',
    youtubeId: 'qC6YkDDmwPM', // Happy upbeat music (updated)
    title: 'Happy Vibes'
  },
  calm: { 
    genres: ['Lo-fi', 'Acoustic', 'Classical'], 
    color: 'from-blue-300 to-cyan-300', 
    emoji: '🎧',
    youtubeId: '6H-PLF2CR18', // Lofi hip hop
    title: 'Calm Beats'
  },
  romantic: { 
    genres: ['R&B', 'Jazz', 'Ballad'], 
    color: 'from-pink-400 to-rose-400', 
    emoji: '💕',
    youtubeId: 'PKGvyduUSsY', // Romantic jazz
    title: 'Romantic Jazz'
  },
  energetic: { 
    genres: ['EDM', 'Rock', 'Hip-hop'], 
    color: 'from-purple-500 to-pink-500', 
    emoji: '⚡',
    youtubeId: '3ssL8vx7Xhg', // Energetic workout music
    title: 'Energy Boost'
  },
  cozy: { 
    genres: ['Indie', 'Folk', 'Soul'], 
    color: 'from-amber-600 to-orange-600', 
    emoji: '☕',
    youtubeId: 'rt1mRnRp79A', // Cozy indie folk
    title: 'Cozy Corner'
  },
  dreamy: { 
    genres: ['Ambient', 'Chillwave', 'Dream Pop'], 
    color: 'from-indigo-400 to-purple-400', 
    emoji: '✨',
    youtubeId: 'UMhOGEo8O5A', // Dreamy ambient
    title: 'Dreamy Soundscapes'
  },
  vibrant: { 
    genres: ['Funk', 'Disco', 'Electronic'], 
    color: 'from-cyan-400 to-blue-500', 
    emoji: '🎨',
    youtubeId: '8oHJGD63R74', // Funky disco
    title: 'Vibrant Groove'
  },
  peaceful: { 
    genres: ['New Age', 'Meditation', 'Piano'], 
    color: 'from-pink-300 to-purple-300', 
    emoji: '🕊️',
    youtubeId: 'QGEZbOm-P44', // Peaceful meditation
    title: 'Peaceful Mind'
  },
};

const musicIcons = [Music, Music2, Music3, Music4];

export function MusicMoodBox({ selectedMood }: MusicMoodBoxProps) {
  const musicData = selectedMood ? moodMusic[selectedMood] : null;
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [volume, setVolume] = useState<number>(100); // 0-100
  const playerRef = useRef<any>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // YouTube 무드가 바뀔 때마다 플레이어 초기화
  useEffect(() => {
    if (selectedMood && musicData) {
      setShowPlayer(false);
      setIsPlaying(false);
      // 약간의 딜레이 후 새 플레이어 표시
      setTimeout(() => setShowPlayer(true), 100);
    }
  }, [selectedMood]);

  const togglePlay = () => {
    if (!iframeRef.current) return;
    
    if (isPlaying) {
      // 일시정지
      postYouTubeCommand('pauseVideo');
    } else {
      // 재생
      postYouTubeCommand('playVideo');
    }
    setIsPlaying(!isPlaying);
  };

  // Helper to send commands to YouTube iframe player
  const postYouTubeCommand = (command: string, args: any = []) => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;
    try {
      iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: command, args }), '*');
    } catch (e) {
      // ignore
    }
  };

  // When player appears or volume changes, send setVolume
  useEffect(() => {
    if (!iframeRef.current) return;
    // Delay briefly to give player a chance to initialize
    const t = setTimeout(() => {
      postYouTubeCommand('setVolume', [Math.round(volume)]);
    }, 300);
    return () => clearTimeout(t);
  }, [showPlayer, volume]);
  
  return (
    <motion.div
      className="rounded-3xl shadow-lg border-2 border-white h-full min-h-[200px] overflow-hidden relative group"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${musicData?.color || 'from-slate-200 to-slate-300'} transition-all duration-500`}>
        {/* Floating Music Icons Animation */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {musicIcons.map((Icon, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ 
                x: Math.random() * 100 + '%', 
                y: Math.random() * 100 + '%',
                rotate: Math.random() * 360
              }}
              animate={{ 
                y: ['-20%', '120%'],
                rotate: [0, 360]
              }}
              transition={{ 
                duration: 8 + i * 2, 
                repeat: Infinity,
                delay: i * 1.5,
                ease: 'linear'
              }}
            >
              <Icon className="w-8 h-8 text-white" />
            </motion.div>
          ))}
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center p-4 text-center">
          <div className="flex items-center gap-3 mb-3">
            <motion.div
              className="text-3xl"
              animate={{ scale: isPlaying ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 0.5, repeat: isPlaying ? Infinity : 0 }}
            >
              {musicData?.emoji || '🎵'}
            </motion.div>
            
            <h3 className="text-white drop-shadow-lg">
              {selectedMood ? musicData?.title : 'Select a Mood'}
            </h3>
          </div>
          
          {musicData ? (
            <div className="flex flex-col items-center gap-3 w-full">
              <motion.div 
                className="flex flex-wrap justify-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {musicData.genres.map((genre, index) => (
                  <motion.div
                    key={genre}
                    className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-slate-700 text-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 1)' }}
                  >
                    {genre}
                  </motion.div>
                ))}
              </motion.div>

              {/* Play/Pause Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-3 justify-center">
                  <Button
                    onClick={togglePlay}
                    className="bg-white/90 hover:bg-white text-slate-700 rounded-full h-12 w-12 p-0 shadow-lg"
                  >
                  <AnimatePresence mode="wait">
                    {isPlaying ? (
                      <motion.div
                        key="pause"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Pause className="h-5 w-5" fill="currentColor" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="play"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Play className="h-5 w-5 ml-1" fill="currentColor" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  </Button>

                  {/* Volume control */}
                  <div className="flex items-center gap-2 px-1 py-0 rounded-full">
                    <Volume2 className="w-4 h-4 text-white" />
                    <div className="transform -translate-y-3">
                      <style>{`
                        .mm-range { appearance: none; height: 6px; border-radius: 999px; background: transparent; }
                        .mm-range:focus { outline: none; }
                        /* WebKit */
                        .mm-range::-webkit-slider-runnable-track {
                          height: 6px; border-radius: 999px;
                          background: linear-gradient(90deg, white var(--vol), rgba(0,0,0,0.1) var(--vol));
                        }
                        .mm-range::-webkit-slider-thumb { -webkit-appearance: none; width: 14px; height: 14px; border-radius: 999px; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.3); margin-top: -4px; }
                        /* Firefox */
                        .mm-range::-moz-range-track { height:6px; border-radius:999px; background: linear-gradient(90deg, white var(--vol), rgba(0,0,0,0.1) var(--vol)); }
                        .mm-range::-moz-range-thumb { width:14px; height:14px; border-radius:999px; background:white; box-shadow: 0 1px 3px rgba(0,0,0,0.3); }
                      `}</style>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={volume}
                        onChange={(e) => setVolume(Number(e.target.value))}
                        className="w-32 mm-range"
                        aria-label="Volume"
                        style={{
                          // set CSS var in percent for gradient stops
                          ['--vol' as any]: `${volume}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : (
            <p className="text-white/80 text-sm">
              Play music based on your mood
            </p>
          )}
        </div>

        {/* Hidden YouTube Player */}
        {musicData && showPlayer && (
          <iframe
            ref={iframeRef}
            src={`https://www.youtube.com/embed/${musicData.youtubeId}?enablejsapi=1&controls=0&autoplay=0&loop=1&playlist=${musicData.youtubeId}`}
            allow="autoplay; encrypted-media"
            className="hidden"
          />
        )}
      </div>
    </motion.div>
  );
}
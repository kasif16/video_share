import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, SkipBack, SkipForward } from 'lucide-react';
import { formatDuration } from '../utils/format';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  onEnded?: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, title, onEnded }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [quality, setQuality] = useState('1080p');
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleDurationChange = () => setDuration(video.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      onEnded?.();
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('durationchange', handleDurationChange);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('durationchange', handleDurationChange);
      video.removeEventListener('ended', handleEnded);
    };
  }, [onEnded]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e: React.MouseEvent) => {
    const video = videoRef.current;
    const progressBar = progressRef.current;
    if (!video || !progressBar) return;

    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickRatio = clickX / rect.width;
    const newTime = clickRatio * duration;
    
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = parseFloat(e.target.value);
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!isFullscreen) {
      video.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const skipTime = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = Math.max(0, Math.min(duration, currentTime + seconds));
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div 
      className="relative bg-black rounded-lg overflow-hidden group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full aspect-video object-contain"
        onClick={togglePlay}
      />

      {/* Play Button Overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={togglePlay}
            className="w-20 h-20 bg-black bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all"
          >
            <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
          </button>
        </div>
      )}

      {/* Controls */}
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 transition-opacity duration-300 ${
        showControls ? 'opacity-100' : 'opacity-0'
      }`}>
        {/* Progress Bar */}
        <div
          ref={progressRef}
          className="w-full h-1 bg-gray-600 rounded cursor-pointer mb-4"
          onClick={handleProgressClick}
        >
          <div
            className="h-full bg-red-600 rounded transition-all duration-100"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={togglePlay} className="text-white hover:text-red-400 transition-colors">
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>

            <button onClick={() => skipTime(-10)} className="text-white hover:text-red-400 transition-colors">
              <SkipBack className="w-5 h-5" />
            </button>

            <button onClick={() => skipTime(10)} className="text-white hover:text-red-400 transition-colors">
              <SkipForward className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2">
              <button onClick={toggleMute} className="text-white hover:text-red-400 transition-colors">
                {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 bg-gray-600 rounded slider"
              />
            </div>

            <div className="text-white text-sm">
              {formatDuration(currentTime)} / {formatDuration(duration)}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="text-white hover:text-red-400 transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>

              {showSettings && (
                <div className="absolute bottom-full right-0 mb-2 bg-black bg-opacity-90 rounded-lg p-3 min-w-32">
                  <div className="text-white text-sm mb-2">Quality</div>
                  {['1080p', '720p', '480p', '360p'].map((q) => (
                    <button
                      key={q}
                      onClick={() => {
                        setQuality(q);
                        setShowSettings(false);
                      }}
                      className={`block w-full text-left px-2 py-1 text-sm rounded hover:bg-gray-600 transition-colors ${
                        quality === q ? 'text-red-400' : 'text-white'
                      }`}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button onClick={toggleFullscreen} className="text-white hover:text-red-400 transition-colors">
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
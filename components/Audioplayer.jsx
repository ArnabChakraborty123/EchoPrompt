import React, { useState, useEffect, createRef } from "react";
import { Play, Pause, Download, Volume1Icon, VolumeX} from "lucide-react";

const Audioplayer = ({ audioFile, isTextEntered }) => {
  const audioRef = React.createRef();
  const progressBarRef = React.createRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showSpeedOptions, setShowSpeedOptions] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // new state for mute/unmute

  useEffect(() => {
    if (audioFile) {
      const audioStream = audioFile.AudioStream;
      const response = new Response(audioStream);
      response.blob().then((blob) => {
        const audioUrl = URL.createObjectURL(blob);
        const audio = audioRef.current;
        audio.src = audioUrl;
        audio.addEventListener("loadedmetadata", () => {
          setDuration(audio.duration);
        });
        audio.addEventListener("loadedmetadata", () => {
          audio.addEventListener("timeupdate", () => {
            setCurrentTime(audio.currentTime);
          });
        });
      });
    }
  }, [audioFile]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };
  const toggleMute = () => {
    const audio = audioRef.current;
    if (isMuted) {
      audio.muted = false;
      setIsMuted(false);
    } else {
      audio.muted = true;
      setIsMuted(true);
    }
  };
  const downloadAudio = () => {
    const audioBlob = new Blob([audioFile], { type: "audio/mpeg" });
    const audioURL = URL.createObjectURL(audioBlob);
    const link = document.createElement("a");
    link.href = audioURL;
    link.download = "audio.mp3";
    link.click();
  };

  const changeSpeed = (speed) => {
    audioRef.current.playbackRate = speed;
    setSpeed(speed);
    setShowSpeedOptions(false);
  };

  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="flex items-center w-3/4">
        <button
          className="ml-2 bg-gray-200 hover:bg-gradient-to-r from-purple-500 to-red-700 rounded-full p-2"
          onClick={toggleMute}
        >
          {isMuted ? (
            <VolumeX size={24} fill="#FFFFFF" />
          ) : (
            <Volume1Icon size={24} fill="#FFFFFF" />
          )}
        </button>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 overflow-hidden">
          <div
            className="bg-gradient-to-r from-purple-500 to-red-700 h-2.5"
            ref={progressBarRef}
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
        </div>
      </div>
      <div className="flex gap-6">
        <div className="relative inline-block">
          <button
            onClick={() => togglePlay()}
            className={`rounded-full p-4 ${
              isTextEntered
                ? "bg-purple-500 hover:bg-red-700 text-white font-bold p-4 mt-4 rounded-full flex items-center justify-center shadow-lg transition duration-300 ease-in-out transform hover:scale-110"
                : "bg-gray-300 text-gray-500 cursor-not-allowed font-bold p-4 mt-4 rounded-full flex items-center justify-center shadow-lg transition duration-300 ease-in-out transform hover:scale-110"
            }`}
            style={{ width: "50px", height: "50px" }}
            disabled={!isTextEntered}
            onMouseEnter={() => setShowSpeedOptions(true)}
            onMouseLeave={() => setShowSpeedOptions(false)}
          >
            <audio
              ref={(element) => {
                audioRef.current = element;
              }}
            />

            {isPlaying ? (
              <Pause className="text-black" />
            ) : (
              <Play className="text-black" />
            )}
          </button>
          {showSpeedOptions && (
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-white border rounded shadow-lg z-10">
              <ul className="p-2">
                <li className="cursor-pointer p-1 hover:bg-gray-200" onClick={() => changeSpeed(0.5)}>0.5x</li>
                <li className="cursor-pointer p-1 hover:bg-gray-200" onClick={() => changeSpeed(1)}>1x</li>
                <li className="cursor-pointer p-1 hover:bg-gray-200" onClick={() => changeSpeed(1.5)}>1.5x</li>
                <li className="cursor-pointer p-1 hover:bg-gray-200" onClick={() => changeSpeed(2)}>2x</li>
              </ul>
            </div>
          )}
        </div>
        <button
          className="bg-purple-500 hover:bg-red-700 text-white font-bold p-4 mt-4 rounded-full flex items-center justify-center shadow-lg transition duration-300 ease-in-out transform hover:scale-110"
          style={{ width: "50px", height: "50px" }}
          onClick={downloadAudio}
        >
          <Download size={24} />
        </button>
      </div>
    </div>
  );
};

export default Audioplayer;

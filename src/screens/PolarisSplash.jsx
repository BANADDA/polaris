import Lottie from 'lottie-react';
import { Terminal } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const PolarisSplash = ({ onLoadingComplete }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [systemStatus, setSystemStatus] = useState('Starting Mining Operations...');
  const [animationData, setAnimationData] = useState(null);

  const statusMessages = [
    'Starting Mining Operations...',
    'Finding Block Hash...',
    'Mining Cryptocurrency...',
    'Validating Blocks...',
    'Securing Network...',
  ];

  useEffect(() => {
    fetch('/assets/loading.json')
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error('Error loading animation:', error));

    const timer = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onLoadingComplete(), 1000);
          return 100;
        }
        const newProgress = prev + 1;
        const messageIndex = Math.floor((newProgress / 100) * statusMessages.length);
        setSystemStatus(statusMessages[Math.min(messageIndex, statusMessages.length - 1)]);
        return newProgress;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-10 bg-center bg-cover mix-blend-overlay" />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900">
        <div className="absolute inset-0 opacity-5">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="h-px bg-blue-400 w-full" style={{ marginTop: `${i * 5}vh` }} />
          ))}
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-px bg-blue-400 h-full absolute" style={{ left: `${i * 5}vw` }} />
          ))}
        </div>
      </div>

      <div className="relative h-full w-full flex flex-col items-center justify-center px-6 py-12 space-y-16">
        {/* Lottie Animation */}
        <div className="relative w-[400px] h-[400px]">
          {animationData ? (
            <Lottie
              animationData={animationData}
              loop={true}
              autoplay={true}
              style={{ width: '100%', height: '100%' }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Terminal className="w-24 h-24 text-blue-400 animate-pulse" />
            </div>
          )}
        </div>

        {/* Text and Progress Section */}
        <div className="text-center w-full max-w-3xl">
          <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200 mb-4 tracking-widest font-mono">
            POLARIS
          </h1>
          <p className="text-blue-200 text-xl mb-10 font-mono tracking-wider">
            Blockchain Mining Network
          </p>

          {/* Progress Bar */}
          <div className="space-y-6">
            <div className="w-full max-w-2xl mx-auto h-3 bg-slate-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-300 transition-all duration-300 rounded-full relative"
                style={{ width: `${loadingProgress}%` }}
              >
                <div className="absolute inset-0 bg-[url('/api/placeholder/100/100')] opacity-20 bg-repeat-x mix-blend-overlay" />
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-blue-300 text-lg font-mono tracking-wider">
                {systemStatus}
              </p>
              <p className="text-blue-200/80 text-lg font-mono">
                Mining Progress: 
                <span className="ml-2 text-blue-300">{loadingProgress}%</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolarisSplash;
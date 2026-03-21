import { useState, useEffect, useRef, useCallback } from 'react';
import { Timer, Play, Pause, RotateCcw } from 'lucide-react';

const PRESETS = [30, 60, 90, 120];

export default function RestTimer() {
  const [restTime, setRestTime] = useState(90);
  const [remaining, setRemaining] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    // Create audio context for beep
    audioRef.current = {
      play: () => {
        try {
          const ctx = new (window.AudioContext || window.webkitAudioContext)();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.value = 800;
          gain.gain.value = 0.3;
          osc.start();
          osc.stop(ctx.currentTime + 0.3);
        } catch (e) { /* silent fallback */ }
      }
    };
  }, []);

  const stopRest = useCallback(() => {
    clearInterval(intervalRef.current);
    setIsResting(false);
    setRemaining(0);
  }, []);

  const startRest = useCallback(() => {
    stopRest();
    setRemaining(restTime);
    setIsResting(true);

    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setIsResting(false);
          audioRef.current?.play();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [restTime, stopRest]);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const getDisplayClass = () => {
    if (!isResting) return 'rest-display';
    if (remaining <= 10) return 'rest-display warning';
    return 'rest-display resting';
  };

  return (
    <div className="rest-timer">
      <Timer size={18} style={{ color: 'var(--text-muted)' }} />
      <div>
        <div className="timer-label">Descanso</div>
        <div className={getDisplayClass()}>
          {isResting ? formatTime(remaining) : formatTime(restTime)}
        </div>
      </div>
      <div className="rest-presets">
        {PRESETS.map((t) => (
          <button
            key={t}
            className={`rest-preset-btn ${restTime === t && !isResting ? 'active' : ''}`}
            onClick={() => { setRestTime(t); if (!isResting) setRemaining(t); }}
          >
            {t}s
          </button>
        ))}
      </div>
      {isResting ? (
        <button className="btn btn-sm btn-ghost" onClick={stopRest}>
          <Pause size={14} /> Parar
        </button>
      ) : (
        <button className="btn btn-sm btn-primary" onClick={startRest}>
          <Play size={14} /> Descansar
        </button>
      )}
    </div>
  );
}

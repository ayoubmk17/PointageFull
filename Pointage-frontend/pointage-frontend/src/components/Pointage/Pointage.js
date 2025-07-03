import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import bgImg from '../../assets/ram-bg.png';

const RAM_RED = '#a60d1a';
const RAM_GOLD = '#bfa046';
const RAM_BG = '#f5f5f5';
const RAM_TEXT = '#222222';

const Pointage = ({ email, onLogout }) => {
  const [startTime] = useState(dayjs());
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setElapsed(dayjs().diff(startTime, 'second'));
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [startTime]);

  useEffect(() => {
    if (!isRunning) {
      clearInterval(intervalRef.current);
    }
  }, [isRunning]);

  const handleStop = () => {
    setIsRunning(false);
    setTimeout(() => {
      if (onLogout) onLogout();
    }, 1800); // 1.8s pour laisser voir le message
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background image floue */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: `url(${bgImg}) center/cover no-repeat`,
        filter: 'blur(6px) brightness(0.7)',
        zIndex: 0,
      }} />
      {/* Overlay pour lisibilité */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(255,255,255,0.25)',
        zIndex: 1,
      }} />
      {/* Carte pointage */}
      <div style={{ maxWidth: 420, margin: '60px auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px #0001', padding: 32, border: `2px solid ${RAM_RED}`, position: 'relative', zIndex: 2 }}>
        {/* Header/logo */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
          {/* Logo stylisé RAM (placeholder texte) */}
          <div style={{ fontWeight: 'bold', color: RAM_RED, fontSize: 28, letterSpacing: 2, fontFamily: 'serif', marginRight: 12 }}>
            {/* Tu peux remplacer ce texte par un vrai logo SVG RAM */}
            <span style={{ color: RAM_GOLD, fontSize: 22, verticalAlign: 'middle' }}>✈</span> Royal Air Maroc
          </div>
        </div>
        <h2 style={{ color: RAM_RED, fontWeight: 700, marginBottom: 12 }}>Pointage</h2>
        <div style={{ marginBottom: 18, color: RAM_TEXT, fontSize: 17 }}>
          Bonjour, <b style={{ color: RAM_RED }}>{email}</b>
        </div>
        <div style={{ fontSize: 40, marginBottom: 28, color: RAM_GOLD, fontFamily: 'monospace', letterSpacing: 2, textAlign: 'center' }}>{formatTime(elapsed)}</div>
        <button
          onClick={handleStop}
          disabled={!isRunning}
          style={{ width: '100%', padding: 14, background: RAM_RED, color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 18, letterSpacing: 1, boxShadow: '0 2px 8px #a60d1a22', cursor: isRunning ? 'pointer' : 'not-allowed', transition: 'background 0.2s' }}
        >
          Sortir
        </button>
        {!isRunning && <div style={{ marginTop: 22, color: RAM_GOLD, fontWeight: 600, fontSize: 18, textAlign: 'center' }}>Pointage arrêté.<br />Temps total : {formatTime(elapsed)}</div>}
      </div>
    </div>
  );
};

export default Pointage; 
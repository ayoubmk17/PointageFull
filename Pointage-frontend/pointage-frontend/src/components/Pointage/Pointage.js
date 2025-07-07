import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import bgImg from '../../assets/ram-bg.png';
import { getShifts, updateShift } from '../../services/api';

const RAM_RED = '#a60d1a';
const RAM_GOLD = '#bfa046';
const RAM_TEXT = '#222222';

const Pointage = ({ email, shiftId, onLogout }) => {
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [shifts, setShifts] = useState([]);
  const intervalRef = useRef(null);

  // Charger l'historique des shifts du collaborateur connecté
  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const res = await getShifts();
        const filtered = res.data.filter(s => s.collaborator && s.collaborator.email === email);
        setShifts(filtered);
      } catch (e) {
        setShifts([]);
      }
    };
    fetchShifts();
  }, [email]);

  // Gestion du chrono
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsed(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleLogout = async () => {
    setIsRunning(false);
    const now = new Date().toISOString();
    try {
      if (shiftId) {
        await updateShift(shiftId, {
          dateSortie: now,
          duree: Math.floor(elapsed / 60), // durée en minutes
        });
      }
    } catch (e) {
      // Optionnel : afficher une erreur ou continuer
    }
    setElapsed(0);
    if (onLogout) onLogout();
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
      background: `url(${bgImg}) center/cover no-repeat`,
      filter: 'none',
    }}>
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
      {/* Bouton de déconnexion en haut à droite */}
      <button onClick={handleLogout} style={{ position: 'fixed', top: 24, right: 32, background: RAM_RED, color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600, fontSize: 16, cursor: 'pointer', zIndex: 10 }}>Se déconnecter</button>
      {/* Carte chrono centrale */}
      <div style={{ maxWidth: 420, margin: '80px auto 0 auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px #0001', padding: 32, border: `2px solid ${RAM_RED}`, position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <div style={{ fontWeight: 'bold', color: RAM_RED, fontSize: 28, letterSpacing: 2, fontFamily: 'serif', marginBottom: 18 }}>
          <span style={{ color: RAM_GOLD, fontSize: 22, verticalAlign: 'middle' }}>✈</span> Royal Air Maroc
        </div>
        <h2 style={{ color: RAM_RED, fontWeight: 700, marginBottom: 12 }}>Pointage</h2>
        <div style={{ marginBottom: 18, color: RAM_TEXT, fontSize: 17 }}>
          Bonjour, <b style={{ color: RAM_RED }}>{email}</b>
        </div>
        {/* Affichage machine */}
        {shifts.length > 0 && shifts[0].machine && (
          <div style={{ marginBottom: 18, color: RAM_TEXT, fontSize: 15 }}>
            <b>Nom d'ordinateur :</b> {shifts[0].machine.ordName || 'N/A'}<br />
            <b>Adresse MAC :</b> {shifts[0].machine.macAddress || 'N/A'}
          </div>
        )}
        <div style={{ fontSize: 40, marginBottom: 28, color: RAM_GOLD, fontFamily: 'monospace', letterSpacing: 2 }}>{formatTime(elapsed)}</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 18 }}>
          {!isRunning && <button onClick={handleStart} style={{ background: RAM_GOLD, color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 600, fontSize: 17, cursor: 'pointer' }}>Commencer</button>}
          {isRunning && <button onClick={handlePause} style={{ background: RAM_GOLD, color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 600, fontSize: 17, cursor: 'pointer' }}>Pause</button>}
        </div>
      </div>
      {/* Historique des shifts en bas, séparé */}
      <div style={{ maxWidth: 600, margin: '40px auto 0 auto', background: '#fafafa', borderRadius: 12, boxShadow: '0 2px 8px #0001', padding: 24, border: '1.5px solid #eee', position: 'relative', zIndex: 2 }}>
        <h3 style={{ color: RAM_RED, fontWeight: 600, fontSize: 18, marginBottom: 10 }}>Historique de vos shifts</h3>
        <div style={{ maxHeight: 220, overflowY: 'auto', borderRadius: 8 }}>
          {shifts.length === 0 && <div style={{ color: '#888', fontSize: 15 }}>Aucun shift trouvé.</div>}
          {shifts.map((s, i) => (
            <div key={s.id || i} style={{ padding: '6px 0', borderBottom: '1px solid #eee', fontSize: 15 }}>
              <b>Date entrée :</b> {s.dateEntree ? dayjs(s.dateEntree).format('DD/MM/YYYY HH:mm:ss') : 'N/A'}<br />
              <b>Date sortie :</b> {s.dateSortie ? dayjs(s.dateSortie).format('DD/MM/YYYY HH:mm:ss') : 'N/A'}<br />
              <b>Durée :</b> {s.duree ? s.duree + ' min' : 'N/A'}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pointage; 
import React, { useState } from 'react';
import bgImg from '../../assets/ram-bg.png';

const RAM_RED = '#a60d1a';
const RAM_GOLD = '#bfa046';
const RAM_BG = '#f5f5f5';
const RAM_TEXT = '#222222';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Veuillez entrer un email valide.');
      return;
    }
    setError('');
    onLogin(email);
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
      {/* Formulaire */}
      <div style={{
        maxWidth: 420,
        margin: '80px auto',
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 4px 24px #0001',
        padding: 32,
        border: `2px solid ${RAM_RED}`,
        position: 'relative',
        zIndex: 2,
      }}>
        {/* Header/logo */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24, justifyContent: 'center' }}>
          <div style={{ fontWeight: 'bold', color: RAM_RED, fontSize: 28, letterSpacing: 2, fontFamily: 'serif', marginRight: 12 }}>
            <span style={{ color: RAM_GOLD, fontSize: 22, verticalAlign: 'middle' }}>✈</span> Royal Air Maroc
          </div>
        </div>
        <h2 style={{ color: RAM_RED, fontWeight: 700, marginBottom: 18, textAlign: 'center' }}>Connexion</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Votre email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', padding: 12, marginBottom: 14, border: `1.5px solid ${RAM_GOLD}`, borderRadius: 6, fontSize: 16, outline: 'none', color: RAM_TEXT }}
          />
          {error && <div style={{ color: RAM_RED, marginBottom: 10, textAlign: 'center' }}>{error}</div>}
          <button type="submit" style={{ width: '100%', padding: 14, background: RAM_RED, color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 18, letterSpacing: 1, boxShadow: '0 2px 8px #a60d1a22', cursor: 'pointer', transition: 'background 0.2s' }}>
            Entrer
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login; 
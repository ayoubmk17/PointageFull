import React, { useState } from 'react';
import Login from './components/Auth/Login';
import Pointage from './components/Pointage/Pointage';

function App() {
  const [userEmail, setUserEmail] = useState('');

  if (!userEmail) {
    return <Login onLogin={setUserEmail} />;
  }

  return <Pointage email={userEmail} onLogout={() => setUserEmail('')} />;
}

export default App; 
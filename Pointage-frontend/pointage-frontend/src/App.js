import React, { useState } from 'react';
import Login from './components/Auth/Login';
import Pointage from './components/Pointage/Pointage';

function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return <Pointage email={user.email} onLogout={() => setUser(null)} />;
}

export default App; 
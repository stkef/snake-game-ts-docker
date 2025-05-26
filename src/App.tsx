import React, { useEffect } from 'react';
import { useUserStore } from './stores/userStore';
import AuthScreen from './components/auth/AuthScreen';
import GameContainer from './components/game/GameContainer';
import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';

function App() {
  const { currentUser, initializeUserState } = useUserStore();

  useEffect(() => {
    initializeUserState();
  }, [initializeUserState]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4">
        {currentUser ? <GameContainer /> : <AuthScreen />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
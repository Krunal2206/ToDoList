import React from 'react';
import Navbar from './components/Navbar';
import AuthState from './context/authentication/AuthState';

const App = () => {

  return (
    <>
      <AuthState>
        <Navbar />
      </AuthState>
    </>
  )
}

export default App;
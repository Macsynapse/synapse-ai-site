import React, { useState, useEffect } from "react";
import "./App.css";
import Services from "./components/Services";
import logo from "./assets/logo-synapse.png"; // tu archivo

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000); // 3 segundos
    return () => clearTimeout(timer);
  }, []);

  // PRIMERA PANTALLA: logo a pantalla completa
  if (showSplash) {
    return (
      <div className="splash">
        <div className="splash-logo" />
      </div>
    );
  }

  // SEGUNDA PANTALLA: web normal
// SEGUNDA PANTALLA: flujo de servicios
return (
  <div className="App">
    <Services />
  </div>
);
}
export default App;

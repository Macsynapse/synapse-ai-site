import React, { useState, useEffect } from "react";
import "./App.css";
import Services from "./components/Services";

const SUBTITLE_TEXT = "Conectamos tu negocio con la inteligencia del futuro";

// =========================
//  FUNCIÓN DE VOZ SÚPER SIMPLE
// =========================
function speak(text) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  const synth = window.speechSynthesis;

  try {
    const utter = new SpeechSynthesisUtterance(text);

    // Config básica
    utter.lang = "es-ES";
    utter.rate = 0.95;
    utter.pitch = 1.25;
    utter.volume = 1;

    // Dejamos que el navegador elija la voz
    synth.cancel();
    synth.speak(utter);
  } catch (e) {
    console.error("Error al intentar hablar:", e);
  }
}

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    // Intentar que hable solo al cargar (si el navegador lo permite)
    const speakTimeout = setTimeout(() => {
      speak(SUBTITLE_TEXT);
    }, 800);

    // Efecto de texto escribiéndose
    let index = 0;
    const intervalId = setInterval(() => {
      index += 1;
      setTypedText(SUBTITLE_TEXT.slice(0, index));
      if (index >= SUBTITLE_TEXT.length) clearInterval(intervalId);
    }, 70);

    // Duración del splash
    const splashTimeout = setTimeout(() => {
      setShowSplash(false);
    }, 4200);

    return () => {
      clearTimeout(speakTimeout);
      clearTimeout(splashTimeout);
      clearInterval(intervalId);
    };
  }, []);

  // PRIMERA PÁGINA (SPLASH)
  if (showSplash) {
    return (
      <div className="splash">
        <div className="splash-bg"></div>
        <p className="splash-subtitle">{typedText}</p>

        {/* 🔊 BOTÓN PARA ESCUCHAR EN LA PRIMERA PÁGINA */}
        <button
          onClick={() => speak(SUBTITLE_TEXT)}
          style={{
            position: "absolute",
            bottom: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "12px 22px",
            borderRadius: "999px",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            background: "#111827",  // fondo oscuro
            color: "#ffffff",       // texto blanco
            boxShadow: "0 4px 10px rgba(0,0,0,0.35)",
            zIndex: 10,             // por encima del fondo y del logo
          }}
        >
          🔊 Pulsa para escuchar
        </button>
      </div>
    );
  }

  // SEGUNDA PÁGINA (SERVICIOS)
  return (
    <div className="App">
      <Services />
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import "./App.css";
import Services from "./components/Services";

// Textos base
const TEXTS = {
  es: {
    subtitle: "Conectamos tu negocio con la inteligencia del futuro",
  },
  en: {
    subtitle: "We connect your business with the intelligence of the future",
  },
};

// Texto para el splash
const SUBTITLE_TEXT = TEXTS.es.subtitle;

// =========================
//  FUNCIÓN DE VOZ (MEJORADA)
// =========================
function speak(text) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    console.warn("speechSynthesis no disponible en este navegador.");
    return;
  }

  const synth = window.speechSynthesis;

  try {
    // cancelar cualquier voz previa
    synth.cancel();

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "es-ES";      // español
    utter.rate = 0.95;         // velocidad
    utter.pitch = 1.25;        // tono
    utter.volume = 1;          // volumen al máximo

    const voices = synth.getVoices();

    if (voices && voices.length > 0) {
      // buscar voz en español
      const spanishVoice =
        voices.find((v) => v.lang.startsWith("es")) || voices[0];

      utter.voice = spanishVoice;
      synth.speak(utter);
    } else {
      // si las voces cargan después
      synth.onvoiceschanged = () => {
        const loadedVoices = synth.getVoices();
        const spanishVoiceLoaded =
          loadedVoices.find((v) => v.lang.startsWith("es")) ||
          loadedVoices[0];

        utter.voice = spanishVoiceLoaded;
        synth.speak(utter);
      };
    }
  } catch (e) {
    console.error("Error al intentar hablar:", e);
  }
}

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [typedText, setTypedText] = useState("");
  const [language, setLanguage] = useState("es");

  useEffect(() => {
    // Texto escribiéndose
    let idx = 0;
    const intervalId = setInterval(() => {
      idx += 1;
      setTypedText(SUBTITLE_TEXT.slice(0, idx));
      if (idx >= SUBTITLE_TEXT.length) clearInterval(intervalId);
    }, 70);

    // Tiempo del splash
    const splashTimeout = setTimeout(() => {
      setShowSplash(false);
    }, 4200);

    return () => {
      clearInterval(intervalId);
      clearTimeout(splashTimeout);
    };
  }, []);

  // =========================
  //  SPLASH PAGE
  // =========================
  if (showSplash) {
    return (
      <div className="splash">
        <div className="splash-bg"></div>

        <p className="splash-subtitle">{typedText}</p>

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
            background: "#111827",
            color: "#fff",
            boxShadow: "0 4px 10px rgba(0,0,0,0.35)",
            zIndex: 10,
          }}
        >
          🔊 Pulsa para escuchar
        </button>
      </div>
    );
  }

  // =========================
  //  SECOND PAGE — SERVICES
  // =========================
  return (
    <div className="App" style={{ position: "relative", paddingTop: "60px" }}>

      {/* ⭐ BOTONES DE IDIOMA, SIEMPRE ARRIBA A LA DERECHA ⭐ */}
      <div
        className="lang-switch"
        style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          zIndex: 9999,
          display: "flex",
          gap: "10px",
        }}
      >
        <button
          className={language === "es" ? "active" : ""}
          onClick={() => setLanguage("es")}
          style={{
            padding: "8px 15px",
            borderRadius: "20px",
            background: "#00000070",
            color: "white",
            border: "1px solid white",
            cursor: "pointer",
          }}
        >
          ES
        </button>

        <button
          className={language === "en" ? "active" : ""}
          onClick={() => setLanguage("en")}
          style={{
            padding: "8px 15px",
            borderRadius: "20px",
            background: "#00000070",
            color: "white",
            border: "1px solid white",
            cursor: "pointer",
          }}
        >
          EN
        </button>
      </div>

      {/* Pasamos el idioma a Services */}
      <Services language={language} />
    </div>
  );
}

export default App;

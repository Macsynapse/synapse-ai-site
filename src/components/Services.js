// src/components/Services.js
import React, { useState } from "react";
import "./Services.css";

const SERVICES = [
  {
    id: "disparo",
    etapa: "Disparador",
    titulo: "Trigger / Captura de datos",
    resumen: "Detectamos cuándo debe comenzar la automatización.",
    descripcion: `
Conectamos tu web, formularios, redes o sistema interno para que cuando pase algo
(una venta, un registro, un mensaje) se dispare el flujo automáticamente.
    `,
    bullets: [
      "Formularios web que envían datos automáticamente",
      "Disparadores por horario (diario, semanal, etc.)",
      "Eventos: nuevo cliente, nueva venta, nuevo mensaje"
    ]
  },
  {
    id: "proceso",
    etapa: "Procesamiento",
    titulo: "Procesamiento con IA",
    resumen: "La IA lee, limpia y entiende la información.",
    descripcion: `
Usamos modelos de IA para interpretar texto, clasificar mensajes, extraer datos
importantes y decidir qué hacer con cada caso.
    `,
    bullets: [
      "Resúmenes automáticos de textos largos",
      "Clasificación de solicitudes por tipo y prioridad",
      "Extracción de datos clave (nombre, correo, empresa, etc.)"
    ]
  },
  {
    id: "decision",
    etapa: "Decisión",
    titulo: "Reglas y rutas inteligentes",
    resumen: "El flujo decide qué hacer según cada caso.",
    descripcion: `
Definimos reglas claras: si es venta, va a un lado; si es soporte, va a otro.
Si es urgente, se notifica de inmediato.
    `,
    bullets: [
      "Rutas diferentes según el tipo de cliente",
      "Priorización automática de casos urgentes",
      "Envío a la persona o equipo correcto"
    ]
  },
  {
    id: "salida",
    etapa: "Salida",
    titulo: "Entrega del resultado",
    resumen: "Enviamos el resultado a donde lo necesitas.",
    descripcion: `
Conectamos el flujo con WhatsApp, correo, CRM, Google Sheets, Telegram
o la herramienta que uses en tu negocio.
    `,
    bullets: [
      "Mensajes automáticos a WhatsApp / Telegram / Email",
      "Registro en hojas de cálculo o CRM",
      "Alertas y reportes listos para usar"
    ]
  }
];

export default function Services() {
  const [activo, setActivo] = useState(SERVICES[0]);
  const currentYear = new Date().getFullYear();

  return (
    <div className="flow-page">
      <h1 className="flow-title">Automatizamos tu negocio con IA</h1>
      <p className="flow-subtitle">
        Así se ve un flujo típico de Synapse AI: cada bloque es un paso del
        proceso. Haz clic en cualquier bloque para ver el detalle del servicio.
      </p>

      {/* TABLERO TIPO N8N */}
      <div className="flow-board">
        <div className="flow-lane">
          {SERVICES.map((servicio, index) => (
            <React.Fragment key={servicio.id}>
              <button
                className={
                  "flow-node" +
                  (activo.id === servicio.id ? " flow-node-active" : "")
                }
                onClick={() => setActivo(servicio)}
              >
                <div className="flow-node-stage">{servicio.etapa}</div>

                <div className="flow-node-body">
                  <div className="flow-node-icon">{servicio.icono}</div>
                  <div className="flow-node-texts">
                    <div className="flow-node-title">{servicio.titulo}</div>
                    <div className="flow-node-summary">
                      {servicio.resumen}
                    </div>
                  </div>
                </div>
              </button>

              {index < SERVICES.length - 1 && (
                <div className="flow-connector">
                  <span className="flow-dot" />
                  <span className="flow-line" />
                  <span className="flow-dot" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* DETALLE DEL SERVICIO */}
      <div className="flow-detail">
        <h2 className="flow-detail-title">{activo.titulo}</h2>
        <p className="flow-detail-text">{activo.descripcion}</p>
        <ul className="flow-detail-list">
          {activo.bullets.map((item, i) => (
            <li key={i} className="flow-detail-item">
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* BOTÓN FLOTANTE DE WHATSAPP */}
      <a
        href="https://wa.me/51995853270?text=Hola%20Mac,%20quiero%20más%20información"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          className="whatsapp-float-icon"
        />
      </a>

      {/* FOOTER */}
      <footer className="footer">
        <p>© {currentYear} Synapse AI — Creado por Mac Acosta</p>
        <p className="footer-contact">synapseai.consulting@gmail.com</p>
      </footer>
    </div>
  );
}

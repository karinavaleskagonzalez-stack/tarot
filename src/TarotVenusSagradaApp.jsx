import React, { useEffect, useMemo, useState } from "react";

import laIntuitiva from "./assets/cartas/la-intuitiva.png";
import laAmante from "./assets/cartas/la-amante.png";
import laGuardiana from "./assets/cartas/la-guardiana.png";
import laCiclica from "./assets/cartas/la-ciclica.png";
import laSanadora from "./assets/cartas/la-sanadora.png";
import laMagnetica from "./assets/cartas/la-magnetica.png";
import laSoberana from "./assets/cartas/la-soberana.png";
import laMadreLunar from "./assets/cartas/la-madre-lunar.png";
import laRenacida from "./assets/cartas/la-renacida.png";
import laTejedora from "./assets/cartas/la-tejedora.png";
import laAbundante from "./assets/cartas/la-abundante.png";
import laSacerdotisaVenusina from "./assets/cartas/la-sacerdotisa-venusina.png";

export default function TarotVenusSagradaApp() {
  const cartas = [
    {
      id: 1,
      nombre: "La Intuitiva",
      palabraClave: "Voz interior",
      mensaje: "Escucha la sabiduría que ya habita en ti.",
      invertido: "Desconexión de la intuición.",
      tema: "Intuición femenina",
      imagen: laIntuitiva,
    },
    {
      id: 2,
      nombre: "La Amante",
      palabraClave: "Amor propio",
      mensaje: "Te eliges con ternura y verdad.",
      invertido: "Dependencia afectiva.",
      tema: "Amor propio",
      imagen: laAmante,
    },
    {
      id: 3,
      nombre: "La Guardiana",
      palabraClave: "Límites",
      mensaje: "Proteger tu energía también es amor.",
      invertido: "Entrega excesiva.",
      tema: "Poder personal",
      imagen: laGuardiana,
    },
    {
      id: 4,
      nombre: "La Cíclica",
      palabraClave: "Ritmos",
      mensaje: "Honra tus tiempos y tus pausas.",
      invertido: "Desfase interior.",
      tema: "Energía cíclica",
      imagen: laCiclica,
    },
    {
      id: 5,
      nombre: "La Sanadora",
      palabraClave: "Reparación",
      mensaje: "Tu herida también conoce el camino de regreso.",
      invertido: "Resistencia a sanar.",
      tema: "Sanación emocional",
      imagen: laSanadora,
    },
    {
      id: 6,
      nombre: "La Magnética",
      palabraClave: "Atracción",
      mensaje: "Atraes lo que encarnas.",
      invertido: "Búsqueda vacía de validación.",
      tema: "Abundancia",
      imagen: laMagnetica,
    },
    {
      id: 7,
      nombre: "La Soberana",
      palabraClave: "Poder",
      mensaje: "Tu decisión ordena tu destino.",
      invertido: "Cesión del poder personal.",
      tema: "Poder personal",
      imagen: laSoberana,
    },
    {
      id: 8,
      nombre: "La Madre Lunar",
      palabraClave: "Nutrición",
      mensaje: "Crear también es cuidar.",
      invertido: "Agotamiento emocional.",
      tema: "Maternidad",
      imagen: laMadreLunar,
    },
    {
      id: 9,
      nombre: "La Renacida",
      palabraClave: "Transformación",
      mensaje: "Deja morir lo que ya cumplió su ciclo.",
      invertido: "Apego al pasado.",
      tema: "Renacer",
      imagen: laRenacida,
    },
    {
      id: 10,
      nombre: "La Tejedora",
      palabraClave: "Vínculos",
      mensaje: "Todo lazo sano se construye con verdad.",
      invertido: "Confusión relacional.",
      tema: "Vínculos",
      imagen: laTejedora,
    },
    {
      id: 11,
      nombre: "La Abundante",
      palabraClave: "Recepción",
      mensaje: "Recibir es un acto de merecimiento.",
      invertido: "Carencia y bloqueo.",
      tema: "Abundancia",
      imagen: laAbundante,
    },
    {
      id: 12,
      nombre: "La Sacerdotisa Venusina",
      palabraClave: "Intuición sagrada",
      mensaje: "Tu energía es oráculo cuando vuelves a ti.",
      invertido: "Ruido exterior.",
      tema: "Intuición femenina",
      imagen: laSacerdotisaVenusina,
    },
  ];

  const [nombreConsultante, setNombreConsultante] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [pregunta, setPregunta] = useState("");

  const [cartaActual, setCartaActual] = useState(null);
  const [estaInvertida, setEstaInvertida] = useState(false);
  const [tiradaTresCartas, setTiradaTresCartas] = useState([]);
  const [modoLectura, setModoLectura] = useState("una");
  const [mostrarInterpretacion, setMostrarInterpretacion] = useState(true);
  const [historial, setHistorial] = useState([]);

  const fraseInicio = useMemo(() => {
    return "Completa tus datos y formula tu pregunta para comenzar la lectura.";
  }, []);

  const claveSesion = useMemo(() => {
    const nombre = nombreConsultante.trim().toLowerCase();
    const fecha = fechaNacimiento.trim();
    if (!nombre || !fecha) return null;
    return `tarot_historial_${nombre}_${fecha}`;
  }, [nombreConsultante, fechaNacimiento]);

  const puedeLeer =
    nombreConsultante.trim() !== "" &&
    fechaNacimiento.trim() !== "" &&
    pregunta.trim() !== "";

  useEffect(() => {
    if (!claveSesion) {
      setHistorial([]);
      return;
    }

    const guardado = sessionStorage.getItem(claveSesion);
    if (guardado) {
      try {
        setHistorial(JSON.parse(guardado));
      } catch {
        setHistorial([]);
      }
    } else {
      setHistorial([]);
    }
  }, [claveSesion]);

  useEffect(() => {
    if (!claveSesion) return;
    sessionStorage.setItem(claveSesion, JSON.stringify(historial));
  }, [historial, claveSesion]);

  const generarConclusion = () => {
    if (modoLectura === "tres" && tiradaTresCartas.length === 3) {
      const nombres = tiradaTresCartas.map((c) => c.nombre);
      const tieneInvertidas = tiradaTresCartas.some((c) => c.invertida);

      return {
        titulo: "Conclusión de tu lectura",
        resumen: `Tu tirada une las energías de ${nombres[0]}, ${nombres[1]} y ${nombres[2]}. Hay un recorrido entre pasado, presente y futuro que muestra el tono general de tu proceso actual.`,
        consejo: tieneInvertidas
          ? "Hay aspectos que necesitan observación, orden emocional y más consciencia antes de avanzar con claridad."
          : "La energía general se ve abierta y favorable. Confía en lo que estás sintiendo y sigue el camino que más resuena contigo.",
      };
    }

    if (modoLectura === "una" && cartaActual) {
      return {
        titulo: "Mensaje final de tu lectura",
        resumen: `La carta ${cartaActual.nombre} pone el foco en ${cartaActual.tema.toLowerCase()} y te invita a mirar esta energía con más profundidad.`,
        consejo: estaInvertida
          ? "Detente y revisa lo que internamente está generando resistencia o ruido."
          : "Confía en la energía presente y avanza con más seguridad interior.",
      };
    }

    return null;
  };

  const agregarHistorial = (nuevos) => {
    setHistorial((prev) => [...nuevos, ...prev].slice(0, 10));
  };

  const sacarCarta = () => {
    if (!puedeLeer) return;

    const randomIndex = Math.floor(Math.random() * cartas.length);
    const carta = cartas[randomIndex];
    const invertida = Math.random() < 0.35;

    setModoLectura("una");
    setCartaActual(carta);
    setEstaInvertida(invertida);
    setTiradaTresCartas([]);

    agregarHistorial([
      {
        nombre: carta.nombre,
        orientacion: invertida ? "Invertida" : "Derecha",
      },
    ]);
  };

  const sacarTresCartas = () => {
    if (!puedeLeer) return;

    const cartasBarajadas = [...cartas].sort(() => Math.random() - 0.5);

    const seleccionadas = cartasBarajadas.slice(0, 3).map((carta, index) => ({
      ...carta,
      posicion: index === 0 ? "Pasado" : index === 1 ? "Presente" : "Futuro",
      invertida: Math.random() < 0.35,
    }));

    setModoLectura("tres");
    setCartaActual(null);
    setEstaInvertida(false);
    setTiradaTresCartas(seleccionadas);

    agregarHistorial(
      seleccionadas.map((item) => ({
        nombre: `${item.posicion}: ${item.nombre}`,
        orientacion: item.invertida ? "Invertida" : "Derecha",
      }))
    );
  };

  const reiniciarLectura = () => {
    setCartaActual(null);
    setEstaInvertida(false);
    setTiradaTresCartas([]);
    setModoLectura("una");
  };

  const limpiarTodo = () => {
    reiniciarLectura();
    setPregunta("");
    setMostrarInterpretacion(true);
    setHistorial([]);
    if (claveSesion) {
      sessionStorage.removeItem(claveSesion);
    }
  };

  const conclusion = generarConclusion();

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, rgba(123,31,162,0.22), transparent 35%), linear-gradient(180deg, #120714 0%, #241126 48%, #120714 100%)",
        color: "#f8eef4",
        padding: "16px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div className="tarot-layout" style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0, 2fr) minmax(280px, 1fr)", gap: "20px" }}>
        <div style={{ display: "grid", gap: "20px" }}>
          <div
            style={{
              borderRadius: "28px",
              border: "1px solid rgba(255,255,255,0.10)",
              background: "linear-gradient(180deg, rgba(104,22,122,0.28), rgba(255,255,255,0.04))",
              padding: "28px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.28)",
            }}
          >
            <p
              style={{
                textTransform: "uppercase",
                letterSpacing: "0.35em",
                fontSize: "12px",
                color: "#f2bfd6",
                marginBottom: "10px",
                textAlign: "center",
              }}
            >
              Tarot interactivo
            </p>

            <h1
              style={{
                fontSize: "clamp(36px, 7vw, 64px)",
                textAlign: "center",
                margin: "0 0 14px 0",
                lineHeight: 1.05,
                color: "#fff3f8",
              }}
            >
              Tarot <span style={{ color: "#f4c7da" }}>Venus Sagrada</span>
            </h1>

            <p
              style={{
                textAlign: "center",
                fontSize: "clamp(16px, 2.2vw, 20px)",
                color: "#eed8e2",
                maxWidth: "860px",
                margin: "0 auto 24px auto",
                lineHeight: 1.6,
              }}
            >
              Un oráculo femenino digital para amor propio, intuición, vínculos, ciclos y poder personal.
            </p>

            <div className="tarot-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "18px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "8px", color: "#f1d9e3", fontSize: "14px" }}>
                  Nombre
                </label>
                <input
                  type="text"
                  value={nombreConsultante}
                  onChange={(e) => setNombreConsultante(e.target.value)}
                  placeholder="Escribe tu nombre"
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "14px 16px",
                    borderRadius: "16px",
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.06)",
                    color: "#fff",
                    outline: "none",
                    fontSize: "15px",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "8px", color: "#f1d9e3", fontSize: "14px" }}>
                  Fecha de nacimiento
                </label>
                <input
                  type="date"
                  value={fechaNacimiento}
                  onChange={(e) => setFechaNacimiento(e.target.value)}
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "14px 16px",
                    borderRadius: "16px",
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.06)",
                    color: "#fff",
                    outline: "none",
                    fontSize: "15px",
                  }}
                />
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ display: "block", marginBottom: "8px", color: "#f1d9e3", fontSize: "14px" }}>
                  Tu pregunta
                </label>
                <textarea
                  value={pregunta}
                  onChange={(e) => setPregunta(e.target.value)}
                  placeholder="Escribe tu pregunta para la lectura"
                  rows={4}
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "14px 16px",
                    borderRadius: "16px",
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.06)",
                    color: "#fff",
                    outline: "none",
                    resize: "vertical",
                    fontSize: "15px",
                  }}
                />
              </div>
            </div>

            {!puedeLeer && (
              <p
                style={{
                  marginTop: "-4px",
                  marginBottom: "16px",
                  color: "#f0c8d7",
                  fontSize: "14px",
                  lineHeight: "1.6",
                }}
              >
                Debes completar nombre, fecha de nacimiento y pregunta antes de tirar la lectura.
              </p>
            )}

            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <button
                onClick={sacarCarta}
                disabled={!puedeLeer}
                style={{
                  padding: "13px 22px",
                  borderRadius: "16px",
                  border: "none",
                  background: puedeLeer ? "#f3c6d8" : "rgba(243,198,216,0.4)",
                  color: "#2d1127",
                  cursor: puedeLeer ? "pointer" : "not-allowed",
                  fontWeight: "bold",
                  fontSize: "15px",
                  boxShadow: puedeLeer ? "0 8px 20px rgba(243,198,216,0.2)" : "none",
                }}
              >
                Sacar una carta
              </button>

              <button
                onClick={sacarTresCartas}
                disabled={!puedeLeer}
                style={{
                  padding: "13px 22px",
                  borderRadius: "16px",
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.06)",
                  color: puedeLeer ? "white" : "rgba(255,255,255,0.45)",
                  cursor: puedeLeer ? "pointer" : "not-allowed",
                  fontWeight: "bold",
                  fontSize: "15px",
                }}
              >
                Tirada de 3 cartas
              </button>

              <button
                onClick={reiniciarLectura}
                style={{
                  padding: "13px 22px",
                  borderRadius: "16px",
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.04)",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "15px",
                }}
              >
                Limpiar lectura
              </button>

              <button
                onClick={limpiarTodo}
                style={{
                  padding: "13px 22px",
                  borderRadius: "16px",
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.04)",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "15px",
                }}
              >
                Borrar sesión
              </button>

              <button
                onClick={() => setMostrarInterpretacion(!mostrarInterpretacion)}
                style={{
                  padding: "13px 22px",
                  borderRadius: "16px",
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.04)",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "15px",
                }}
              >
                {mostrarInterpretacion ? "Ocultar interpretación" : "Mostrar interpretación"}
              </button>
            </div>
          </div>

          <div
            style={{
              borderRadius: "28px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "linear-gradient(180deg, rgba(88,18,101,0.22), rgba(255,255,255,0.04))",
              padding: "24px",
              boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
            }}
          >
            <p
              style={{
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                fontSize: "12px",
                color: "#f2bfd6",
                marginBottom: "16px",
                textAlign: "center",
              }}
            >
              {modoLectura === "tres" ? "Tirada de 3 cartas" : "Tu lectura"}
            </p>

            {modoLectura === "tres" && tiradaTresCartas.length === 3 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: "20px",
                  marginTop: "12px",
                }}
              >
                {tiradaTresCartas.map((carta) => (
                  <div
                    key={`${carta.posicion}-${carta.id}`}
                    style={{
                      borderRadius: "24px",
                      background: "rgba(0,0,0,0.14)",
                      border: "1px solid rgba(255,255,255,0.09)",
                      padding: "22px",
                    }}
                  >
                    <p
                      style={{
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                        color: "#f2bfd6",
                        fontSize: "12px",
                        textAlign: "center",
                        marginBottom: "10px",
                      }}
                    >
                      {carta.posicion}
                    </p>

                    <img
                      src={carta.imagen}
                      alt={carta.nombre}
                      style={{
                        width: "100%",
                        maxWidth: "230px",
                        display: "block",
                        margin: "0 auto 14px auto",
                        borderRadius: "18px",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                        objectFit: "cover",
                      }}
                    />

                    <p
                      style={{
                        textAlign: "center",
                        marginBottom: "12px",
                        fontWeight: "bold",
                        fontSize: "20px",
                        color: carta.invertida ? "#ffd1df" : "#f7eaf0",
                      }}
                    >
                      {carta.invertida ? "Invertida" : "Derecha"}
                    </p>

                    {mostrarInterpretacion ? (
                      <>
                        <p
                          style={{
                            marginTop: "8px",
                            fontSize: "18px",
                            lineHeight: "1.65",
                            textAlign: "center",
                            color: "#fff3f8",
                          }}
                        >
                          {carta.invertida ? carta.invertido : carta.mensaje}
                        </p>

                        <p
                          style={{
                            marginTop: "14px",
                            color: "#e7c9d7",
                            lineHeight: "1.65",
                            textAlign: "center",
                          }}
                        >
                          {carta.posicion === "Pasado"
                            ? "Esta carta habla de la energía o experiencia que te trajo hasta aquí."
                            : carta.posicion === "Presente"
                            ? "Esta carta muestra la vibración que hoy está más activa en tu proceso."
                            : "Esta carta sugiere la dirección probable si mantienes tu energía actual."}
                        </p>
                      </>
                    ) : (
                      <p
                        style={{
                          marginTop: "14px",
                          color: "#e9c9d7",
                          lineHeight: "1.6",
                          textAlign: "center",
                        }}
                      >
                        La interpretación está oculta. Puedes revelarla cuando quieras.
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : !cartaActual ? (
              <div
                style={{
                  marginTop: "8px",
                  borderRadius: "24px",
                  border: "1px dashed rgba(255,255,255,0.15)",
                  padding: "42px 24px",
                  textAlign: "center",
                  background: "rgba(0,0,0,0.08)",
                }}
              >
                <div style={{ fontSize: "62px", marginBottom: "12px" }}>🔮</div>
                <h2 style={{ fontSize: "clamp(24px, 4vw, 34px)", marginBottom: "10px" }}>
                  Aún no hay carta revelada
                </h2>
                <p style={{ color: "#eed8e2", fontSize: "18px", lineHeight: "1.6" }}>
                  {fraseInicio}
                </p>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gap: "22px",
                  marginTop: "12px",
                }}
              >
                <div
                  style={{
                    borderRadius: "24px",
                    background: "rgba(0,0,0,0.14)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    padding: "24px",
                  }}
                >
                  <img
                    src={cartaActual.imagen}
                    alt={cartaActual.nombre}
                    style={{
                      width: "100%",
                      maxWidth: "300px",
                      display: "block",
                      margin: "0 auto 16px auto",
                      borderRadius: "20px",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                      objectFit: "cover",
                    }}
                  />

                  <h3
                    style={{
                      fontSize: "32px",
                      textAlign: "center",
                      marginBottom: "8px",
                      color: "#fff3f8",
                    }}
                  >
                    {cartaActual.nombre}
                  </h3>

                  <p style={{ textAlign: "center", color: "#f4c7da", fontSize: "20px" }}>
                    {cartaActual.palabraClave}
                  </p>

                  <p
                    style={{
                      textAlign: "center",
                      marginTop: "12px",
                      fontWeight: "bold",
                      fontSize: "20px",
                      color: estaInvertida ? "#ffd1df" : "#f7eaf0",
                    }}
                  >
                    {estaInvertida ? "Invertida" : "Derecha"}
                  </p>
                </div>

                <div
                  style={{
                    borderRadius: "24px",
                    background: "rgba(0,0,0,0.14)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    padding: "24px",
                  }}
                >
                  <p style={{ fontSize: "18px", marginBottom: "8px" }}>
                    <strong>Tema:</strong> {cartaActual.tema}
                  </p>

                  <p style={{ fontSize: "18px", marginBottom: "8px" }}>
                    <strong>Palabra clave:</strong> {cartaActual.palabraClave}
                  </p>

                  {mostrarInterpretacion ? (
                    <>
                      <p
                        style={{
                          marginTop: "16px",
                          fontSize: "22px",
                          lineHeight: "1.65",
                          color: "#fff3f8",
                        }}
                      >
                        {estaInvertida ? cartaActual.invertido : cartaActual.mensaje}
                      </p>

                      <p
                        style={{
                          marginTop: "14px",
                          color: "#e9c9d7",
                          lineHeight: "1.65",
                          fontSize: "17px",
                        }}
                      >
                        {estaInvertida
                          ? "Esta carta sugiere mirar con honestidad dónde estás entregando tu energía sin escucharte por completo."
                          : "Esta carta te invita a confiar en la energía que ya está despertando dentro de ti y actuar desde esa verdad."}
                      </p>
                    </>
                  ) : (
                    <p style={{ marginTop: "16px", color: "#e9c9d7", lineHeight: "1.6" }}>
                      La interpretación está oculta. Puedes revelarla cuando quieras.
                    </p>
                  )}
                </div>
              </div>
            )}

            {conclusion && (
              <div
                style={{
                  marginTop: "20px",
                  borderRadius: "24px",
                  border: "1px solid rgba(255,255,255,0.10)",
                  background: "rgba(255,255,255,0.04)",
                  padding: "22px",
                }}
              >
                <p
                  style={{
                    textTransform: "uppercase",
                    letterSpacing: "0.3em",
                    fontSize: "12px",
                    color: "#f2bfd6",
                    marginBottom: "12px",
                    textAlign: "center",
                  }}
                >
                  Cierre de lectura
                </p>

                <h3
                  style={{
                    fontSize: "26px",
                    marginBottom: "12px",
                    color: "#f4c7da",
                    textAlign: "center",
                  }}
                >
                  {conclusion.titulo}
                </h3>

                <p
                  style={{
                    color: "#f6e7ee",
                    fontSize: "18px",
                    lineHeight: "1.65",
                    marginBottom: "12px",
                    textAlign: "center",
                  }}
                >
                  {conclusion.resumen}
                </p>

                <p
                  style={{
                    color: "#e9c9d7",
                    lineHeight: "1.65",
                    textAlign: "center",
                  }}
                >
                  <strong>Consejo final:</strong> {conclusion.consejo}
                </p>
              </div>
            )}
          </div>
        </div>

        <div style={{ display: "grid", gap: "20px" }}>
          <div
            style={{
              borderRadius: "28px",
              border: "1px solid rgba(255,255,255,0.10)",
              background: "linear-gradient(180deg, rgba(88,18,101,0.18), rgba(255,255,255,0.04))",
              padding: "24px",
            }}
          >
            <p
              style={{
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                fontSize: "12px",
                color: "#f2bfd6",
                marginBottom: "14px",
              }}
            >
              Cómo usarlo
            </p>
            <div style={{ color: "#f6e7ee", lineHeight: "1.75" }}>
              <p>1. Completa nombre, fecha de nacimiento y pregunta.</p>
              <p>2. Presiona <strong>Sacar una carta</strong> o <strong>Tirada de 3 cartas</strong>.</p>
              <p>3. Observa si la carta salió derecha o invertida.</p>
              <p>4. Lee el mensaje, la lectura y el cierre final.</p>
            </div>
          </div>

          <div
            style={{
              borderRadius: "28px",
              border: "1px solid rgba(255,255,255,0.10)",
              background: "linear-gradient(180deg, rgba(88,18,101,0.18), rgba(255,255,255,0.04))",
              padding: "24px",
            }}
          >
            <p
              style={{
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                fontSize: "12px",
                color: "#f2bfd6",
                marginBottom: "14px",
              }}
            >
              Historial reciente
            </p>

            {!puedeLeer ? (
              <p style={{ color: "#eed8e2", lineHeight: "1.6" }}>
                Completa primero tus datos para cargar tu historial personal.
              </p>
            ) : historial.length === 0 ? (
              <p style={{ color: "#eed8e2", lineHeight: "1.6" }}>
                Aún no has sacado cartas en esta sesión.
              </p>
            ) : (
              <div style={{ display: "grid", gap: "10px" }}>
                {historial.map((item, index) => (
                  <div
                    key={`${item.nombre}-${index}`}
                    style={{
                      borderRadius: "18px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      background: "rgba(0,0,0,0.12)",
                      padding: "12px 16px",
                    }}
                  >
                    <div style={{ fontWeight: "bold", color: "#fff3f8" }}>{item.nombre}</div>
                    <div style={{ color: "#e6bfd1", fontSize: "14px", marginTop: "4px" }}>
                      {item.orientacion}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div
            style={{
              borderRadius: "28px",
              border: "1px solid rgba(255,255,255,0.10)",
              background: "linear-gradient(180deg, rgba(88,18,101,0.18), rgba(255,255,255,0.04))",
              padding: "24px",
            }}
          >
            <p
              style={{
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                fontSize: "12px",
                color: "#f2bfd6",
                marginBottom: "14px",
              }}
            >
              Próxima mejora
            </p>
            <p style={{ color: "#f6e7ee", lineHeight: "1.7" }}>
              En la siguiente versión podemos añadir barajado visual, animación de giro y una portada inicial más ceremonial.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .tarot-layout {
            grid-template-columns: 1fr !important;
          }

          .tarot-form-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
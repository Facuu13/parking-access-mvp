import { useEffect, useState } from "react"
import "./App.css"

const API_URL = "http://127.0.0.1:8000"

function App() {
  const [token, setToken] = useState("")
  const [session, setSession] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const createEntry = async () => {
    try {
      setError("")
      setLoading(true)

      const response = await fetch(`${API_URL}/entry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          entry_gate_id: "gate-entry-001",
        }),
      })

      if (!response.ok) {
        throw new Error("No se pudo crear la entrada")
      }

      const data = await response.json()
      setToken(data.session_token)
      setSession(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const getSession = async () => {
    try {
      setError("")
      setLoading(true)

      if (!token.trim()) {
        throw new Error("Ingresá un token")
      }

      const response = await fetch(`${API_URL}/sessions/${token}`)

      if (!response.ok) {
        throw new Error("No se pudo obtener la sesión")
      }

      const data = await response.json()
      setSession(data)
    } catch (err) {
      setError(err.message)
      setSession(null)
    } finally {
      setLoading(false)
    }
  }

  const checkoutSession = async () => {
    try {
      setError("")
      setLoading(true)

      if (!token.trim()) {
        throw new Error("Ingresá un token")
      }

      const response = await fetch(`${API_URL}/sessions/${token}/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          exit_gate_id: "gate-exit-001",
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || "No se pudo hacer checkout")
      }

      const data = await response.json()
      setSession(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const paySession = async () => {
    try {
      setError("")
      setLoading(true)

      if (!token.trim()) {
        throw new Error("Ingresá un token")
      }

      const response = await fetch(`${API_URL}/sessions/${token}/pay`, {
        method: "POST",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || "No se pudo realizar el pago")
      }

      const data = await response.json()
      setSession(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!token.trim()) return

    const interval = setInterval(async () => {
      try {
        const response = await fetch(`${API_URL}/sessions/${token}`)
        if (!response.ok) return

        const data = await response.json()
        setSession(data)
      } catch {
        // ignoramos error temporal de red
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [token])

  const getStatusColor = (status) => {
    const colors = {
      COMPLETED: { bg: "rgba(16, 185, 129, 0.1)", border: "#10b981", color: "#10b981" },
      PAID: { bg: "rgba(59, 130, 246, 0.1)", border: "#3b82f6", color: "#3b82f6" },
      PENDING_PAYMENT: { bg: "rgba(245, 158, 11, 0.1)", border: "#f59e0b", color: "#f59e0b" },
      PENDING: { bg: "rgba(107, 114, 128, 0.1)", border: "#6b7280", color: "#6b7280" },
    }
    return colors[status] || colors.PENDING
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(token)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getSessionTimeline = () => {
    const events = []
    if (session?.entry_time) {
      events.push({
        label: "Entrada",
        time: new Date(session.entry_time),
        icon: "🚗",
        status: "completed"
      })
    }
    if (session?.exit_time) {
      events.push({
        label: "Salida",
        time: new Date(session.exit_time),
        icon: "🚪",
        status: session.payment_status === "PAID" ? "completed" : "pending"
      })
    }
    return events
  }

  const statusStyle = session && getStatusColor(session.status)

  return (
    <div className="app-container">
      {/* Header */}
      <div className="header">
        <div className="header-content">
          <div>
            <h1 className="title">🅿️ Parking Access MVP</h1>
            <p className="subtitle">Gestión de acceso e ingreso a estacionamiento</p>
          </div>
        </div>
      </div>

      <main className="main-content">
        {/* Error Message */}
        {error && (
          <div className="alert alert-danger" role="alert">
            <span>⚠️</span>
            <p>{error}</p>
            <button 
              className="alert-close"
              onClick={() => setError("")}
            >
              ✕
            </button>
          </div>
        )}

        {/* Control Panel */}
        <div className="card">
          <div className="card-header">
            <h2>Panel de Control</h2>
            <p className="text-secondary">Gestiona el ciclo de vida de la sesión de estacionamiento</p>
          </div>
          <div className="card-body">
            {/* Token Input Section */}
            <div className="form-section">
              <label htmlFor="token-input" className="form-label">Token de sesión</label>
              <div className="input-group">
                <input
                  id="token-input"
                  type="text"
                  placeholder="Pega el token de tu sesión"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="form-input"
                  disabled={loading}
                />
              </div>
              {token && (
                <div className="token-display">
                  <code>{token}</code>
                  <button 
                    onClick={copyToClipboard}
                    className="token-copy-btn"
                    title="Copiar token"
                  >
                    {copied ? "✓ Copiado" : "📋 Copiar"}
                  </button>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="button-grid">
              <button 
                onClick={createEntry}
                disabled={loading}
                className="btn btn-primary"
                title="Crear una nueva sesión"
              >
                {loading ? "Cargando..." : "🚗 Crear Entrada"}
              </button>
              <button 
                onClick={getSession}
                disabled={loading}
                className="btn btn-secondary"
                title="Obtener información de la sesión"
              >
                {loading ? "Cargando..." : "🔍 Buscar Sesión"}
              </button>
              <button 
                onClick={checkoutSession}
                disabled={loading}
                className="btn btn-warning"
                title="Registrar salida"
              >
                {loading ? "Cargando..." : "🚪 Checkout"}
              </button>
              <button 
                onClick={paySession}
                disabled={loading}
                className="btn btn-success"
                title="Procesar pago"
              >
                {loading ? "Cargando..." : "💳 Pagar"}
              </button>
            </div>
          </div>
        </div>

        {/* Session Status */}
        {session && (
          <div className="card">
            <div className="card-header">
              <h2>Estado de la Sesión</h2>
              <div className="status-badge" style={{
                backgroundColor: statusStyle.bg,
                borderColor: statusStyle.border
              }}>
                <span style={{ color: statusStyle.color }}>● {session.status}</span>
              </div>
            </div>
            <div className="card-body">
              {/* Timeline */}
              {getSessionTimeline().length > 0 && (
                <div className="timeline">
                  <h3>📊 Flujo de la Sesión</h3>
                  <div className="timeline-container">
                    {getSessionTimeline().map((event, idx) => (
                      <div key={idx} className="timeline-event">
                        <div className="timeline-marker" data-status={event.status}>
                          {event.icon}
                        </div>
                        <div className="timeline-content">
                          <p className="timeline-label">{event.label}</p>
                          <time className="timeline-time">
                            {event.time.toLocaleTimeString("es-AR")}
                          </time>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="info-grid">
                {/* Main Info */}
                <div className="info-card">
                  <h3>📋 Información</h3>
                  <div className="info-row">
                    <span className="info-label">Estado:</span>
                    <span className="info-value" style={{ color: statusStyle.color }}>
                      {session.status}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Pago:</span>
                    <span className="info-value">{session.payment_status}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Duración:</span>
                    <span className="info-value">
                      {session.duration_minutes ? `${session.duration_minutes} min` : "-"}
                    </span>
                  </div>
                </div>

                {/* Cost Info */}
                <div className="info-card">
                  <h3>💰 Cobro</h3>
                  <div className="info-row">
                    <span className="info-label">Tarifa/hora:</span>
                    <span className="info-value">
                      ${session.hourly_rate ?? "-"}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Total:</span>
                    <span className="info-value amount">
                      ${session.total_amount ?? "-"}
                    </span>
                  </div>
                </div>

                {/* Gates Status */}
                <div className="info-card gates-card">
                  <h3>🚪 Control de Acceso</h3>
                  <div className="gate-indicator">
                    <div className={`gate ${session.opened_on_entry ? "opened" : "closed"}`}>
                      <span className="gate-icon">🚪</span>
                      <span className="gate-label">Entrada</span>
                      <span className="gate-status">
                        {session.opened_on_entry ? "Abierta ✓" : "Cerrada"}
                      </span>
                    </div>
                    <div className={`gate ${session.opened_on_exit ? "opened" : "closed"}`}>
                      <span className="gate-icon">🚪</span>
                      <span className="gate-label">Salida</span>
                      <span className="gate-status">
                        {session.opened_on_exit ? "Abierta ✓" : "Cerrada"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!session && token && (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No hay sesión activa</h3>
            <p>Usa el botón "Buscar Sesión" para obtener la información</p>
          </div>
        )}

        {!token && !session && (
          <div className="empty-state">
            <div className="empty-icon">🚗</div>
            <h3>Comienza aquí</h3>
            <p>Crea una nueva entrada o ingresa un token para comenzar</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
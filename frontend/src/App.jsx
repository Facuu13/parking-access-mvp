import { useEffect, useState } from "react"

const API_URL = "http://127.0.0.1:8000"

function App() {
  const [token, setToken] = useState("")
  const [session, setSession] = useState(null)
  const [error, setError] = useState("")

  const createEntry = async () => {
    try {
      setError("")

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
    }
  }

  const getSession = async () => {
    try {
      setError("")

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
    }
  }

  const checkoutSession = async () => {
    try {
      setError("")

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
    }
  }

  const paySession = async () => {
    try {
      setError("")

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

  const statusColor =
    session?.status === "COMPLETED"
      ? "#16a34a"
      : session?.status === "PAID"
      ? "#2563eb"
      : session?.status === "PENDING_PAYMENT"
      ? "#d97706"
      : "#6b7280"

  return (
    <div
      style={{
        padding: "24px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <h1>Parking Access MVP</h1>
      <p>Flujo básico de entrada, checkout, pago y salida automática.</p>

      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "16px",
          marginBottom: "20px",
        }}
      >
        <h2>Acciones</h2>

        <div style={{ marginBottom: "16px" }}>
          <button onClick={createEntry} style={{ marginRight: "10px" }}>
            Crear entrada
          </button>

          <button onClick={getSession} style={{ marginRight: "10px" }}>
            Buscar sesión
          </button>

          <button onClick={checkoutSession} style={{ marginRight: "10px" }}>
            Checkout
          </button>

          <button onClick={paySession}>
            Pagar
          </button>
        </div>

        <input
          type="text"
          placeholder="Ingresar token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "500px",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {error && (
        <div
          style={{
            backgroundColor: "#fee2e2",
            color: "#991b1b",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          {error}
        </div>
      )}

      {token && (
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "16px",
            marginBottom: "20px",
          }}
        >
          <h2>Token actual</h2>
          <p style={{ wordBreak: "break-all" }}>{token}</p>
        </div>
      )}

      {session && (
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "16px",
          }}
        >
          <h2>Estado de la sesión</h2>

          <p>
            <strong>Estado:</strong>{" "}
            <span style={{ color: statusColor }}>{session.status}</span>
          </p>
          <p><strong>Estado de pago:</strong> {session.payment_status}</p>
          <p><strong>Hora de entrada:</strong> {session.entry_time || "-"}</p>
          <p><strong>Hora de salida:</strong> {session.exit_time || "-"}</p>
          <p><strong>Duración (min):</strong> {session.duration_minutes ?? "-"}</p>
          <p><strong>Tarifa por hora:</strong> {session.hourly_rate ?? "-"}</p>
          <p><strong>Total:</strong> {session.total_amount ?? "-"}</p>
          <p><strong>Apertura entrada:</strong> {String(session.opened_on_entry)}</p>
          <p><strong>Apertura salida:</strong> {String(session.opened_on_exit)}</p>

          <h3>JSON completo</h3>
          <pre
            style={{
              backgroundColor: "#111827",
              color: "#f9fafb",
              padding: "12px",
              borderRadius: "8px",
              overflowX: "auto",
            }}
          >
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}

export default App
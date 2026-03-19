import { useState } from "react"

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

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Parking Access MVP</h1>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={createEntry}>Crear entrada</button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Ingresar token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          style={{ width: "400px", padding: "8px", marginRight: "10px" }}
        />
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

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {token && (
        <div style={{ marginTop: "20px" }}>
          <p><strong>Token:</strong> {token}</p>
        </div>
      )}

      {session && (
        <div style={{ marginTop: "20px" }}>
          <h2>Respuesta del backend</h2>
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default App
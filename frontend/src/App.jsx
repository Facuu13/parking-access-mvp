import { useState } from "react"

const API_URL = "http://127.0.0.1:8000"

function App() {
  const [token, setToken] = useState(null)
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

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Parking Access MVP</h1>

      <button onClick={createEntry}>Crear entrada</button>

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
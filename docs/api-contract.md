# Contrato de API

## 📌 Descripción general

Este documento define el contrato inicial de la API backend para el Parking Access MVP.

El sistema soporta el siguiente flujo:

1. Entrada del vehículo
2. Creación de sesión con token único
3. Cálculo de salida (checkout)
4. Pago (simulado en MVP)
5. Autorización de salida
6. Ejecución de comandos por dispositivo

---

## 🧩 Conceptos principales

### Sesión

Una sesión representa la estadía de un vehículo dentro del estacionamiento.

---

### Token

Cada sesión tiene un token único que funciona como ticket digital.

---

### Dispositivo

Un dispositivo representa una barrera (entrada o salida), controlada por un ESP32 o un simulador.

---

### Comando

Un comando es una acción enviada por el backend a un dispositivo, por ejemplo abrir una barrera.

---

## 📊 Estados de la sesión

* `ACTIVE` → vehículo dentro del estacionamiento
* `PENDING_PAYMENT` → esperando pago
* `PAID` → pago aprobado
* `COMPLETED` → sesión finalizada

---

## 💰 Estados del pago

* `NONE`
* `PENDING`
* `APPROVED`

---

## 🚧 Tipos de comando

* `OPEN_ENTRY_GATE`
* `OPEN_EXIT_GATE`

---

## 📡 Estados del comando

* `PENDING`
* `EXECUTED`
* `FAILED`

---

# 🔗 Endpoints

---

## 1. Health check

### `GET /health`

Permite verificar que la API está funcionando.

### Response

```json
{
  "status": "ok"
}
```

---

## 2. Crear sesión de entrada

### `POST /entry`

Crea una nueva sesión cuando un vehículo ingresa al estacionamiento.

### Request

```json
{
  "entry_gate_id": "gate-entry-001"
}
```

### Comportamiento

* Crea una nueva sesión
* Genera un token único
* Guarda la hora de entrada
* Establece estado `ACTIVE`
* Genera comando `OPEN_ENTRY_GATE`
* Registra evento

### Response

```json
{
  "session_token": "3c40d8e3-4c89-4f65-a2cb-64c44d3d9f12",
  "status": "ACTIVE",
  "payment_status": "NONE",
  "entry_time": "2026-03-19T15:10:00",
  "message": "Sesión creada y barrera de entrada autorizada"
}
```

---

## 3. Obtener sesión por token

### `GET /sessions/{token}`

Devuelve el estado actual de la sesión.

### Response (sesión activa)

```json
{
  "session_token": "3c40d8e3-4c89-4f65-a2cb-64c44d3d9f12",
  "status": "ACTIVE",
  "payment_status": "NONE",
  "entry_time": "2026-03-19T15:10:00",
  "exit_time": null,
  "duration_minutes": null,
  "hourly_rate": 1000,
  "total_amount": null,
  "opened_on_entry": false,
  "opened_on_exit": false
}
```

---

### Response (checkout iniciado)

```json
{
  "session_token": "3c40d8e3-4c89-4f65-a2cb-64c44d3d9f12",
  "status": "PENDING_PAYMENT",
  "payment_status": "PENDING",
  "entry_time": "2026-03-19T15:10:00",
  "exit_time": "2026-03-19T17:40:00",
  "duration_minutes": 150,
  "hourly_rate": 1000,
  "total_amount": 2500,
  "opened_on_entry": true,
  "opened_on_exit": false
}
```

---

## 4. Iniciar checkout (salida)

### `POST /sessions/{token}/checkout`

Calcula la duración de la estadía y el monto a pagar.

### Request

```json
{
  "exit_gate_id": "gate-exit-001"
}
```

### Comportamiento

* Valida que la sesión exista
* Valida que esté en estado `ACTIVE`
* Guarda hora de salida
* Calcula duración
* Calcula monto
* Cambia estado a `PENDING_PAYMENT`
* Cambia payment_status a `PENDING`
* Registra evento

### Response

```json
{
  "session_token": "3c40d8e3-4c89-4f65-a2cb-64c44d3d9f12",
  "status": "PENDING_PAYMENT",
  "payment_status": "PENDING",
  "entry_time": "2026-03-19T15:10:00",
  "exit_time": "2026-03-19T17:40:00",
  "duration_minutes": 150,
  "hourly_rate": 1000,
  "total_amount": 2500,
  "message": "Checkout calculado correctamente"
}
```

---

## 5. Pagar sesión

### `POST /sessions/{token}/pay`

Simula un pago aprobado.

### Request

```json
{
  "provider": "SIMULATED"
}
```

### Comportamiento

* Valida estado `PENDING_PAYMENT`
* Crea registro de pago
* Cambia payment_status a `APPROVED`
* Cambia estado a `PAID`
* Genera comando `OPEN_EXIT_GATE`
* Registra evento

### Response

```json
{
  "session_token": "3c40d8e3-4c89-4f65-a2cb-64c44d3d9f12",
  "status": "PAID",
  "payment_status": "APPROVED",
  "total_amount": 2500,
  "message": "Pago aprobado y barrera de salida autorizada"
}
```

---

## 6. Heartbeat del dispositivo

### `POST /devices/heartbeat`

Recibe señales periódicas del dispositivo.

### Request

```json
{
  "device_id": "gate-entry-001",
  "status": "ONLINE"
}
```

### Comportamiento

* Actualiza última conexión
* Registra heartbeat
* Crea dispositivo si no existe

### Response

```json
{
  "message": "Heartbeat recibido"
}
```

---

## 7. Obtener comandos pendientes

### `GET /devices/{device_id}/commands`

Devuelve los comandos pendientes para un dispositivo.

### Response

```json
{
  "device_id": "gate-entry-001",
  "commands": [
    {
      "command_id": 1,
      "command_type": "OPEN_ENTRY_GATE",
      "session_token": "3c40d8e3-4c89-4f65-a2cb-64c44d3d9f12",
      "issued_at": "2026-03-19T15:10:01"
    }
  ]
}
```

---

## 8. Confirmar ejecución de comando

### `POST /devices/{device_id}/commands/{command_id}/execute`

El dispositivo informa que ejecutó un comando.

### Request

```json
{
  "result": "EXECUTED"
}
```

### Comportamiento

* Marca comando como ejecutado
* Guarda timestamp
* Registra evento
* Si es entrada → `opened_on_entry = true`
* Si es salida → `opened_on_exit = true` y estado = `COMPLETED`

### Response

```json
{
  "message": "Ejecución registrada"
}
```

---

# 📏 Reglas de negocio

1. No se puede hacer checkout si la sesión no está en `ACTIVE`
2. No se puede pagar si la sesión no está en `PENDING_PAYMENT`
3. No se puede abrir salida sin pago aprobado
4. La sesión se completa solo cuando el dispositivo confirma ejecución
5. El token debe ser único y no predecible
6. Cada comando se ejecuta una sola vez

---

# 🧪 Alcance del MVP

Endpoints obligatorios en primera versión:

* `GET /health`
* `POST /entry`
* `GET /sessions/{token}`
* `POST /sessions/{token}/checkout`
* `POST /sessions/{token}/pay`

Endpoints de dispositivos se agregan en la siguiente iteración.

---

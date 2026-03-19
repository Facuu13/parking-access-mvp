# System Architecture

## 🧩 Visión general

El sistema está compuesto por:

1. Frontend (usuario)
2. Backend (API + lógica de negocio)
3. Dispositivo IoT (ESP32 o simulador)
4. Base de datos (PostgreSQL)

---

## 🔁 Flujo principal

### Entrada

1. Usuario escanea QR de entrada
2. Frontend llama al backend
3. Backend crea sesión
4. Backend genera token único
5. Backend registra hora de entrada
6. Backend envía comando de apertura
7. Dispositivo abre la barrera

---

### Salida

1. Usuario accede a su ticket (token)
2. Frontend consulta al backend
3. Backend calcula duración
4. Backend calcula monto
5. Usuario realiza pago
6. Backend valida pago
7. Backend envía comando de apertura
8. Dispositivo abre la barrera

---

## 🧱 Componentes

### Frontend

* React
* Mobile-first
* Muestra:

  * estado de sesión
  * tiempo transcurrido
  * monto a pagar
  * estado de pago

---

### Backend

* FastAPI
* Maneja:

  * sesiones
  * pagos
  * dispositivos
  * comandos
  * eventos

---

### Base de datos

* PostgreSQL

Tablas principales:

* access_sessions
* payments
* devices
* gate_commands
* heartbeats
* event_logs

---

### Dispositivo IoT

#### Fase 1

* Simulador en Python

#### Fase 2

* ESP32 (ESP-IDF):

  * WiFi
  * polling HTTP
  * control GPIO

---

## 🔑 Token (ticket digital)

Cada sesión genera un token único:

* identifica la sesión
* permite recuperar información
* se usa para el flujo de salida

Ejemplo:

```
/session/{token}
```

---

## 🔌 Comunicación

### MVP

* HTTP REST

### Futuro

* MQTT

---

## 📡 Heartbeat

El dispositivo envía periódicamente:

* estado (online/offline)
* timestamp

Permite detectar desconexión.

---

## 🚧 Comandos de apertura

El backend genera comandos cuando:

* vehículo entra
* pago es aprobado

El dispositivo:

* consulta comandos pendientes
* ejecuta apertura
* reporta resultado

---

## ⚠️ Consideraciones

* Evitar aperturas duplicadas
* Manejar sesiones sin pago
* Manejar dispositivos offline
* Asegurar consistencia de estados
* Token debe ser único y no predecible

---

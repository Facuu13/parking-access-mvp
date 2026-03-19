# System Architecture

## 🧩 Visión general

El sistema está compuesto por tres grandes bloques:

1. Frontend (usuario)
2. Backend (API y lógica)
3. Dispositivo IoT (ESP32 o simulador)

---

## 🔁 Flujo principal

1. Usuario escanea QR
2. Frontend consulta al backend
3. Backend crea una sesión
4. Usuario realiza el pago
5. Backend valida el pago
6. Backend autoriza apertura
7. Dispositivo consulta comandos
8. Dispositivo ejecuta apertura
9. Backend registra evento

---

## 🧱 Componentes

### Frontend

* Aplicación web (React)
* Interfaz mobile-first
* Comunicación con backend vía HTTP

---

### Backend

* API REST (FastAPI)
* Manejo de:

  * sesiones
  * pagos
  * dispositivos
  * comandos
  * eventos
* Integración futura con sistema de pagos

---

### Base de datos

* PostgreSQL
* Almacena:

  * sesiones
  * pagos
  * dispositivos
  * comandos
  * heartbeats
  * logs

---

### Dispositivo IoT

#### Fase 1

* Simulador en Python

#### Fase 2

* ESP32 con ESP-IDF:

  * conexión WiFi
  * envío de heartbeat
  * polling de comandos
  * control de GPIO (relé/LED)

---

## 🔌 Comunicación

### MVP inicial

* HTTP REST

### Futuro

* MQTT para eventos en tiempo real

---

## 📡 Heartbeat

El dispositivo envía periódicamente su estado al backend:

* online/offline
* timestamp
* estado actual

Esto permite detectar dispositivos desconectados.

---

## 🔓 Comando de apertura

El backend genera un comando cuando:

* el pago está aprobado

El dispositivo:

* consulta si hay comandos pendientes
* ejecuta apertura
* reporta resultado

---

## 🧾 Eventos

Se registran eventos clave:

* creación de sesión
* pago aprobado/rechazado
* apertura ejecutada
* heartbeat recibido

---

## ⚠️ Consideraciones

* El sistema debe evitar aperturas duplicadas
* Los comandos deben ser idempotentes
* El dispositivo puede estar offline
* El backend debe manejar estados inconsistentes

---

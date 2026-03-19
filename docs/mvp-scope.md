# MVP Scope

## 🎯 Objetivo

Construir un sistema funcional que permita controlar el acceso a un estacionamiento mediante QR, pago digital y apertura remota de una barrera.

---

## ✅ Funcionalidades incluidas

### Acceso mediante QR

* Generación o uso de un QR para acceso
* Creación de sesión al escanear

### Gestión de sesiones

* Creación de sesión de acceso
* Consulta de estado de sesión
* Asociación con pago

### Pagos (fase inicial)

* Simulación de pago aprobado
* Cambio de estado de la sesión tras el pago

### Autorización de apertura

* Generación de comando de apertura
* Validación de estado (solo si pago aprobado)

### Dispositivo IoT

* Simulación de dispositivo
* Envío de heartbeat
* Consulta de comandos
* Ejecución de apertura (simulada)

### Registro de eventos

* Registro de:

  * creación de sesión
  * pago
  * apertura
  * heartbeat

### Dashboard básico (opcional MVP)

* Visualización de sesiones
* Estado de dispositivos
* Eventos recientes

---

## ❌ Funcionalidades fuera de alcance (por ahora)

* App móvil nativa
* Integración completa con hardware real desde el inicio
* Reconocimiento de patentes
* Facturación electrónica
* Multi-sede compleja
* Seguridad avanzada (roles, auth completa)
* Alta disponibilidad / escalabilidad

---

## 🔄 Fases futuras

* Integración con MercadoPago (sandbox → producción)
* Firmware completo en ESP32 (ESP-IDF)
* Comunicación vía MQTT
* OTA updates
* Autenticación de usuarios/admin
* Panel administrativo completo

---

## 📌 Criterio de éxito del MVP

El sistema se considera funcional si:

1. Se puede crear una sesión desde un QR
2. Se puede simular un pago exitoso
3. Se genera una orden de apertura
4. Un dispositivo (simulado) ejecuta la apertura
5. Todo el flujo queda registrado en el sistema

---

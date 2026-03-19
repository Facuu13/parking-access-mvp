# MVP Scope

## 🎯 Objetivo

Construir un sistema funcional de estacionamiento que permita:

* Registrar el ingreso de un vehículo
* Generar un ticket digital (token)
* Calcular el costo en base al tiempo de permanencia
* Permitir el pago al momento de salida
* Controlar la apertura de la barrera

---

## ✅ Funcionalidades incluidas

### Entrada

* Escaneo de QR de entrada
* Creación de sesión
* Generación de token único (ticket digital)
* Registro de hora de entrada
* Apertura de barrera

---

### Gestión de sesiones

* Consulta de sesión por token
* Estado de sesión:

  * ACTIVE
  * PENDING_PAYMENT
  * COMPLETED

---

### Salida

* Consulta de sesión activa
* Cálculo de duración
* Cálculo de monto a pagar
* Cambio de estado a PENDING_PAYMENT

---

### Pagos (fase inicial)

* Simulación de pago aprobado
* Asociación del pago a la sesión
* Cambio de estado a COMPLETED

---

### Dispositivo IoT

* Simulación de dispositivo
* Envío de heartbeat
* Consulta de comandos
* Ejecución de apertura (simulada)

---

### Registro de eventos

* Creación de sesión
* Cálculo de salida
* Pago
* Apertura
* Heartbeat

---

## ❌ Fuera de alcance (por ahora)

* App móvil nativa
* Reconocimiento de patente
* Facturación electrónica
* Multi-sede
* Sistema de usuarios/login
* Seguridad avanzada
* Alta disponibilidad

---

## 🔄 Fases futuras

* Integración con MercadoPago
* Firmware completo en ESP32
* Comunicación MQTT
* OTA
* Dashboard avanzado
* Identificación por patente

---

## 📌 Criterio de éxito del MVP

El sistema es válido si:

1. Se puede generar una sesión al ingresar
2. Se genera un token único por sesión
3. Se puede calcular correctamente el costo al salir
4. Se puede simular el pago
5. Se genera una orden de apertura
6. El dispositivo ejecuta la apertura
7. Todo queda registrado

---

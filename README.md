# Parking Access MVP

Sistema de acceso automatizado para estacionamientos basado en QR, sesiones digitales y pago al momento de la salida.

---

## 🚀 Descripción

Este proyecto implementa un MVP de un sistema que permite a los usuarios:

1. Escanear un código QR al ingresar al estacionamiento
2. Generar automáticamente una sesión (ticket digital)
3. Permanecer en el estacionamiento sin necesidad de pago previo
4. Al salir, calcular el costo en base al tiempo de uso
5. Realizar el pago digital
6. Obtener autorización automática para abrir la barrera

El sistema está diseñado para operar de forma autónoma (24/7), sin intervención humana.

---

## 🧩 Componentes del sistema

* **Frontend**: interfaz web accesible desde el QR (mobile-first)
* **Backend**: API para gestión de sesiones, pagos y dispositivos
* **Dispositivo IoT (ESP32)**: controla la apertura de la barrera
* **Simulador de dispositivo**: permite testear sin hardware real
* **Base de datos**: almacenamiento de sesiones, pagos y eventos

---

## ⚙️ Stack tecnológico

* Backend: FastAPI (Python)
* Base de datos: PostgreSQL
* Frontend: React + Vite
* Firmware: ESP32 (ESP-IDF)
* Simulación de dispositivo: Python
* Comunicación: HTTP (MVP inicial)

---

## 🔁 Flujo principal

### Entrada

QR → creación de sesión → generación de ticket digital → apertura de barrera

### Salida

ticket → cálculo de tiempo → cálculo de monto → pago → apertura de barrera

---

## 🎯 Objetivo del MVP

Validar el flujo completo:

Entrada → sesión → salida → cálculo → pago → apertura → registro

---

## 📌 Estado del proyecto

🟡 En desarrollo — fase de diseño y arquitectura

---

## 🛠️ Roadmap

* [ ] Definición de alcance (MVP)
* [ ] Diseño de arquitectura
* [ ] Backend inicial (FastAPI)
* [ ] Simulador de dispositivo
* [ ] Frontend básico
* [ ] Integración con ESP32
* [ ] Integración de pagos (sandbox)
* [ ] Deploy

---

## 📄 Documentación

Ver carpeta `docs/`:

* Alcance del MVP
* Arquitectura del sistema
* Flujos funcionales

---

## 💡 Objetivo del proyecto

* Construir un sistema real IoT + backend + pagos
* Simular un sistema de estacionamiento autónomo
* Generar un producto potencialmente vendible
* Crear un proyecto fuerte de portfolio

---

# Parking Access MVP

Sistema de acceso automatizado para estacionamientos basado en QR, pagos digitales y control remoto de barrera mediante dispositivos IoT.

## 🚀 Descripción

Este proyecto implementa un MVP de un sistema que permite a los usuarios:

1. Escanear un código QR al ingresar a un estacionamiento
2. Realizar un pago digital (sin efectivo ni app nativa)
3. Obtener autorización automática de acceso/salida
4. Activar la apertura de una barrera de forma remota

El sistema está diseñado para operar sin personal en sitio (24/7), utilizando una arquitectura basada en backend + frontend + dispositivos IoT.

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

## 🎯 Objetivo del MVP

Validar el flujo completo:

QR → sesión → pago → autorización → apertura → registro

---

## 📌 Estado del proyecto

🟡 En desarrollo — fase de diseño y arquitectura

---

## 📁 Estructura del repositorio

(En construcción)

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

Ver carpeta `docs/` para más detalles:

* Alcance del MVP
* Arquitectura del sistema
* Flujos funcionales

---

## 💡 Objetivo del proyecto

Este proyecto busca:

* Construir un sistema real de IoT + backend + pagos
* Generar una base para un producto vendible
* Servir como portfolio técnico completo

---

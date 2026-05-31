# Consultora HR "Talento Evolutivo S.A." - Matrix Devs 🚀

Este es un proyecto de desarrollo para la Consultora HR "Talento Evolutivo S.A.", llevado a cabo por el Grupo 6.

## 🛠️ Tecnologías Utilizadas

* **Backend:** Node.js, Express
* **Base de Datos:** MongoDB
* **ODM:** Mongoose
* **Motor de Plantillas:** Pug

## ⚙️ Características y Arquitectura

El proyecto utiliza el patrón **MVC (Modelo-Vista-Controlador)**:

* **Base de Datos NoSQL:** Se utiliza MongoDB Atlas para almacenar la información.
* **Modelos Estrictos:** Uso de esquemas de Mongoose con validaciones integradas para las entidades: `Empresa`, `Empleado`, `Novedad`, `Socio` y `Liquidación`.
* **Controladores Asincrónicos:** Lógica de negocio separada e implementada de forma asincrónica con `async/await`.
* **Rutas Modulares:** Separación clara entre las rutas que devuelven vistas HTML (Pug) y las rutas de la API REST (`/api/...`).
* **Manejo Global de Errores:** Implementación de un middleware (`errorHandler`) para atrapar fallos, evitar caídas del servidor y devolver mensajes claros.

## 👥 Integrantes y Responsabilidades (Grupo 6)

* **Matías Contreras:** Setup del entorno, conexión a MongoDB, migración de los modelos base (Empresa, Empleado) y refactorización de los controladores principales.
* **María Lopez:** Migración de modelos secundarios (Liquidaciones, Novedades, Socios), implementación del Middleware global de errores, refactorización de controladores y redacción de la documentación.

## 🤖 Uso de Herramientas de Inteligencia Artificial

Durante el desarrollo y documentación se utilizaron asistentes de Inteligencia Artificial (como Gemini/ChatGPT) con los siguientes propósitos:
* **Asistencia en refactorización:** Apoyo para la migración de funciones sincrónicas a asincrónicas (`async/await`).
* **Corrección y redacción:** Revisión de estilo y formato para la documentación técnica y la elaboración de este archivo README.

---
**Institución:** IFTS 29 | **Materia:** Desarrollo de Sistemas Web Backend (DSWB)